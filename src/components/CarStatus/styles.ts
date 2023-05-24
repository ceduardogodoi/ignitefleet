import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  margin-top: 32px;
  padding: 22px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_700};
  `};
`;

export const IconBox = styled.View`
  width: 77px;
  height: 77px;
  border-radius: 6px;
  margin-right: 12px;
  justify-content: center;
  align-items: center;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_600};
  `};
`;

export const Message = styled.Text`
  flex: 1;
  text-align: justify;
  textAlignVertical: center;

  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;

export const TextHighlight = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.BRAND_LIGHT};
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;
