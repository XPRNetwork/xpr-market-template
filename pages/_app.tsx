import Head from 'next/head';
import '../styles/globals.css';
import '../styles/reset.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Footer, Navbar } from '../components';
import { AuthProvider, LocaleProvider } from '../components/Provider';
import { generateFontImportLink } from '../custom/customization';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const fontImportLink = generateFontImportLink();
  return (
    <>
      <Head>
        <link
          key="preconnect"
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link key="font" href={fontImportLink} rel="stylesheet" />
      </Head>
      <AuthProvider>
        <LocaleProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </LocaleProvider>
      </AuthProvider>
    </>
  );
}
export default MyApp;
