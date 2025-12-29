/**
 * TypeScript Type Definitions
 * Centralized type definitions for Kitchen Kraft application
 */

import { Metadata } from 'next';

// Re-export API types for convenience
export type { Genre, Product, SEOGenre, SEOProduct } from './api';
export { APIError } from './api';

// Navigation Types
export interface NavigationItem {
  name: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
  icon?: React.ComponentType<{ className?: string }>;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  productName: string;
  quantity?: number;
  message?: string;
}

export interface FormField {
  required: boolean;
  type?: 'text' | 'email' | 'tel' | 'number' | 'textarea';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PageProps {
  params: Record<string, string>;
  searchParams: Record<string, string | string[] | undefined>;
}

export interface LayoutProps {
  children: React.ReactNode;
  params?: Record<string, string>;
}

// SEO and Metadata Types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export interface StructuredDataProps {
  type: 'Product' | 'Organization' | 'LocalBusiness' | 'Service' | 'BreadcrumbList';
  data: any;
}

// API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Loading and Error States
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data: T | null;
}

// Image Types
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export interface ImageSize {
  width: number;
  height: number;
}

// Service Types
export interface ServiceInfo {
  name: string;
  description: string;
  features: string[];
  benefits: string[];
  icon?: React.ComponentType<{ className?: string }>;
  image?: string;
}

// Product Filter Types
export interface ProductFilter {
  category?: string;
  type?: 'manufacture' | 'resell';
  priceRange?: {
    min: number;
    max: number;
  };
  search?: string;
  sortBy?: 'name' | 'price' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

// Search Types
export interface SearchResult {
  type: 'product' | 'category' | 'service';
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  hasSearched: boolean;
}

// Modal Types
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

// Toast/Notification Types
export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Theme Types
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  fonts: {
    sans: string;
    serif: string;
    mono: string;
  };
  spacing: Record<string, string>;
  breakpoints: Record<string, string>;
}

// Analytics Types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

export interface PageViewEvent {
  page_title: string;
  page_location: string;
  page_path: string;
}

// Performance Types
export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

// Cache Types
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export interface CacheOptions {
  ttl?: number;
  key?: string;
  tags?: string[];
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Event Handler Types
export type EventHandler<T = Event> = (event: T) => void;
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

// Component State Types
export interface ComponentState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Route Types
export interface RouteParams {
  category?: string;
  slug?: string;
  id?: string;
}

export interface StaticParams {
  category: string;
  slug?: string;
}

// Sitemap Types
export interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Contact Information Types
export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp?: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    full: string;
  };
  hours: {
    weekdays: string;
    weekend: string;
    display: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Social Media Types
export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
  whatsapp?: string;
}

// Configuration Types
export interface AppConfig {
  site: {
    name: string;
    description: string;
    url: string;
    ogImage: string;
  };
  api: {
    baseURL: string;
    timeout: number;
    retryAttempts: number;
  };
  features: {
    analytics: boolean;
    search: boolean;
    newsletter: boolean;
    chat: boolean;
  };
}

// Error Types
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  context?: Record<string, any>;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// Generic utility types for better type safety
export type NonEmptyArray<T> = [T, ...T[]];
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// Component ref types
export type ComponentRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>['ref'];

// Event types for better type safety
export type FormEvent = React.FormEvent<HTMLFormElement>;
export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type TextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;
export type SelectEvent = React.ChangeEvent<HTMLSelectElement>;
export type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
export type LinkEvent = React.MouseEvent<HTMLAnchorElement>;