import '../styles/globals.css';
import '../styles/reset.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Footer } from '../components';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
export default MyApp;
