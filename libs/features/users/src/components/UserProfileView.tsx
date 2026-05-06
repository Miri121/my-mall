/**
 * UserProfileView Component
 *
 * Display current user's profile (read-only view) with edit and account management options.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Edit,
  Trash2,
  Key,
  Heart,
  History,
  Store as StoreIcon,
  Package,
} from 'lucide-react';
import { useUserProfile, useDeleteAccount } from '@org/data-access';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  LoadingSpinner,
  ErrorMessage,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Separator,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Alert,
  AlertDescription,
  toast,
} from '@org/ui';
import { formatDate } from '@org/utils';

interface UserProfileViewProps {
  onEditProfile?: () => void;
  onChangePassword?: () => void;
}

/**
 * UserProfileView displays current user's profile information
 */
export function UserProfileView({
  onEditProfile,
  onChangePassword,
}: UserProfileViewProps) {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data: user, isLoading, error } = useUserProfile();
  const deleteAccount = useDeleteAccount();

  const handleEditProfile = () => {
    if (onEditProfile) {
      onEditProfile();
    } else {
      navigate('/profile/edit');
    }
  };

  const handleChangePassword = () => {
    if (onChangePassword) {
      onChangePassword();
    } else {
      navigate('/profile/change-password');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount.mutateAsync();

      toast({
        title: 'Account Deleted',
        description: 'Your account has been successfully deleted',
      });

      // Redirect to home or login page
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to delete account',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load profile"
        message={error instanceof Error ? error.message : 'An error occurred'}
      />
    );
  }

  if (!user) {
    return (
      <ErrorMessage
        title="Not authenticated"
        message="Please log in to view your profile"
      />
    );
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const roleVariant =
    user.role === 'admin'
      ? 'destructive'
      : user.role === 'vendor'
      ? 'default'
      : 'secondary';

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.avatar || undefined} alt={user.name} />
                <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Badge variant={roleVariant}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
                <Badge variant={user.isActive ? 'default' : 'secondary'}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>

            {/* Profile Information */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-lg text-muted-foreground">{user.email}</p>
                {user.phone && (
                  <p className="text-muted-foreground">{user.phone}</p>
                )}
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Member since:</span>{' '}
                  <span className="font-medium">
                    {formatDate(user.createdAt, 'PPP')}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Language:</span>{' '}
                  <span className="font-medium">
                    {user.preferredLanguage === 'en' ? 'English' : 'Hebrew'}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button variant="default" onClick={handleEditProfile}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button variant="outline" onClick={handleChangePassword}>
                  <Key className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role-Specific Information */}
      {user.role === 'customer' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Favorites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                View and manage your favorite products
              </p>
              <Button variant="outline" className="mt-4 w-full">
                View Favorites
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Browsing History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                View your recently viewed products
              </p>
              <Button variant="outline" className="mt-4 w-full">
                View History
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {user.role === 'vendor' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <StoreIcon className="h-5 w-5" />
                My Stores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Manage your stores and storefronts
              </p>
              <Button variant="outline" className="mt-4 w-full">
                View Stores
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                My Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                View and manage your product listings
              </p>
              <Button variant="outline" className="mt-4 w-full">
                View Products
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your account?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Alert variant="destructive">
            <AlertDescription>
              <strong>Warning:</strong> This action cannot be undone. Your
              account and all associated data will be permanently deleted,
              including:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Your profile and settings</li>
                {user.role === 'customer' && (
                  <>
                    <li>Your favorites and browsing history</li>
                  </>
                )}
                {user.role === 'vendor' && (
                  <>
                    <li>Your stores and products</li>
                    <li>All store analytics and data</li>
                  </>
                )}
                <li>All activity logs</li>
              </ul>
            </AlertDescription>
          </Alert>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteAccount.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={deleteAccount.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteAccount.isPending ? 'Deleting...' : 'Delete My Account'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
