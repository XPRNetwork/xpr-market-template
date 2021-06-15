import { useEffect, useState } from 'react';
import {
  getTemplatesByCollection,
  Template,
  getLowestPricesForAllCollectionTemplates,
  getAllTemplatesForUserWithSaleCount,
  formatTemplatesWithPriceAndSaleData,
} from '../services/templates';
import { FC } from 'react';
import {
  LoadingPage,
  Header,
  FeaturedSection,
  FeaturedCarousel,
  FeaturedGrid,
} from '../components';
import { useLocaleContext } from '../components/Provider';
import customizationJson from '../custom/customization';
import localizationJson from '../custom/localization';
const { collection, owner, header, featuredSection } = customizationJson;

const HomePage: FC = () => {
  const [isLoadingTemplates, setIsLoadingTemplates] = useState<boolean>(true);
  const [templates, setTemplates] = useState<Template[]>([]);
  const { isLoadingLocale, locale } = useLocaleContext();

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
        const assetsForSale = await getAllTemplatesForUserWithSaleCount({
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

  const text = Object.keys(localizationJson[locale]).length
    ? localizationJson[locale]
    : localizationJson['en'];

  return (
    <div>
      <Header styles={header} text={text} />
      <FeaturedSection text={text} styles={featuredSection} />
    </div>
  );
};

export default HomePage;
