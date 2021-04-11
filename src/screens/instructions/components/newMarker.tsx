import styled from 'styled-components/native';

export const NewMarker = styled.Image.attrs({
  source: require('../assets/icon.new.png'),
})`
  position: absolute;
  top: ${({ theme }) => theme.spaces.default};
  left: ${({ theme }) => theme.spaces.default};
`;
