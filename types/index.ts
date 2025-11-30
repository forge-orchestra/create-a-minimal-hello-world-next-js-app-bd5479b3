import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export interface IconProps {
  size?: number;
  color?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface HelloWorldProps {
  message: string;
}