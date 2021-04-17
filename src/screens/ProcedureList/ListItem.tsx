import { useNavigation } from '@react-navigation/native';
import { Procedure } from 'generated/graphql';
import React, { useContext, useMemo } from 'react';
import {
  ChartEntry,
  ProcedureListItem as ProcedureListItemCmp,
} from '@democracy-deutschland/ui';
import { useTheme } from 'styled-components/native';
import { LocalVotesContext } from 'context/LocalVotes';

export const ProcedureListItem: React.FC<Procedure> = React.memo((item) => {
  const navigation = useNavigation();
  const {
    procedureId,
    title,
    sessionTOPHeading,
    voted,
    votes,
    communityVotes,
    voteDate,
    voteEnd,
    voteResults,
  } = item;

  const theme = useTheme();
  const { getLocalVoteSelection } = useContext(LocalVotesContext);

  const voteDecision = getLocalVoteSelection(procedureId);

  const communityChartData = useMemo(
    () =>
      communityVotes
        ? (['YES', 'ABSTINATION', 'NO'] as const).map<ChartEntry>(
            (decision) => {
              switch (decision) {
                case 'YES':
                  return {
                    name: decision,
                    value: communityVotes.yes,
                    color: theme.colors.vote.community.yes,
                    highlight: decision === voteDecision,
                  };
                case 'ABSTINATION':
                  return {
                    name: decision,
                    value: communityVotes.abstination,
                    color: theme.colors.vote.community.abstination,
                    highlight: decision === voteDecision,
                  };
                case 'NO':
                default:
                  return {
                    name: decision,
                    value: communityVotes.no,
                    color: theme.colors.vote.community.no,
                    highlight: decision === voteDecision,
                  };
              }
            },
          )
        : undefined,
    [communityVotes, theme, voteDecision],
  );

  const governmentChartData = useMemo(
    () =>
      voteResults
        ? (['YES', 'ABSTINATION', 'NO', 'NOT_VOTED'] as const).map<ChartEntry>(
            (decision) => {
              switch (decision) {
                case 'YES':
                  return {
                    name: decision,
                    value: voteResults.yes,
                    color: theme.colors.vote.government.yes,
                  };
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
            },
          )
        : undefined,
    [voteResults, theme],
  );

  return (
    <ProcedureListItemCmp
      date={voteDate}
      dateEnd={voteEnd}
      title={title}
      subtitle={sessionTOPHeading ? sessionTOPHeading : undefined}
      voted={voted}
      votes={votes}
      communityChart={
        communityChartData ? { size: 22, data: communityChartData } : undefined
      }
      governmentChart={
        governmentChartData
          ? { size: 22, data: governmentChartData }
          : undefined
      }
      onPress={() =>
        navigation.navigate('Procedure', {
          procedureId: item.procedureId,
          title: item.title,
        })
      }
    />
  );
});
