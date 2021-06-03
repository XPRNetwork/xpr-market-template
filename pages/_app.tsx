import '../styles/globals.css';
import '../styles/reset.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Footer, Navbar } from '../components';
import {
  AuthProvider,
  LocaleProvider,
  ModalProvider,
} from '../components/Provider';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <ModalProvider>
        <LocaleProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </LocaleProvider>
      </ModalProvider>
    </AuthProvider>
  );
}
export default MyApp;
