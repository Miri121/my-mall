import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header';

const meta: Meta<typeof Header> = {
  title: 'Layouts/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    logo: <span className="text-xl font-bold">My Mall</span>,
  },
};

export const WithNavigation: Story = {
  args: {
    logo: <span className="text-xl font-bold">My Mall</span>,
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Categories', href: '/categories' },
      { label: 'About', href: '/about' },
    ],
  },
};

export const WithUserMenu: Story = {
  args: {
    logo: <span className="text-xl font-bold">My Mall</span>,
    navigation: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Orders', href: '/orders' },
      { label: 'Products', href: '/products' },
    ],
    userMenu: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://github.com/shadcn.png',
      items: [
        { label: 'Profile', onClick: () => console.log('Profile') },
        { label: 'Settings', onClick: () => console.log('Settings') },
        { label: 'Logout', onClick: () => console.log('Logout') },
      ],
    },
  },
};

export const WithMobileMenu: Story = {
  args: {
    logo: <span className="text-xl font-bold">My Mall</span>,
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
    ],
    onMenuClick: () => console.log('Menu clicked'),
  },
};

export const Complete: Story = {
  args: {
    logo: <span className="text-xl font-bold">My Mall</span>,
    navigation: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Products', href: '/products' },
      { label: 'Orders', href: '/orders' },
      { label: 'Customers', href: '/customers' },
    ],
    userMenu: {
      name: 'Admin User',
      email: 'admin@mymall.com',
      items: [
        { label: 'Profile', onClick: () => console.log('Profile') },
        { label: 'Settings', onClick: () => console.log('Settings') },
        { label: 'Logout', onClick: () => console.log('Logout') },
      ],
    },
    onMenuClick: () => console.log('Menu clicked'),
  },
};
