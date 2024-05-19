import React from 'react'
import Display from '../display/index.jsx'

export default {
  title: 'Calculator/Display',
  component: Display,
  argTypes: {
    value: { control: 'text' },
  },
}

const Template = (args) => <Display {...args} />

export const Default = Template.bind({})
Default.args = {
  value: '123456',
}

export const LongValue = Template.bind({})
LongValue.args = {
  value: '1234567890',
}

export const ErrorValue = Template.bind({})
ErrorValue.args = {
  value: 'ERROR',
}

export const DecimalValue = Template.bind({})
DecimalValue.args = {
  value: '123.45',
}
