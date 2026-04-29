import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ImageUpload } from './image-upload';

const ImageUploadDemo = (args: any) => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <div className="w-[400px]">
      <ImageUpload {...args} onChange={setFile} />
      {file && (
        <p className="mt-2 text-sm text-muted-foreground">
          Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </p>
      )}
    </div>
  );
};

const meta: Meta<typeof ImageUpload> = {
  title: 'Custom/ImageUpload',
  component: ImageUploadDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImageUploadDemo>;

export const Default: Story = {
  args: {},
};

export const WithPreview: Story = {
  args: {
    value:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
  },
};

export const CustomMaxSize: Story = {
  args: {
    maxSize: 2 * 1024 * 1024,
  },
};

export const DragState: Story = {
  render: () => {
    const handleChange = () => {
      console.log('File changed');
    };
    return (
      <div className="w-[400px]">
        <ImageUpload onChange={handleChange} />
        <p className="mt-4 text-sm text-muted-foreground">
          Try dragging and dropping an image onto the upload area.
        </p>
      </div>
    );
  },
};
