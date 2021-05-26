import '../styles/globals.css'
import { ThemeProvider } from "styled-components";
import theme from '../custom/customization';
import '../styles/reset.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp
