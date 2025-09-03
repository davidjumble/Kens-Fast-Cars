import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../src/store";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/styles/theme";
import GlobalStyles from "../src/styles/globalStyles";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}