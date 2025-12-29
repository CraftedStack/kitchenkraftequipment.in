'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export default function ApiDebug() {
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      setLoading(true);
      setError(null);
      const genresData = await api.getGenres();
      console.log('Loaded genres:', genresData);
      setGenres(genresData);
    } catch (err) {
      console.error('Error loading genres:', err);
      setError(err instanceof Error ? err.message : 'Failed to load genres');
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async (genreId: number) => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await api.getProductsByGenre(genreId);
      console.log('Loaded products for genre', genreId, ':', productsData);
      setProducts(productsData);
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleGenreSelect = (genre: any) => {
    setSelectedGenre(genre);
    loadProducts(genre.id);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">API Debug Tool</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          Loading...
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Genres Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Genres ({genres.length})</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreSelect(genre)}
                className={`w-full text-left p-3 rounded border transition-colors ${
                  selectedGenre?.id === genre.id
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{genre.name}</div>
                <div className="text-sm text-gray-600">
                  ID: {genre.id} | Type: {genre.type} | Slug: {genre.slug}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Products {selectedGenre ? `for "${selectedGenre.name}"` : ''} ({products.length})
          </h3>
          {selectedGenre ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 bg-gray-50 border border-gray-200 rounded"
                  >
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-600">
                      ID: {product.id} | Price: {product.price || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600">
                      Slug: {product.slug} | Category Slug: {product.categorySlug}
                    </div>
                    {product.image && (
                      <div className="text-sm text-green-600">
                        ✓ Has image: {product.image.substring(0, 50)}...
                      </div>
                    )}
                    {product.description && (
                      <div className="text-sm text-gray-500 mt-1">
                        {product.description.substring(0, 100)}...
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">
                  No products found for this genre
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500 italic">
              Select a genre to view its products
            </div>
          )}
        </div>
      </div>

      {/* Raw Data Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Raw Data</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Selected Genre:</h4>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-32">
              {selectedGenre ? JSON.stringify(selectedGenre, null, 2) : 'None selected'}
            </pre>
          </div>
          <div>
            <h4 className="font-medium mb-2">Products Data:</h4>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-32">
              {JSON.stringify(products, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* Test URLs */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Test URLs</h3>
        <div className="space-y-2">
          <div>
            <strong>API Base URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}
          </div>
          {selectedGenre && (
            <>
              <div>
                <strong>Genre URL:</strong> /products/{selectedGenre.slug}
              </div>
              <div>
                <strong>API Endpoint:</strong> /api/products/genre/{selectedGenre.id}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}