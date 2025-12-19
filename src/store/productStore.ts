import { create } from 'zustand';
import axios from 'axios';

/* -------------------- Types -------------------- */

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  category: string;
}

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;

  // Pagination
  total: number;
  limit: number;
  skip: number;

  // Category
  categories: Category[];
  selectedCategory: string;

  // Actions
  fetchProducts: (limit?: number, skip?: number) => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
}

/* -------------------- Store -------------------- */

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  product: null,
  loading: false,

  total: 0,
  limit: 10,
  skip: 0,

  categories: [],
  selectedCategory: 'all',

  /* ---------- Fetch products (pagination) ---------- */
  fetchProducts: async (limit = get().limit, skip = get().skip) => {
    set({ loading: true, selectedCategory: 'all' });

    try {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );

      set({
        products: res.data.products,
        total: res.data.total,
        limit,
        skip,
      });
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      set({ loading: false });
    }
  },

  /* ---------- Fetch single product ---------- */
  fetchProductById: async (id: string) => {
    set({ loading: true, product: null });

    try {
      const res = await axios.get(
        `https://dummyjson.com/products/${id}`
      );
      set({ product: res.data });
    } catch (error) {
      console.error('Failed to fetch product by ID', error);
    } finally {
      set({ loading: false });
    }
  },

  /* ---------- Search products ---------- */
  searchProducts: async (query: string) => {
    if (!query.trim()) {
      get().fetchProducts(get().limit, 0);
      return;
    }

    set({ loading: true, skip: 0, selectedCategory: 'all' });

    try {
      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${query}`
      );

      set({
        products: res.data.products,
        total: res.data.total,
      });
    } catch (error) {
      console.error('Failed to search products', error);
    } finally {
      set({ loading: false });
    }
  },

  /* ---------- Fetch categories ---------- */
  fetchCategories: async () => {
    try {
      const res = await axios.get(
        'https://dummyjson.com/products/categories'
      );
      set({ categories: res.data });
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  },

  /* ---------- Filter by category ---------- */
  filterByCategory: async (categorySlug: string) => {
    if (categorySlug === 'all') {
      get().fetchProducts(get().limit, 0);
      return;
    }

    set({ loading: true, selectedCategory: categorySlug, skip: 0 });

    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${categorySlug}`
      );

      set({
        products: res.data.products,
        total: res.data.total,
      });
    } catch (error) {
      console.error('Failed to filter by category', error);
    } finally {
      set({ loading: false });
    }
  },
}));
