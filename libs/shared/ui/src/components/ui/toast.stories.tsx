import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { useToast } from '../../hooks/use-toast';
import { Toaster } from './toaster';

const ToastDemo = ({
  title,
  description,
  variant,
}: {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}) => {
  const { toast } = useToast();

  return (
    <>
      <Button
        onClick={() => {
          toast({
            title,
            description,
            variant,
          });
        }}
      >
        Show Toast
      </Button>
      <Toaster />
    </>
  );
};

const meta: Meta<typeof ToastDemo> = {
  title: 'UI/Toast',
  component: ToastDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToastDemo>;

export const Default: Story = {
  args: {
    title: 'Scheduled: Catch up',
    description: 'Friday, February 10, 2023 at 5:57 PM',
  },
};

export const Success: Story = {
  args: {
    title: 'Success!',
    description: 'Your changes have been saved successfully.',
  },
};

export const Error: Story = {
  args: {
    title: 'Error',
    description: 'There was a problem with your request.',
    variant: 'destructive',
  },
};

const ToastWithAction = () => {
  const { toast } = useToast();
  return (
    <>
      <Button
        onClick={() => {
          toast({
            title: 'Update Available',
            description: 'A new version is available. Click to refresh.',
            action: {
              label: 'Refresh',
              onClick: () => console.log('Refresh clicked'),
            },
          });
        }}
      >
        Show Toast with Action
      </Button>
      <Toaster />
    </>
  );
};

export const WithAction: Story = {
  render: () => <ToastWithAction />,
};
