import React, { useContext, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { CommunityVotesPieChartFragment } from 'generated/graphql';
import { LocalVotesContext } from 'context/LocalVotes';
import { PieChart, ChartEntry } from '@democracy-deutschland/ui';

const Container = styled.View`
  width: 20px;
  height: 20px;
`;

interface Props extends CommunityVotesPieChartFragment {
  selectionFull?: boolean;
}

export const CommunityPieChart: React.FC<Props> = ({
  communityVotes,
  voted,
  procedureId,
  selectionFull,
}) => {
  const themeContext = useContext(ThemeContext);
  const { getLocalVoteSelection } = useContext(LocalVotesContext);
  const [dimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 20, height: 20 });

  const voteDecision = useMemo(() => {
    if (voted) {
      return getLocalVoteSelection(procedureId);
    }
    return;
  }, [getLocalVoteSelection, procedureId, voted]);

  const votedColors = themeContext.colors.vote.community;
  const notVotedColors = themeContext.colors.vote.notVoted;

  const [colorYes, colorAbsination, colorNo] = voted
    ? [votedColors.yes, votedColors.abstination, votedColors.no]
    : [notVotedColors.yes, notVotedColors.abstination, notVotedColors.no];

  const preparedData = useMemo<ChartEntry[]>(() => {
    if (communityVotes || voteDecision) {
      return [
        {
          name: 'YES',
          value:
            !selectionFull && communityVotes
              ? communityVotes.yes
              : voteDecision === 'YES'
              ? 1
              : 0,
          highlight: voteDecision === 'YES',
          color: colorYes,
        },
        {
          name: 'ABSTINATION',
          value:
            !selectionFull && communityVotes
              ? communityVotes.abstination
              : voteDecision === 'ABSTINATION'
              ? 1
              : 0,
          highlight: voteDecision === 'ABSTINATION',
          color: colorAbsination,
        },
        {
          name: 'NO',
          value:
            !selectionFull && communityVotes
              ? communityVotes.no
              : voteDecision === 'NO'
              ? 1
              : 0,
          highlight: voteDecision === 'NO',
          color: colorNo,
        },
      ];
    }
    return [];
  }, [
    colorAbsination,
    colorNo,
    colorYes,
    communityVotes,
    selectionFull,
    voteDecision,
  ]);

  return (
    <Container>
      <PieChart size={dimensions.width} data={preparedData} />
    </Container>
  );
};
