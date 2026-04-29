import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './page-header';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

const meta: Meta<typeof PageHeader> = {
  title: 'Custom/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: 'Products',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Products',
    description: 'Manage your product inventory and pricing.',
  },
};

export const WithActions: Story = {
  args: {
    title: 'Products',
    description: 'Manage your product inventory and pricing.',
    actions: (
      <>
        <Button variant="outline">Export</Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </>
    ),
  },
};

export const Orders: Story = {
  args: {
    title: 'Orders',
    description: 'View and manage all customer orders.',
    actions: (
      <>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Export</Button>
      </>
    ),
  },
};

export const Dashboard: Story = {
  args: {
    title: 'Dashboard',
    description: "Welcome back! Here's what's happening today.",
  },
};
