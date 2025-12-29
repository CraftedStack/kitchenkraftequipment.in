/**
 * Property Tests for API Integration
 * Validates API response handling and SEO enhancement
 */

import { KitchenKraftAPI, APIError, Genre, Product } from '../api';

// Mock fetch for testing
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('KitchenKraftAPI Property Tests', () => {
  let api: KitchenKraftAPI;

  beforeEach(() => {
    api = new KitchenKraftAPI();
    api.clearCache();
    mockFetch.mockClear();
  });

  describe('Property: API response handling', () => {
    test('should handle valid genres API response', async () => {
      const mockGenres: Genre[] = [
        {
          id: 1,
          name: 'Cooking Equipment',
          description: 'Professional cooking equipment',
          image: '/imgs/cooking.jpg',
          type: 'manufacture'
        },
        {
          id: 2,
          name: 'Refrigeration',
          description: 'Commercial refrigeration units',
          image: '/imgs/fridge.jpg',
          type: 'resell'
        }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGenres,
      } as Response);

      const result = await api.getGenres();

      // Property: All genres should be enhanced with SEO properties
      expect(result).toHaveLength(2);
      result.forEach(genre => {
        expect(genre).toHaveProperty('slug');
        expect(genre).toHaveProperty('seoTitle');
        expect(genre).toHaveProperty('seoDescription');
        expect(genre).toHaveProperty('keywords');
        expect(Array.isArray(genre.keywords)).toBe(true);
        expect(genre.slug).toMatch(/^[a-z0-9-]+$/); // Valid slug format
      });

      // Property: SEO titles should include brand name
      result.forEach(genre => {
        expect(genre.seoTitle).toContain('Kitchen Kraft');
      });

      // Property: Keywords should include relevant terms
      result.forEach(genre => {
        expect(genre.keywords).toContain(genre.name.toLowerCase());
        expect(genre.keywords).toContain('commercial kitchen equipment');
        expect(genre.keywords).toContain('pune');
      });
    });

    test('should handle valid products API response', async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Commercial Gas Stove',
          description: 'Heavy duty gas stove for commercial use',
          image: '/imgs/gas-stove.jpg',
          price: '25000',
          genre_id: 1,
          genre_name: 'Cooking Equipment'
        },
        {
          id: 2,
          name: 'Deep Fryer',
          description: 'Professional deep fryer',
          image: '/imgs/fryer.jpg',
          genre_id: 1,
          genre_name: 'Cooking Equipment'
        }
      ];

      // Mock the genres call first (required by getProductsByGenre)
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [{
          id: 1,
          name: 'Cooking Equipment',
          description: 'Professional cooking equipment',
          image: '/imgs/cooking.jpg',
          type: 'manufacture'
        }],
      } as Response);

      // Then mock the products call
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      } as Response);

      const result = await api.getProductsByGenre(1);

      // Property: All products should be enhanced with SEO properties
      expect(result).toHaveLength(2);
      result.forEach(product => {
        expect(product).toHaveProperty('slug');
        expect(product).toHaveProperty('categorySlug');
        expect(product).toHaveProperty('seoTitle');
        expect(product).toHaveProperty('seoDescription');
        expect(product).toHaveProperty('keywords');
        expect(Array.isArray(product.keywords)).toBe(true);
        expect(product.slug).toMatch(/^[a-z0-9-]+$/); // Valid slug format
      });

      // Property: SEO descriptions should be within limit
      result.forEach(product => {
        expect(product.seoDescription.length).toBeLessThanOrEqual(160);
      });

      // Property: Products with prices should have price-related keywords
      const productWithPrice = result.find(p => p.price);
      if (productWithPrice) {
        expect(productWithPrice.keywords).toContain('price');
      }
    });

    test('should handle API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      // Property: API errors should be properly typed and informative
      await expect(api.getGenres()).rejects.toThrow(APIError);
      
      try {
        await api.getGenres();
      } catch (error) {
        expect(error).toBeInstanceOf(APIError);
        expect((error as APIError).status).toBe(404);
        expect((error as APIError).endpoint).toBe('/api/genres');
      }
    });

    test('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      // Property: Network errors should be wrapped in APIError
      await expect(api.getGenres()).rejects.toThrow(APIError);
      
      try {
        await api.getGenres();
      } catch (error) {
        expect(error).toBeInstanceOf(APIError);
        expect((error as APIError).message).toContain('Network error');
      }
    });

    test('should handle invalid response format', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ invalid: 'format' }),
      } as Response);

      // Property: Invalid response formats should throw APIError
      await expect(api.getGenres()).rejects.toThrow(APIError);
    });
  });

  describe('Property: Caching behavior', () => {
    test('should cache API responses', async () => {
      const mockGenres: Genre[] = [
        {
          id: 1,
          name: 'Test Genre',
          description: 'Test description',
          image: '/test.jpg',
          type: 'manufacture'
        }
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGenres,
      } as Response);

      // First call
      await api.getGenres();
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Second call should use cache
      await api.getGenres();
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Property: Cache should contain the expected key
      const cacheStats = api.getCacheStats();
      expect(cacheStats.keys).toContain('genres');
    });

    test('should respect cache TTL', async () => {
      const mockGenres: Genre[] = [
        {
          id: 1,
          name: 'Test Genre',
          description: 'Test description',
          image: '/test.jpg',
          type: 'manufacture'
        }
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockGenres,
      } as Response);

      // Mock Date.now to simulate time passing
      const originalDateNow = Date.now;
      let currentTime = 1000000;
      Date.now = jest.fn(() => currentTime);

      try {
        // First call
        await api.getGenres();
        expect(mockFetch).toHaveBeenCalledTimes(1);

        // Simulate time passing beyond TTL (5 minutes = 300000ms)
        currentTime += 400000;

        // Second call should fetch again due to expired cache
        await api.getGenres();
        expect(mockFetch).toHaveBeenCalledTimes(2);
      } finally {
        Date.now = originalDateNow;
      }
    });
  });

  describe('Property: Slug generation', () => {
    test('should generate valid slugs from names', async () => {
      const testCases = [
        'Commercial Gas Stove',
        'Deep Fryer & Grill',
        'Stainless Steel Table (Heavy Duty)',
        'Pizza Oven - Wood Fired',
        'Refrigerator 4-Door'
      ];

      const mockGenres: Genre[] = testCases.map((name, index) => ({
        id: index + 1,
        name,
        description: `Description for ${name}`,
        image: `/imgs/${index}.jpg`,
        type: 'manufacture'
      }));

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGenres,
      } as Response);

      const result = await api.getGenres();

      // Property: All slugs should be URL-safe
      result.forEach(genre => {
        expect(genre.slug).toMatch(/^[a-z0-9-]+$/);
        expect(genre.slug).not.toContain(' ');
        expect(genre.slug).not.toMatch(/^-|-$/); // No leading/trailing hyphens
        expect(genre.slug).not.toMatch(/--/); // No double hyphens
      });

      // Property: Slugs should be derived from names
      const expectedSlugs = [
        'commercial-gas-stove',
        'deep-fryer-grill',
        'stainless-steel-table-heavy-duty',
        'pizza-oven-wood-fired',
        'refrigerator-4-door'
      ];

      result.forEach((genre, index) => {
        expect(genre.slug).toBe(expectedSlugs[index]);
      });
    });
  });

  describe('Property: Type filtering', () => {
    test('should filter genres by type correctly', async () => {
      const mockGenres: Genre[] = [
        {
          id: 1,
          name: 'Manufactured Item 1',
          description: 'Description 1',
          image: '/img1.jpg',
          type: 'manufacture'
        },
        {
          id: 2,
          name: 'Resell Item 1',
          description: 'Description 2',
          image: '/img2.jpg',
          type: 'resell'
        },
        {
          id: 3,
          name: 'Manufactured Item 2',
          description: 'Description 3',
          image: '/img3.jpg',
          type: 'manufacture'
        }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockGenres,
      } as Response);

      const manufactureGenres = await api.getGenresByType('manufacture');
      const resellGenres = await api.getGenresByType('resell');

      // Property: Filtering should return only items of specified type
      expect(manufactureGenres).toHaveLength(2);
      expect(resellGenres).toHaveLength(1);

      manufactureGenres.forEach(genre => {
        expect(genre.type).toBe('manufacture');
      });

      resellGenres.forEach(genre => {
        expect(genre.type).toBe('resell');
      });
    });
  });
});

// Jest configuration would be in jest.config.js
export {};