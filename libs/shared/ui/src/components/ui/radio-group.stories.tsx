import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from './label';

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </RadioGroup>
  ),
};

export const ShippingOptions: Story = {
  render: () => (
    <RadioGroup defaultValue="standard">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="standard" id="standard" />
        <Label htmlFor="standard" className="flex flex-col">
          <span>Standard Shipping</span>
          <span className="text-xs text-muted-foreground">
            5-7 business days - Free
          </span>
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="express" id="express" />
        <Label htmlFor="express" className="flex flex-col">
          <span>Express Shipping</span>
          <span className="text-xs text-muted-foreground">
            2-3 business days - $9.99
          </span>
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="overnight" id="overnight" />
        <Label htmlFor="overnight" className="flex flex-col">
          <span>Overnight Shipping</span>
          <span className="text-xs text-muted-foreground">
            Next day - $19.99
          </span>
        </Label>
      </div>
    </RadioGroup>
  ),
};
