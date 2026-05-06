/**
 * UserDetail Component
 *
 * Displays complete user information with tabs for related data.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Edit,
  Trash2,
  UserCircle,
  Store as StoreIcon,
  Package,
  Heart,
  History,
} from 'lucide-react';
import { useUser } from '@org/data-access';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
} from '@org/ui';
import { formatDate, formatRelativeTime } from '@org/utils';
import type { User } from '@org/types';

interface UserDetailProps {
  userId: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

/**
 * UserDetail displays complete user information with tabs
 */
export function UserDetail({
  userId,
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
}: UserDetailProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const { data: user, isLoading, error } = useUser(userId);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(userId);
    } else {
      navigate(`/users/${userId}/edit`);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(userId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading user details..." />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load user"
        message={error instanceof Error ? error.message : 'An error occurred'}
      />
    );
  }

  if (!user) {
    return (
      <ErrorMessage title="User not found" message="This user does not exist" />
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
      {/* Header Card */}
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

            {/* User Information */}
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
                  <span className="text-muted-foreground">Joined:</span>{' '}
                  <span className="font-medium">
                    {formatDate(user.createdAt, 'PPP')}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Last active:</span>{' '}
                  <span className="font-medium">
                    {formatRelativeTime(user.updatedAt)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Language:</span>{' '}
                  <span className="font-medium">
                    {user.preferredLanguage === 'en' ? 'English' : 'Hebrew'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">User ID:</span>{' '}
                  <span className="font-mono text-xs">{user.id}</span>
                </div>
              </div>

              {/* Actions */}
              {(canEdit || canDelete) && (
                <>
                  <Separator />
                  <div className="flex gap-2">
                    {canEdit && (
                      <Button variant="outline" onClick={handleEdit}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </Button>
                    )}
                    {canDelete && (
                      <Button variant="destructive" onClick={handleDelete}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Additional Information */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="related">Related Items</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Email Address
                  </dt>
                  <dd className="mt-1">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Phone Number
                  </dt>
                  <dd className="mt-1">{user.phone || 'Not provided'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Account Status
                  </dt>
                  <dd className="mt-1">
                    <Badge variant={user.isActive ? 'default' : 'secondary'}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    User Role
                  </dt>
                  <dd className="mt-1">
                    <Badge variant={roleVariant}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Preferred Language
                  </dt>
                  <dd className="mt-1">
                    {user.preferredLanguage === 'en' ? 'English' : 'Hebrew'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Member Since
                  </dt>
                  <dd className="mt-1">{formatDate(user.createdAt, 'PPP')}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {user.role === 'customer' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Heart className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Favorites</p>
                      <p className="text-sm text-muted-foreground">
                        View products this user has favorited
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <History className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Browsing History</p>
                      <p className="text-sm text-muted-foreground">
                        View products this user has viewed
                      </p>
                    </div>
                  </div>
                </div>
              ) : user.role === 'vendor' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <StoreIcon className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Stores</p>
                      <p className="text-sm text-muted-foreground">
                        View stores owned by this vendor
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Package className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Products</p>
                      <p className="text-sm text-muted-foreground">
                        View products created by this vendor
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <UserCircle className="h-12 w-12 mx-auto mb-2" />
                  <p>No activity data available for admin users</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Related Items Tab */}
        <TabsContent value="related" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Related Data</CardTitle>
            </CardHeader>
            <CardContent>
              {user.role === 'vendor' ? (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <StoreIcon className="h-4 w-4" />
                      Stores
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      This vendor's stores will be displayed here
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Products
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Products created by this vendor will be displayed here
                    </p>
                  </div>
                </div>
              ) : user.role === 'customer' ? (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Favorite Products
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Customer's favorite products will be displayed here
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No related items for admin users</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
