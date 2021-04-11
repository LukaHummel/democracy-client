import React from 'react';
import { DetailDecisionTextFragment } from 'generated/graphql';
import styled from 'styled-components/native';

interface Props extends DetailDecisionTextFragment {}

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.spaces.default};
`;

const Headline = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text.primary};
  padding-bottom: ${({ theme }) => theme.spaces.default};
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

export const DetailDecisionText: React.FC<Props> = ({ voteResults }) => {
  if (!voteResults) {
    return null;
  }

  return (
    <Container>
      <Headline>Beschlusstext</Headline>
      <Text>{voteResults.decisionText}</Text>
    </Container>
  );
};
