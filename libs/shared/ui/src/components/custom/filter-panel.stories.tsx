import type { Meta, StoryObj } from '@storybook/react';
import { FilterPanel } from './filter-panel';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';

const meta: Meta<typeof FilterPanel> = {
  title: 'Custom/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterPanel>;

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <div>
          <Label>Category</Label>
          <Select>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="books">Books</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    ),
  },
};

export const WithMultipleFilters: Story = {
  args: {
    className: 'w-[300px]',
    children: (
      <div className="space-y-4">
        <div>
          <Label>Category</Label>
          <Select>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="books">Books</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Price Range</Label>
          <div className="flex gap-2 mt-1">
            <Input type="number" placeholder="Min" />
            <Input type="number" placeholder="Max" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Availability</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" />
            <Label htmlFor="in-stock">In Stock</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="on-sale" />
            <Label htmlFor="on-sale">On Sale</Label>
          </div>
        </div>
      </div>
    ),
  },
};

export const Closed: Story = {
  args: {
    defaultOpen: false,
    className: 'w-[300px]',
    children: (
      <div className="space-y-4">
        <div>
          <Label>Category</Label>
          <Select>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    ),
  },
};

export const ProductFilters: Story = {
  args: {
    title: 'Product Filters',
    className: 'w-[300px]',
    children: (
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Brands</Label>
          <div className="space-y-2 mt-2">
            {['Apple', 'Samsung', 'Sony', 'LG'].map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox id={brand.toLowerCase()} />
                <Label htmlFor={brand.toLowerCase()} className="font-normal">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium">Rating</Label>
          <div className="space-y-2 mt-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox id={`rating-${rating}`} />
                <Label htmlFor={`rating-${rating}`} className="font-normal">
                  {rating}+ Stars
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-2">
          <Button variant="outline" className="w-full">
            Clear Filters
          </Button>
        </div>
      </div>
    ),
  },
};
