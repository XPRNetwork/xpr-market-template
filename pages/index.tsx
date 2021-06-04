import { useEffect, useState } from 'react';
import {
  getTemplatesByCollection,
  Template,
  getLowestPricesForAllCollectionTemplates,
  getAllTemplatesForUserWithAssetCount,
  formatTemplatesWithPriceAndSaleData,
} from '../services/templates';
import { FC } from 'react';
import { LoadingPage, Header, FeaturedSection } from '../components';
import { useLocaleContext } from '../components/Provider';
import customizationJson from '../custom/customization';
const { collection, owner } = customizationJson;

const HomePage: FC = () => {
  const [isLoadingTemplates, setIsLoadingTemplates] = useState<boolean>(true);
  const [templates, setTemplates] = useState<Template[]>([]);
  const { isLoadingLocale } = useLocaleContext();

  useEffect(() => {
    (async () => {
      try {
        let templates = await getTemplatesByCollection({ type: collection });
        setTemplates(templates);
        setIsLoadingTemplates(false);

        const prices = await getLowestPricesForAllCollectionTemplates({
          type: collection,
          owner,
        });
        const assetsForSale = await getAllTemplatesForUserWithAssetCount({
          owner,
          collection,
        });

        templates = formatTemplatesWithPriceAndSaleData(
          templates,
          prices,
          assetsForSale
        );

        setTemplates(templates);
      } catch (e) {
        setTemplates([]);
      }
    })();
  }, []);

  if (isLoadingTemplates || isLoadingLocale) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Header />
      <FeaturedSection templates={templates} />
    </div>
  );
};

export default HomePage;
