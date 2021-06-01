import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  getTemplatesByCollection,
  Template,
  getLowestPricesForAllCollectionTemplates,
} from '../services/templates';
import { FC } from 'react';
import { Card, LoadingPage } from '../components';

const HomePage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const templates = await getTemplatesByCollection({ type: 'monsters' });
      setTemplates(templates);
      setIsLoading(false);

      const prices = await getLowestPricesForAllCollectionTemplates({
        type: 'monsters',
      });
      console.log('prices: ', prices);
    })();
  }, []);

  if (isLoading) {
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
