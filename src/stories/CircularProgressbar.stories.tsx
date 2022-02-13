import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CircularProgressbar from '../components/CircularProgressbar';

export default {
  title: 'Example/CircularProgressbar',
  component: CircularProgressbar
} as ComponentMeta<typeof CircularProgressbar>

const Template: ComponentStory<typeof CircularProgressbar> = (args) => <CircularProgressbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: 70
};