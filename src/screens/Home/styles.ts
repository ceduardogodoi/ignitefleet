import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_800};
  `}
`;

export const Content = styled.View`
  flex: 1;
  padding: 0 32px;
`;