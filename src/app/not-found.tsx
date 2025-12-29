/**
 * 404 Not Found Page
 * Displays when a page is not found
 */

import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Kitchen Kraft Equipments',
  description: 'The page you are looking for could not be found. Browse our commercial kitchen equipment and services.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href="/products"
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              href="/services"
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
}