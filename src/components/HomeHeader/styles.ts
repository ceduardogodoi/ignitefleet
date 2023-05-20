import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 32px;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_700};
  `};
`;

export const Greeting = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const Message = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `};
`;

export const Name = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.LG}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `};
`;
