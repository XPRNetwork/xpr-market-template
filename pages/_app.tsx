import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import theme from '../custom/customization';
import '../styles/reset.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
export default MyApp;
