import type { Meta, StoryObj } from '@storybook/react';
import { MainLayout } from './main-layout';
import { Home, ShoppingCart, Package, Users, Settings } from 'lucide-react';
import { PageHeader } from '../custom/page-header';
import { Button } from '../ui/button';

const meta: Meta<typeof MainLayout> = {
  title: 'Layouts/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  args: {
    header: {
      logo: <span className="text-xl font-bold">My Mall</span>,
      navigation: [
        { label: 'Dashboard', href: '/' },
        { label: 'Products', href: '/products' },
      ],
    },
    children: (
      <div className="container py-6">
        <PageHeader title="Dashboard" description="Welcome to your dashboard" />
        <div className="mt-6">
          <p>Main content goes here...</p>
        </div>
      </div>
    ),
  },
};

export const WithSidebar: Story = {
  args: {
    header: {
      logo: <span className="text-xl font-bold">My Mall</span>,
      userMenu: {
        name: 'John Doe',
        email: 'john@example.com',
        items: [
          { label: 'Profile', onClick: () => console.log('Profile') },
          { label: 'Logout', onClick: () => console.log('Logout') },
        ],
      },
    },
    sidebar: {
      sections: [
        {
          items: [
            { label: 'Dashboard', href: '/', icon: Home, active: true },
            { label: 'Products', href: '/products', icon: Package },
            {
              label: 'Orders',
              href: '/orders',
              icon: ShoppingCart,
              badge: '12',
            },
            { label: 'Customers', href: '/customers', icon: Users },
            { label: 'Settings', href: '/settings', icon: Settings },
          ],
        },
      ],
    },
    children: (
      <div className="container py-6">
        <PageHeader
          title="Products"
          description="Manage your product inventory"
          actions={<Button>Add Product</Button>}
        />
        <div className="mt-6 grid gap-4">
          <div className="rounded-lg border bg-card p-6">Product 1</div>
          <div className="rounded-lg border bg-card p-6">Product 2</div>
          <div className="rounded-lg border bg-card p-6">Product 3</div>
        </div>
      </div>
    ),
  },
};

export const Complete: Story = {
  args: {
    header: {
      logo: <span className="text-xl font-bold">My Mall</span>,
      navigation: [
        { label: 'Dashboard', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Orders', href: '/orders' },
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
    },
    sidebar: {
      sections: [
        {
          title: 'Main',
          items: [{ label: 'Dashboard', href: '/', icon: Home, active: true }],
        },
        {
          title: 'Management',
          items: [
            { label: 'Products', href: '/products', icon: Package },
            {
              label: 'Orders',
              href: '/orders',
              icon: ShoppingCart,
              badge: '23',
            },
            { label: 'Customers', href: '/customers', icon: Users },
          ],
        },
      ],
    },
    footer: {
      logo: <span className="text-lg font-bold">My Mall</span>,
      sections: [
        {
          title: 'Company',
          links: [
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
          ],
        },
        {
          title: 'Legal',
          links: [
            { label: 'Privacy', href: '/privacy' },
            { label: 'Terms', href: '/terms' },
          ],
        },
      ],
      copyright: '© 2024 My Mall. All rights reserved.',
    },
    children: (
      <div className="container py-6">
        <PageHeader title="Dashboard" description="Overview of your store" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Total Sales</p>
            <p className="text-2xl font-bold mt-2">$45,231</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Orders</p>
            <p className="text-2xl font-bold mt-2">152</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Products</p>
            <p className="text-2xl font-bold mt-2">1,234</p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="text-sm text-muted-foreground">Customers</p>
            <p className="text-2xl font-bold mt-2">567</p>
          </div>
        </div>
      </div>
    ),
  },
};
