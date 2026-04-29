import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Custom/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics' },
    ],
  },
};

export const ShortPath: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'Dashboard' }],
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops', href: '/products/electronics/laptops' },
      { label: 'Gaming Laptops', href: '/products/electronics/laptops/gaming' },
      { label: 'ASUS ROG' },
    ],
  },
};

export const WithOnClick: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => alert('Navigating to Home') },
      { label: 'Orders', onClick: () => alert('Navigating to Orders') },
      { label: 'Order #12345' },
    ],
  },
};

export const ProductDetails: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Wireless Mouse' },
    ],
  },
};

export const CustomerProfile: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Customers', href: '/customers' },
      { label: 'John Doe' },
    ],
  },
};
