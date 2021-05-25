import '../styles/globals.css'
import { ThemeProvider } from "styled-components";
import theme from '../styles/theme';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />

    </ThemeProvider>
  );
}
export default MyApp
