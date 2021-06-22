import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Navbar } from './Navbar';
import localizationJson from '../../custom/localization';
import customizationJson from '../../custom/customization';

export default {
  title: 'Example/Navbar',
  component: Navbar,
} as Meta;

const Template: Story = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  isLoggedIn: false,
  navbarText: localizationJson.en.navbar,
  navbarStyles: customizationJson.navbar,
  typography: customizationJson.typography,
  currentUserBalance: '',
  currentUser: undefined,
  login: () => console.log('login'),
  logout: () => console.log('logout'),
};
