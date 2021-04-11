import { linking } from 'lib/linking';
import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.background.primary};
  align-items: center;
  padding-top: 11px;
  height: 50px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const LinkColorText = styled.Text`
  color: ${({ theme }) => theme.colors.text.colored};
`;

export const MadeWithLove: React.FC = () => (
  <Wrapper onPress={linking('https://www.democracy-deutschland.de/#!donate')}>
    <Text>
      Made with ❤ by <LinkColorText>DEMOCRACY Deutschland e.V.</LinkColorText>
    </Text>
  </Wrapper>
);
