// Utils
export { cn } from './lib/utils';

// Hooks
export { useToast, toast } from './hooks/use-toast';

// shadcn/ui Base Components
export { Button, buttonVariants } from './components/ui/button';
export type { ButtonProps } from './components/ui/button';

export { Input } from './components/ui/input';
export type { InputProps } from './components/ui/input';

export { Label } from './components/ui/label';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './components/ui/card';

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/ui/dialog';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './components/ui/dropdown-menu';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from './components/ui/select';

export { Checkbox } from './components/ui/checkbox';

export { RadioGroup, RadioGroupItem } from './components/ui/radio-group';

export { Textarea } from './components/ui/textarea';
export type { TextareaProps } from './components/ui/textarea';

export {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from './components/ui/toast';
export type { ToastProps, ToastActionElement } from './components/ui/toast';

export { Toaster } from './components/ui/toaster';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './components/ui/table';

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';

export { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar';

export { Badge, badgeVariants } from './components/ui/badge';
export type { BadgeProps } from './components/ui/badge';

export { Separator } from './components/ui/separator';

export { Skeleton } from './components/ui/skeleton';

export { Alert, AlertTitle, AlertDescription } from './components/ui/alert';

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './components/ui/alert-dialog';

// Custom Components
export { LoadingSpinner } from './components/custom/loading-spinner';
export { ErrorMessage } from './components/custom/error-message';
export { EmptyState } from './components/custom/empty-state';
export { PageHeader } from './components/custom/page-header';
export { PageContainer } from './components/custom/page-container';
export { DataTable } from './components/custom/data-table';
export type { ColumnDef } from './components/custom/data-table';
export { SearchBar } from './components/custom/search-bar';
export { FilterPanel } from './components/custom/filter-panel';
export { ImageUpload } from './components/custom/image-upload';
export { ConfirmDialog } from './components/custom/confirm-dialog';
export { Breadcrumbs } from './components/custom/breadcrumbs';
export type { BreadcrumbItem } from './components/custom/breadcrumbs';

// Layout Components
export { Header } from './components/layouts/header';
export { Footer } from './components/layouts/footer';
export { Sidebar } from './components/layouts/sidebar';
export type { SidebarItem, SidebarSection } from './components/layouts/sidebar';
export { MainLayout } from './components/layouts/main-layout';
export { AuthLayout } from './components/layouts/auth-layout';
