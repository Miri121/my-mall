import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from './error-message';

const meta: Meta<typeof ErrorMessage> = {
  title: 'Custom/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
  args: {
    message: 'An error occurred while processing your request.',
  },
};

export const NetworkError: Story = {
  args: {
    title: 'Network Error',
    message:
      'Unable to connect to the server. Please check your internet connection.',
  },
};

export const ValidationError: Story = {
  args: {
    title: 'Validation Error',
    message: 'Please fill in all required fields correctly.',
  },
};

export const AuthenticationError: Story = {
  args: {
    title: 'Authentication Failed',
    message: 'Your session has expired. Please log in again.',
  },
};

export const CustomWidth: Story = {
  args: {
    message: 'This is an error message with custom width.',
    className: 'w-[500px]',
  },
};
