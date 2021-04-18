import { ChartEntry } from '@democracy-deutschland/ui';
import { ProcedureListItem } from 'components/ProcedureListItem';
import { Procedure, ProcedureListItemFragmentDoc } from 'generated/graphql';
import { filter } from 'graphql-anywhere';
import React, { useContext, useMemo } from 'react';
import { ListRenderItem, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { WomPartyContext } from './context';

interface Props {
  navigation: any;
}

const ListItem: React.FC<Procedure> = (procedure) => {
  const { party } = useContext(WomPartyContext);
  const { voteResults } = procedure;
  voteResults?.partyVotes;
  const theme = useTheme();
  console.log('voteRESULTS', voteResults);
  const governmentChartData = useMemo(() => {
    return voteResults
      ? ([
          'PARTY_YES',
          'YES',
          'ABSTINATION',
          'NO',
          'NOT_VOTED',
        ] as const).map<ChartEntry>((decision) => {
          switch (decision) {
            case 'YES':
            case 'PARTY_YES': {
              const partySelected = decision === 'PARTY_YES';
              return {
                name: decision,
                value: voteResults.yes,
                color: theme.colors.vote.government.yes,
                highlight: partySelected,
              };
            }
            case 'ABSTINATION':
              return {
                name: decision,
                value: voteResults.abstination,
                color: theme.colors.vote.government.abstination,
              };
            case 'NO':
              return {
                name: decision,
                value: voteResults.no,
                color: theme.colors.vote.government.no,
              };
            case 'NOT_VOTED':
            default:
              return {
                name: decision,
                value: voteResults.notVoted || 0,
                color: theme.colors.vote.government.notVoted,
              };
          }
        })
      : undefined;
  }, [
    voteResults,
    theme.colors.vote.government.yes,
    theme.colors.vote.government.abstination,
    theme.colors.vote.government.no,
    theme.colors.vote.government.notVoted,
  ]);

  return (
    <ProcedureListItem
      {...procedure}
      governmentChartData={governmentChartData}
    />
  );
};

export const renderItem: ({
  navigation,
}: Props) => ListRenderItem<Procedure> = ({ navigation }) => ({ item }) => {
  return (
    <TouchableOpacity
      key={item.procedureId}
      onPress={() =>
        navigation.navigate('Procedure', {
          procedureId: item.procedureId,
          title: item.title,
        })
      }>
      <ListItem {...filter(ProcedureListItemFragmentDoc, item)} />
    </TouchableOpacity>
  );
};
