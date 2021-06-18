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
import customizationJson, { Typography } from '../custom/customization';
import { Text } from '../custom/localization';
const { collection, owner, header, featuredSection, nftCard } =
  customizationJson;

const HomePage: FC<{ text: Text; typography: Typography }> = ({
  text,
  typography,
}) => {
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
    <>
      <Header
        headerStyles={header}
        headerText={text.header}
        typography={typography}
      />
      <FeaturedSection
        templates={templates}
        featuredSectionText={text.featuredSection}
        featuredSectionStyles={featuredSection}
        nftCardText={text.nftCard}
        nftCardStyles={nftCard}
        typography={typography}
      />
    </>
  );
};

export default HomePage;
