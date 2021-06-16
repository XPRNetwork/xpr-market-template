import Head from 'next/head';
import { useState, useEffect } from 'react';
import '../styles/reset.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Footer, Navbar, LoadingPage } from '../components';
import { AuthProvider } from '../components/Provider';
import { generateFontImportLink } from '../custom/customization';
import customizationJson from '../custom/customization';
import localizationJson from '../custom/localization';

const { footer, navbar } = customizationJson;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [isLoadingLocale, setIsLoadingLocale] = useState<boolean>(true);
  const [locale, setLocale] = useState<string>('');
  const fontImportLink = generateFontImportLink();

  const getLocale = () => {
    let locale;
    try {
      const language = navigator.language.split(/-|_/)[0];
      locale = language;
    } catch (e) {
      locale = 'en';
    }

    if (!locale) {
      setLocale('en');
    }
    setLocale(locale);
  };

  useEffect(() => {
    getLocale();
    setIsLoadingLocale(false);
  }, []);

  if (isLoadingLocale) {
    return <LoadingPage />;
  }

  const text =
    locale && localizationJson[locale]
      ? localizationJson[locale]
      : localizationJson['en'];

  return isLoadingLocale ? null : (
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
        <Navbar navbarText={text.navbar} navbarStyles={navbar} />
        <Component {...pageProps} text={text} />
        <Footer footerStyles={footer} />
      </AuthProvider>
    </>
  );
}
export default MyApp;
