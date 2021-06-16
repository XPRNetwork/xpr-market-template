import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Footer } from './Footer';
import customizationJson from '../../custom/customization';

export default {
  title: 'Example/Footer',
  component: Footer,
} as Meta;

const Template: Story = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  footerStyles: customizationJson.footer,
};
