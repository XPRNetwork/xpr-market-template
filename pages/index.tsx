import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  getTemplatesByCollection,
  Template,
  getLowestPricesForAllCollectionTemplates,
  getAllTemplatesForUserWithAssetCount,
} from '../services/templates';
import { FC } from 'react';
import { Card, LoadingPage, Header } from '../components';
import { useLocaleContext } from '../components/Provider';

const HomePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [templates, setTemplates] = useState<Template[]>([]);
  const { isLoadingLocale } = useLocaleContext();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const templates = await getTemplatesByCollection({ type: 'alprclk' });
      setTemplates(templates);
      setIsLoading(false);

      console.log('templates: ', templates);

      const prices = await getLowestPricesForAllCollectionTemplates({
        type: 'alprclk',
        owner: 'alprclk',
      });
      console.log('prices: ', prices);

      const onSale = await getAllTemplatesForUserWithAssetCount({
        owner: 'alprclk',
        collection: 'alprclk',
      });
      console.log('onsale: ', onSale);
    })();
  }, []);

  if (isLoading || isLoadingLocale) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Header />
      <Card />
    </div>
  );
};

export default HomePage;
