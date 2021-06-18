import React from 'react';
import { Story, Meta } from '@storybook/react';
import { FeaturedSection } from './FeaturedSection';
import customizationJson from '../../custom/customization';
import localizationJson from '../../custom/localization';
import { defaultStorybookTemplate } from '../../utils/constants';

export default {
  title: 'Example/FeaturedSection',
  component: FeaturedSection,
} as Meta;

const Template: Story = (args) => <FeaturedSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  featuredSectionStyles: customizationJson.featuredSection,
  featuredSectionText: localizationJson.en.featuredSection,
  nftCardText: localizationJson.en.nftCard,
  nftCardStyles: customizationJson.nftCard,
  typography: customizationJson.typography,
  templates: [
    defaultStorybookTemplate,
    defaultStorybookTemplate,
    defaultStorybookTemplate,
    defaultStorybookTemplate,
    defaultStorybookTemplate,
    defaultStorybookTemplate,
    defaultStorybookTemplate,
  ],
};
