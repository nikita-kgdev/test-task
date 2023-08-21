import styled, { css } from 'styled-components';

const colorSchemeCss = {
    primary: css`
      background: #00754a;
      color: #fff;
      border: none;
    `,
    secondary: css`
      background: #fff;
      color: #00754a;
      border: 1px solid #00754a;
    `,
};
export const Button = styled.button<{ $big?: boolean; $colorScheme?: keyof typeof colorSchemeCss; }>`
  padding: 7px 16px;
  border-radius: 500px;
  cursor: pointer;

  ${({ $big }) => $big && css`
    padding: 18px 24px;
    font-weight: 600;
    font-size: 18px;
  `}
  ${({ $colorScheme }) => colorSchemeCss[$colorScheme as keyof typeof colorSchemeCss]}
  &:disabled{
    opacity: 0.5;
  }
`;

Button.defaultProps = {
    $big: false,
    $colorScheme: 'secondary'
}