import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConfirmDialog } from './confirm-dialog';
import { Button } from '../ui/button';

const ConfirmDialogDemo = (args: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <ConfirmDialog
        {...args}
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          console.log('Confirmed');
          setOpen(false);
        }}
      />
    </>
  );
};

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Custom/ConfirmDialog',
  component: ConfirmDialogDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConfirmDialogDemo>;

export const Default: Story = {
  args: {
    title: 'Are you sure?',
    message: 'This action cannot be undone.',
  },
};

export const DeleteConfirmation: Story = {
  args: {
    title: 'Delete Product',
    message:
      'Are you sure you want to delete this product? This action cannot be undone.',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    variant: 'destructive',
  },
};

export const LogoutConfirmation: Story = {
  args: {
    title: 'Logout',
    message:
      'Are you sure you want to logout? Any unsaved changes will be lost.',
    confirmLabel: 'Logout',
    cancelLabel: 'Stay',
    variant: 'default',
  },
};

export const SaveChanges: Story = {
  args: {
    title: 'Save Changes',
    message: 'Do you want to save your changes before leaving?',
    confirmLabel: 'Save',
    cancelLabel: 'Discard',
    variant: 'default',
  },
};
