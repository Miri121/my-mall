import * as React from 'react';
import { Menu, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface HeaderProps {
  logo?: React.ReactNode;
  navigation?: Array<{ label: string; href: string; onClick?: () => void }>;
  userMenu?: {
    name: string;
    email?: string;
    avatar?: string;
    items: Array<{ label: string; onClick: () => void }>;
  };
  onMenuClick?: () => void;
  className?: string;
}

export function Header({
  logo,
  navigation,
  userMenu,
  onMenuClick,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <div className="container flex h-14 items-center">
        {onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        )}

        {logo && <div className="mr-6 flex items-center">{logo}</div>}

        {navigation && (
          <nav className="hidden md:flex md:flex-1 md:items-center md:gap-6">
            {navigation.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={item.onClick}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex flex-1 items-center justify-end gap-2">
          {userMenu && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userMenu.avatar} alt={userMenu.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userMenu.name}
                    </p>
                    {userMenu.email && (
                      <p className="text-xs leading-none text-muted-foreground">
                        {userMenu.email}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMenu.items.map((item, index) => (
                  <DropdownMenuItem key={index} onClick={item.onClick}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
