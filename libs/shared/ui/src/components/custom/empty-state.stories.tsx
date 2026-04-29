import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './empty-state';
import { Package, ShoppingCart, Search, Users } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
  title: 'Custom/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoProducts: Story = {
  args: {
    icon: Package,
    title: 'No products found',
    description: 'Get started by adding your first product.',
  },
};

export const EmptyCart: Story = {
  args: {
    icon: ShoppingCart,
    title: 'Your cart is empty',
    description: 'Add items to your cart to see them here.',
    action: {
      label: 'Browse Products',
      onClick: () => console.log('Browse products'),
    },
  },
};

export const NoSearchResults: Story = {
  args: {
    icon: Search,
    title: 'No results found',
    description: 'Try adjusting your search or filter to find what you\'re looking for.',
  },
};

export const NoCustomers: Story = {
  args: {
    icon: Users,
    title: 'No customers yet',
    description: 'Your customer list is empty. Customers will appear here once they sign up.',
    action: {
      label: 'Invite Customers',
      onClick: () => console.log('Invite customers'),
    },
  },
};

export const WithAction: Story = {
  args: {
    icon: Package,
    title: 'No items',
    description: 'Click the button below to add your first item.',
    action: {
      label: 'Add Item',
      onClick: () => alert('Add item clicked'),
    },
  },
};
