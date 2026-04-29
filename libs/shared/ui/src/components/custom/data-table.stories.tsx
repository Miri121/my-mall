import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './data-table';
import { Badge } from '../ui/badge';

const meta: Meta<typeof DataTable> = {
  title: 'Custom/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
};

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 29.99,
    stock: 150,
    status: 'active',
  },
  {
    id: '2',
    name: 'USB Cable',
    category: 'Accessories',
    price: 9.99,
    stock: 45,
    status: 'active',
  },
  {
    id: '3',
    name: 'Keyboard',
    category: 'Electronics',
    price: 79.99,
    stock: 0,
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Monitor',
    category: 'Electronics',
    price: 299.99,
    stock: 25,
    status: 'active',
  },
  {
    id: '5',
    name: 'Laptop Stand',
    category: 'Accessories',
    price: 49.99,
    stock: 60,
    status: 'active',
  },
];

export const Default: Story = {
  args: {
    columns: [
      { header: 'Product', accessorKey: 'name', sortable: true },
      { header: 'Category', accessorKey: 'category', sortable: true },
      {
        header: 'Price',
        accessorKey: 'price',
        sortable: true,
        cell: (value) => `$${value}`,
      },
      { header: 'Stock', accessorKey: 'stock', sortable: true },
    ],
    data: sampleProducts,
  },
};

export const WithSearch: Story = {
  args: {
    columns: [
      { header: 'Product', accessorKey: 'name', sortable: true },
      { header: 'Category', accessorKey: 'category', sortable: true },
      {
        header: 'Price',
        accessorKey: 'price',
        sortable: true,
        cell: (value) => `$${value}`,
      },
      { header: 'Stock', accessorKey: 'stock', sortable: true },
    ],
    data: sampleProducts,
    searchable: true,
    searchPlaceholder: 'Search products...',
  },
};

export const WithCustomCells: Story = {
  args: {
    columns: [
      { header: 'Product', accessorKey: 'name', sortable: true },
      { header: 'Category', accessorKey: 'category' },
      {
        header: 'Price',
        accessorKey: 'price',
        sortable: true,
        cell: (value) => <span className="font-medium">${value}</span>,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (value) => (
          <Badge variant={value === 'active' ? 'default' : 'secondary'}>
            {String(value)}
          </Badge>
        ),
      },
    ],
    data: sampleProducts,
    searchable: true,
  },
};

type Order = {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
};

const sampleOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    date: '2024-01-15',
    total: 129.99,
    status: 'completed',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    date: '2024-01-16',
    total: 79.5,
    status: 'pending',
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    date: '2024-01-17',
    total: 249.99,
    status: 'completed',
  },
  {
    id: 'ORD-004',
    customer: 'Alice Brown',
    date: '2024-01-18',
    total: 59.99,
    status: 'cancelled',
  },
];

export const OrdersTable: Story = {
  args: {
    columns: [
      { header: 'Order ID', accessorKey: 'id', sortable: true },
      { header: 'Customer', accessorKey: 'customer', sortable: true },
      { header: 'Date', accessorKey: 'date', sortable: true },
      {
        header: 'Total',
        accessorKey: 'total',
        sortable: true,
        cell: (value) => `$${Number(value).toFixed(2)}`,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (value) => {
          const variant =
            value === 'completed'
              ? 'default'
              : value === 'pending'
              ? 'secondary'
              : 'destructive';
          return <Badge variant={variant}>{String(value)}</Badge>;
        },
      },
    ],
    data: sampleOrders,
    searchable: true,
    searchPlaceholder: 'Search orders...',
  },
};
