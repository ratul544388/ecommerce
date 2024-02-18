"use client"
interface PageHeaderProps {
  navigations?: {
    label: string;
    href: string;
  }[],
  pageLabel: string;
  actionLabel?: string;
  
}

export const PageHeader = ({} : PageHeaderProps) => {
  return (
     <div>
        PageHeader
     </div>
    );
}
