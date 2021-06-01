import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  FC,
} from 'react';

interface LocaleContext {
  locale: string;
  isLoadingLocale: boolean;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const LocaleContext = createContext<LocaleContext>({
  locale: '',
  isLoadingLocale: true,
});

export const useLocaleContext = (): LocaleContext => {
  const context = useContext(LocaleContext);
  return context;
};

export const LocaleProvider: FC<Props> = ({ children }) => {
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

  const value = useMemo<LocaleContext>(
    () => ({
      locale,
      isLoadingLocale,
    }),
    [locale, isLoadingLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};
