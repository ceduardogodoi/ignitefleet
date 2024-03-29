import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_800};
  `};
`;

export const Content = styled.View`
  flex: 1;
  gap: 16px;
  padding: 32px;
  margin-top: 16px;
`;

export const Message = styled.Text`
  text-align: center;
  margin: 24px;
  margin-bottom: 44px;

  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;

export const MessageContent = styled.View`
  flex: 1;
  justify-content: center;
  padding: 24px;
`;
