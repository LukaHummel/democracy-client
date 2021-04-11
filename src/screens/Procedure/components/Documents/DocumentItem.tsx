import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { ImportantDocumentFragment } from 'generated/graphql';
import SvgDocument from 'assets/svgs/icons/Document';
import SvgShare from 'assets/svgs/icons/Share';
import { RootStackParamList } from 'navigation';
import { getTheme } from 'styles/theme';
import NativeShare from 'react-native-share';

const Container = styled.View`
  flex-direction: row;
`;

const ViewerButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-top: ${({ theme }) => theme.spaces.default};
`;

const Text = styled.Text`
  padding-left: ${({ theme }) => theme.spaces.default};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.colored};
`;

const DownloadButton = styled.TouchableOpacity`
  padding-top: ${({ theme }) => theme.spaces.default};
  margin-left: auto;
`;

type DevPlaceholderNavigationProps = StackNavigationProp<RootStackParamList>;

interface Props extends ImportantDocumentFragment {}

export const DocumentItem: React.FC<Props> = ({
  editor,
  type,
  number,
  url,
}) => {
  const navigation = useNavigation<DevPlaceholderNavigationProps>();

  return (
    <Container>
      <ViewerButton
        onPress={() => navigation.navigate('Pdf', { url, title: type })}>
        <SvgDocument width={18} height={18} color={getTheme().colors.primary} />
        <Text>{`${type} (${editor} ${number})`}</Text>
      </ViewerButton>

      <DownloadButton
        onPress={() =>
          NativeShare.open({
            url,
            message: `${type} (${editor} ${number})`,
            type: 'application/pdf',
            failOnCancel: false,
          })
        }>
        <SvgShare width={20} height={20} color={getTheme().colors.primary} />
      </DownloadButton>
    </Container>
  );
};
