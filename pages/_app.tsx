import { useState, useEffect } from 'react';
import '../styles/reset.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Footer, Navbar, LoadingPage, FontImport } from '../components';
import { AuthProvider } from '../components/Provider';
import customizationJson from '../custom/customization';
import localizationJson from '../custom/localization';

const { footer, navbar, typography } = customizationJson;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [isLoadingLocale, setIsLoadingLocale] = useState<boolean>(true);
  const [locale, setLocale] = useState<string>('');

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
      {!process.env.STORYBOOK_ENVIRONMENT && (
        <FontImport typography={typography} />
      )}
      <AuthProvider>
        <Navbar
          navbarText={text.navbar}
          navbarStyles={navbar}
          typography={typography}
        />
        <Component {...pageProps} text={text} typography={typography} />
        <Footer footerStyles={footer} />
      </AuthProvider>
    </>
  );
}
export default MyApp;
