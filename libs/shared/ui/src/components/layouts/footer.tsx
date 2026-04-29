import * as React from 'react';
import { cn } from '../../lib/utils';
import { Separator } from '../ui/separator';

interface FooterLink {
  label: string;
  href: string;
  onClick?: () => void;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  sections?: FooterSection[];
  copyright?: string;
  logo?: React.ReactNode;
  className?: string;
}

export function Footer({ sections, copyright, logo, className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const copyrightText = copyright || `© ${currentYear}. All rights reserved.`;

  return (
    <footer className={cn('border-t bg-background', className)}>
      <div className="container py-8 md:py-12">
        {sections && sections.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {sections.map((section, index) => (
                <div key={index}>
                  <h3 className="mb-4 text-sm font-semibold">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          onClick={link.onClick}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Separator className="my-8" />
          </>
        )}

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {logo && <div>{logo}</div>}
          <p className="text-sm text-muted-foreground">{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
