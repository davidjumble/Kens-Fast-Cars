import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: 900;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
  }

  /* Ensure form controls and buttons use theme font */
  button,
  input,
  textarea,
  select {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1rem; /* keeps sizes consistent */
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export default GlobalStyles;
