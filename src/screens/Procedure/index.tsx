import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ListItemSeperator } from 'components/ListItem/components/ListItemSeperator';
import {
  useProcedureDetailQuery,
  ProcedureDetailsFragmentDoc,
  ImportantDocumentsFragmentDoc,
  ProcedureHistoryFragmentDoc,
  DetailActionBarFragmentDoc,
  CommunityVoteResultsFragmentDoc,
  ProcedureListItemFragmentDoc,
} from 'generated/graphql';
import { filter } from 'graphql-anywhere';
import { BundestagStackNavigatorParamList } from 'navigation/Sidebar/Bundestag';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { CommuntiyVoteResults } from './components/CommunityVoteResults';
import { ProcedureDetails } from './components/Details';
import Documents from './components/Documents';
import { History } from './components/History';
import { RefreshControl, SafeAreaView } from 'react-native';
import { GovernmentVoteResults } from './components/GovernmentVoteResults';
import { NetworkStatus } from '@apollo/client';
import { ActionBar } from './components/ActionBar';
import { ProcedureListItem } from 'components/ProcedureListItem';

type ProfileScreenRouteProp = RouteProp<
  BundestagStackNavigatorParamList,
  'Procedure'
>;

type ProfileScreenNavigationProps = StackNavigationProp<
  BundestagStackNavigatorParamList,
  'Procedure'
>;

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProps;
};

export const ProcedureDetailScreen: React.FC<Props> = ({
  route: {
    params: { title, procedureId },
  },
  navigation,
}) => {
  const { data, refetch, networkStatus } = useProcedureDetailQuery({
    variables: {
      id: procedureId,
    },
  });
  useEffect(() => {
    if (title) {
      navigation.setOptions({ title });
    }
  }, [navigation, title]);

  if (!data) {
    return <Container />;
  }

  const refreshing = networkStatus === NetworkStatus.refetch;

  const { procedure } = data;

  return (
    <Container
      scrollIndicatorInsets={{ right: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refetch} />
      }>
      <SafeAreaView>
        <ProcedureListItem
          {...filter(ProcedureListItemFragmentDoc, procedure)}
          isIntro
        />
        <ListItemSeperator />
        <ProcedureDetails {...filter(ProcedureDetailsFragmentDoc, procedure)} />
        <ListItemSeperator />
        <Documents {...filter(ImportantDocumentsFragmentDoc, procedure)} />
        <History {...filter(ProcedureHistoryFragmentDoc, procedure)} />
        <CommuntiyVoteResults
          {...filter(CommunityVoteResultsFragmentDoc, procedure)}
        />
        <GovernmentVoteResults procedureId={procedureId} />
        <ActionBar {...filter(DetailActionBarFragmentDoc, procedure)} />
      </SafeAreaView>
    </Container>
  );
};
