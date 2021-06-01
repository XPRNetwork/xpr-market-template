import '../styles/globals.css';
import '../styles/reset.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Footer, LocaleProvider } from '../components';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <LocaleProvider>
      <Component {...pageProps} />
      <Footer />
    </LocaleProvider>
  );
}
export default MyApp;
