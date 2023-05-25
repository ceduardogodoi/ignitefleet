import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 150px;
  padding: 16px;
  border-radius: 6px;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_700};
  `}
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_300};
  `}
`;

export const Input = styled.TextInput`
  vertical-align: top;
  margin-top: 16px;

  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_200};
  `}
`;
