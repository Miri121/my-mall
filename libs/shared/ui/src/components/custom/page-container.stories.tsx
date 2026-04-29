import type { Meta, StoryObj } from '@storybook/react';
import { PageContainer } from './page-container';
import { PageHeader } from './page-header';
import { Button } from '../ui/button';

const meta: Meta<typeof PageContainer> = {
  title: 'Custom/PageContainer',
  component: PageContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageContainer>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h2 className="text-2xl font-bold">Content goes here</h2>
        <p className="text-muted-foreground mt-2">
          This container provides consistent padding and max-width.
        </p>
      </div>
    ),
  },
};

export const WithPageHeader: Story = {
  args: {
    children: (
      <>
        <PageHeader
          title="Products"
          description="Manage your product inventory and pricing."
          actions={<Button>Add Product</Button>}
        />
        <div className="space-y-4">
          <p>Product list would go here...</p>
        </div>
      </>
    ),
  },
};

export const MultipleContent: Story = {
  args: {
    children: (
      <>
        <PageHeader title="Dashboard" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border bg-card p-6">
              <h3 className="text-sm font-medium">Card {i}</h3>
              <p className="text-2xl font-bold mt-2">1,234</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
};
