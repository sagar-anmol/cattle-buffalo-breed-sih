import type { SVGProps } from 'react';

export function CattleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.5 9.5c.3-1.2.5-2.5.5-3.8V4h-2v1.5c0 .7-.1 1.4-.3 2" />
      <path d="M3.5 9.5c-.3-1.2-.5-2.5-.5-3.8V4h2v1.5c0 .7.1 1.4.3 2" />
      <path d="M12 19.5c-2.4 0-4.5-1.1-6-3" />
      <path d="M18 16.5c1.5-1.5 2.4-3.5 2.5-5.5" />
      <path d="M6 16.5c-1.5-1.5-2.4-3.5-2.5-5.5" />
      <path d="M12 2v7" />
      <path d="M9.5 2h5" />
      <path d="M10.5 12.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
      <path d="M14.5 12.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
    </svg>
  );
}
