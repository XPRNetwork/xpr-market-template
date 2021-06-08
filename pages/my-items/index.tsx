import { FC, useEffect, useState } from 'react';
import {
  PageContainer,
  HeaderText,
} from '../../components/MyItemsPage/MyItemsPage.styled';
import { useRouter } from 'next/router';
import { FeaturedGrid, LoadingPage } from '../../components';
import { useAuthContext, useLocaleContext } from '../../components/Provider';
import {
  formatTemplatesWithTotalAssets,
  getAllTemplatesForUserWithAssetCount,
  getTemplatesFromTemplateIds,
  Template,
} from '../../services/templates';
import customizationJson from '../../custom/customization';
import localizationJson from '../../custom/localization';

const MyItemsPage: FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState<boolean>(true);
  const { isLoadingUser, currentUser } = useAuthContext();
  const { isLoadingLocale, locale } = useLocaleContext();
  const router = useRouter();
  const actor = currentUser ? currentUser.actor : '';

  const { collection } = customizationJson;
  const text =
    locale && Object.keys(localizationJson[locale]).length
      ? localizationJson[locale].myItemsPage
      : localizationJson['en'].myItemsPage;

  useEffect(() => {
    if (!isLoadingUser && !actor) {
      router.push('/');
    }
  }, [isLoadingUser]);

  useEffect(() => {
    (async () => {
      if (!isLoadingUser && actor) {
        try {
          const assetCount = await getAllTemplatesForUserWithAssetCount({
            owner: actor,
            collection,
          });
          const templateIds = Object.keys(assetCount);
          const templates = await getTemplatesFromTemplateIds(templateIds);
          const templatesWithAssetCount = formatTemplatesWithTotalAssets(
            templates,
            assetCount
          );
          setTemplates(templatesWithAssetCount);
          setIsLoadingTemplates(false);
        } catch (e) {
          setIsLoadingTemplates(false);
          setTemplates([]);
        }
      }
    })();
  }, [isLoadingUser]);

  if (isLoadingUser || isLoadingLocale || isLoadingTemplates) {
    return <LoadingPage />;
  }

  return (
    <PageContainer>
      <HeaderText>{text.header}</HeaderText>
      <FeaturedGrid templates={templates} type="user"></FeaturedGrid>
    </PageContainer>
  );
};

export default MyItemsPage;
