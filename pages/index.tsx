import { useEffect, useState } from 'react';
import {
  getTemplatesByCollection,
  Template,
  getLowestPricesForAllCollectionTemplates,
  getAllTemplatesForUserWithSaleCount,
  formatTemplatesWithPriceAndSaleData,
} from '../services/templates';
import { FC } from 'react';
import { LoadingPage, Header, FeaturedSection } from '../components';
import customizationJson from '../custom/customization';
import { Text } from '../custom/localization';
const { collection, owner, header, featuredSection } = customizationJson;

const HomePage: FC<{ text: Text }> = ({ text }) => {
  const [isLoadingTemplates, setIsLoadingTemplates] = useState<boolean>(true);
  const [templates, setTemplates] = useState<Template[]>([]);

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

  if (isLoadingTemplates) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Header headerStyles={header} headerText={text.header} />
      <FeaturedSection
        templates={templates}
        featuredSectionText={text.featuredSection}
        nftCardText={text.nftCard}
        featuredSectionStyles={featuredSection}
      />
    </div>
  );
};

export default HomePage;
