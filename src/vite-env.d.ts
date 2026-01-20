/// <reference types="vite/client" />

interface UnicornStudio {
  isInitialized: boolean;
  init?: () => void;
}

declare global {
  interface Window {
    UnicornStudio: UnicornStudio;
  }
}

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  export const meta: {
    title: string;
    date: string;
    slug: string;
    excerpt: string;
  };
  const component: ComponentType;
  export default component;
}
