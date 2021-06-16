import { FC, useEffect, useState } from 'react';
import {
  PageContainer,
  HeaderText,
} from '../../components/MyItemsPage/MyItemsPage.styled';
import { useRouter } from 'next/router';
import { FeaturedGrid, LoadingPage } from '../../components';
import { useAuthContext } from '../../components/Provider';
import {
  formatTemplatesWithTotalAssets,
  getAllTemplatesForUserWithAssetCount,
  getTemplatesFromTemplateIds,
  Template,
} from '../../services/templates';
import customizationJson from '../../custom/customization';
import { Text } from '../../custom/localization';

const {
  collection,
  myItemsPage: { backgroundColor, headerFont },
} = customizationJson;

const MyItemsPage: FC<{ text: Text }> = ({ text }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState<boolean>(true);
  const { isLoadingUser, currentUser } = useAuthContext();
  const router = useRouter();
  const actor = currentUser ? currentUser.actor : '';

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

  if (isLoadingUser || isLoadingTemplates) {
    return <LoadingPage />;
  }

  return (
    <PageContainer backgroundColor={backgroundColor}>
      <HeaderText {...headerFont}>{text.myItemsPage.header}</HeaderText>
      <FeaturedGrid
        templates={templates}
        nftCardText={text.nftCard}
        type="user"
      />
    </PageContainer>
  );
};

export default MyItemsPage;
