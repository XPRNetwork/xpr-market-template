import { useEffect, useState } from 'react';
import {
  getTemplatesByCollection,
  Template,
  getLowestPricesForAllCollectionTemplates,
  getAllTemplatesForUserWithAssetCount,
  formatTemplatesWithPriceAndSaleData,
} from '../services/templates';
import { FC } from 'react';
import { Card, LoadingPage, Header } from '../components';
import { useLocaleContext } from '../components/Provider';

const HomePage: FC = () => {
  const [isLoadingTemplates, setIsLoadingTemplates] = useState<boolean>(true);
  const [isLoadingPriceAndSales, setIsLoadingPriceAndSales] =
    useState<boolean>(true);
  const [templates, setTemplates] = useState<Template[]>([]);
  const { isLoadingLocale } = useLocaleContext();

  useEffect(() => {
    (async () => {
      let templates = await getTemplatesByCollection({ type: 'killerz' });
      setTemplates(templates);
      setIsLoadingTemplates(false);

      const prices = await getLowestPricesForAllCollectionTemplates({
        type: 'killerz',
        owner: 'killerz',
      });
      const assetsForSale = await getAllTemplatesForUserWithAssetCount({
        owner: 'killerz',
        collection: 'killerz',
      });
      templates = formatTemplatesWithPriceAndSaleData(
        templates,
        prices,
        assetsForSale
      );

      setTemplates(templates);
      setIsLoadingPriceAndSales(false);
    })();
  }, []);

  if (isLoadingTemplates || isLoadingLocale) {
    return <LoadingPage />;
  }

  console.log('templates: ', templates);
  return (
    <div>
      <Header />
      <Card template={templates[0]} />
    </div>
  );
};

export default HomePage;
