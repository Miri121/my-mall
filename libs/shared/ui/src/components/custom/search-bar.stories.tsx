import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchBar } from './search-bar';

const SearchBarDemo = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return <SearchBar {...args} value={value} onChange={setValue} />;
};

const meta: Meta<typeof SearchBar> = {
  title: 'Custom/SearchBar',
  component: SearchBarDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchBarDemo>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Search...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Product name',
    placeholder: 'Search...',
  },
};

export const ProductSearch: Story = {
  args: {
    value: '',
    placeholder: 'Search products...',
    className: 'w-[400px]',
  },
};

export const CustomerSearch: Story = {
  args: {
    value: '',
    placeholder: 'Search customers by name or email...',
    className: 'w-[500px]',
  },
};

export const WithClearButton: Story = {
  args: {
    value: 'Search term',
    placeholder: 'Search...',
    className: 'w-[350px]',
  },
};
