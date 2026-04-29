import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout } from './auth-layout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const meta: Meta<typeof AuthLayout> = {
  title: 'Layouts/AuthLayout',
  component: AuthLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AuthLayout>;

export const Login: Story = {
  args: {
    title: 'Login',
    description: 'Enter your credentials to access your account',
    children: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button className="w-full">Sign In</Button>
      </div>
    ),
    footer: (
      <>
        Don't have an account?{' '}
        <a href="/register" className="font-medium text-primary hover:underline">
          Sign up
        </a>
      </>
    ),
  },
};

export const Register: Story = {
  args: {
    title: 'Create an account',
    description: 'Enter your information to get started',
    children: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Doe" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button className="w-full">Create Account</Button>
      </div>
    ),
    footer: (
      <>
        Already have an account?{' '}
        <a href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </a>
      </>
    ),
  },
};

export const WithLogo: Story = {
  args: {
    logo: (
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-lg bg-primary p-3">
          <span className="text-2xl font-bold text-primary-foreground">MM</span>
        </div>
        <span className="text-xl font-bold">My Mall</span>
      </div>
    ),
    title: 'Welcome Back',
    description: 'Sign in to continue to your account',
    children: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <div className="flex items-center justify-between">
          <a href="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        <Button className="w-full">Sign In</Button>
      </div>
    ),
  },
};

export const ForgotPassword: Story = {
  args: {
    title: 'Reset Password',
    description: 'Enter your email to receive a reset link',
    children: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" />
        </div>
        <Button className="w-full">Send Reset Link</Button>
      </div>
    ),
    footer: (
      <>
        Remember your password?{' '}
        <a href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </a>
      </>
    ),
  },
};
