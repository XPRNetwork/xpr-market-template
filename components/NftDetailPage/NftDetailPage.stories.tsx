import React from 'react';
import { Story, Meta } from '@storybook/react';
import { NftDetailPage, NFT_DETAIL_PAGE_TYPES } from './NftDetailPage';
import { defaultStorybookTemplate } from '../../utils/constants';
import customizationJson from '../../custom/customization';
import localizationJson from '../../custom/localization';

export default {
  title: 'Example/NftDetailPage',
  component: NftDetailPage,
} as Meta;

const Template: Story = (args) => <NftDetailPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: NFT_DETAIL_PAGE_TYPES.BUY,
  template: defaultStorybookTemplate,
  detailPageStyles: customizationJson.detailPage,
  detailPageText: localizationJson.en.detailPage,
  typography: customizationJson.typography,
  ownedPageProps: {
    owner: '',
    isSelectedAssetOnSale: false,
    dropdownProps: {
      assets: [
        { asset_id: 1, template_mint: 1 },
        { asset_id: 2, template_mint: 2 },
        { asset_id: 3, template_mint: 3 },
        { asset_id: 4, template_mint: 4 },
        { asset_id: 5, template_mint: 5 },
        { asset_id: 6, template_mint: 6 },
        { asset_id: 7, template_mint: 7 },
      ],
      salePrices: {
        1: '10 XUSDC',
        2: '10 XUSDC',
        3: '10 XUSDC',
      },
      selectedAssetId: '1',
      setSelectedAssetId: () => {},
    },
  },
  buyPageProps: {
    onButtonClick: () => {},
    purchasingError: 'Example error message.',
  },
};
