import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './footer';

const meta: Meta<typeof Footer> = {
  title: 'Layouts/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {},
};

export const WithLogo: Story = {
  args: {
    logo: <span className="text-lg font-bold">My Mall</span>,
  },
};

export const Complete: Story = {
  args: {
    logo: <span className="text-lg font-bold">My Mall</span>,
    sections: [
      {
        title: 'Products',
        links: [
          { label: 'Electronics', href: '/products/electronics' },
          { label: 'Clothing', href: '/products/clothing' },
          { label: 'Books', href: '/products/books' },
          { label: 'Home & Garden', href: '/products/home' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Careers', href: '/careers' },
          { label: 'Press', href: '/press' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Help Center', href: '/help' },
          { label: 'Shipping Info', href: '/shipping' },
          { label: 'Returns', href: '/returns' },
          { label: 'FAQs', href: '/faqs' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
          { label: 'Cookie Policy', href: '/cookies' },
        ],
      },
    ],
    copyright: '© 2024 My Mall. All rights reserved.',
  },
};

export const WithSections: Story = {
  args: {
    sections: [
      {
        title: 'Shop',
        links: [
          { label: 'All Products', href: '/products' },
          { label: 'Categories', href: '/categories' },
          { label: 'Deals', href: '/deals' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'Support', href: '/support' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
  },
};

export const CustomCopyright: Story = {
  args: {
    logo: <span className="text-lg font-bold">My Mall</span>,
    copyright: '© 2024 My Mall Inc. All rights reserved worldwide.',
  },
};
