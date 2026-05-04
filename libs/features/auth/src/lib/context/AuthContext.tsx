import createAuthStore from 'react-auth-kit/store/createAuthStore';
import AuthProvider from 'react-auth-kit/AuthProvider';
import type { ReactNode } from 'react';
import type { User } from '@org/types';

// Create auth store with cookie-based token storage
const store = createAuthStore<User>('cookie', {
  authName: '_auth',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

interface MyAuthProviderProps {
  children: ReactNode;
}

// AuthProvider component wrapping react-auth-kit's AuthProvider
export function MyAuthProvider({ children }: MyAuthProviderProps) {
  return <AuthProvider store={store}>{children}</AuthProvider>;
}
