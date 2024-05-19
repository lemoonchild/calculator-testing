import React from 'react'
import Button from '../button/index.jsx'

export default {
  title: 'Calculator/Button',
  component: Button,
  argTypes: {
    label: { control: 'text' },
    isActive: { control: 'boolean' },
    color: { control: 'color' },
    textColor: { control: 'color' },
  },
}

const Template = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  label: '1',
  isActive: false,
  color: '#bbbbbb',
  textColor: '#000000',
}

export const Active = Template.bind({})
Active.args = {
  label: '1',
  isActive: true,
  color: '#4a4a4a',
  textColor: '#ffffff',
}

export const CustomColors = Template.bind({})
CustomColors.args = {
  label: 'C',
  isActive: false,
  color: '#a02022',
  textColor: '#ffffff',
}

export const Small = Template.bind({})
Small.args = {
  label: '1',
  isActive: false,
  color: '#bbbbbb',
  textColor: '#000000',
  className: 'small',
}

export const Large = Template.bind({})
Large.args = {
  label: '1',
  isActive: false,
  color: '#bbbbbb',
  textColor: '#000000',
  className: 'large',
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  label: '±',
  isActive: false,
  color: '#4a4a4a',
  textColor: '#ffffff',
  className: 'with-icon',
}
