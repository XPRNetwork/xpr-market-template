import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Header } from './Header';
import customizationJson from '../../custom/customization';
import localizationJson from '../../custom/localization';

export default {
  title: 'Example/Header',
  component: Header,
} as Meta;

const Template: Story = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  headerText: localizationJson.en.header,
  headerStyles: customizationJson.header,
  typography: customizationJson.typography,
};
