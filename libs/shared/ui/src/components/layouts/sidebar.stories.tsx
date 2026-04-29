import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './sidebar';
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  Settings,
  BarChart,
} from 'lucide-react';

const meta: Meta<typeof Sidebar> = {
  title: 'Layouts/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    sections: [
      {
        items: [
          { label: 'Dashboard', href: '/', icon: Home, active: true },
          { label: 'Products', href: '/products', icon: Package },
          { label: 'Orders', href: '/orders', icon: ShoppingCart, badge: '12' },
          { label: 'Customers', href: '/customers', icon: Users },
        ],
      },
    ],
  },
};

export const WithSections: Story = {
  args: {
    sections: [
      {
        title: 'Main',
        items: [
          { label: 'Dashboard', href: '/', icon: Home, active: true },
          { label: 'Analytics', href: '/analytics', icon: BarChart },
        ],
      },
      {
        title: 'Management',
        items: [
          { label: 'Products', href: '/products', icon: Package },
          { label: 'Orders', href: '/orders', icon: ShoppingCart, badge: '12' },
          { label: 'Customers', href: '/customers', icon: Users },
        ],
      },
      {
        title: 'Settings',
        items: [{ label: 'Settings', href: '/settings', icon: Settings }],
      },
    ],
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    sections: [
      {
        items: [
          { label: 'Dashboard', href: '/', icon: Home, active: true },
          { label: 'Products', href: '/products', icon: Package },
          { label: 'Orders', href: '/orders', icon: ShoppingCart },
          { label: 'Customers', href: '/customers', icon: Users },
          { label: 'Settings', href: '/settings', icon: Settings },
        ],
      },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    sections: [
      {
        items: [
          { label: 'Dashboard', href: '/', icon: Home, active: true },
          { label: 'Products', href: '/products', icon: Package },
          { label: 'Orders', href: '/orders', icon: ShoppingCart, badge: '23' },
          { label: 'Customers', href: '/customers', icon: Users, badge: '150' },
          { label: 'Settings', href: '/settings', icon: Settings },
        ],
      },
    ],
  },
};

export const Interactive: Story = {
  args: {
    sections: [
      {
        title: 'Navigation',
        items: [
          {
            label: 'Dashboard',
            icon: Home,
            onClick: () => alert('Dashboard clicked'),
            active: true,
          },
          {
            label: 'Products',
            icon: Package,
            onClick: () => alert('Products clicked'),
          },
          {
            label: 'Orders',
            icon: ShoppingCart,
            onClick: () => alert('Orders clicked'),
            badge: '5',
          },
        ],
      },
    ],
    onCollapse: () => console.log('Collapse toggled'),
  },
};
