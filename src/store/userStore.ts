import { create } from 'zustand';
import axios from 'axios';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
}

interface UserState {
  users: User[];
  loading: boolean;

  total: number;
  limit: number;
  skip: number;

  fetchUsers: (limit?: number, skip?: number) => Promise<void>;
  searchUsers: (query: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,

  total: 0,
  limit: 10,
  skip: 0,

  // Fetch users (pagination)
  fetchUsers: async (limit = get().limit, skip = get().skip) => {
    set({ loading: true });

    try {
      const res = await axios.get(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
      );

      set({
        users: res.data.users,
        total: res.data.total,
        limit,
        skip,
      });
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      set({ loading: false });
    }
  },

  // 🔍 Search users
  searchUsers: async (query: string) => {
    if (!query.trim()) return;

    set({ loading: true });

    try {
      const res = await axios.get(
        `https://dummyjson.com/users/search?q=${query}`
      );

      set({
        users: res.data.users,
        total: res.data.total,
        skip: 0,
      });
    } catch (error) {
      console.error('Failed to search users', error);
    } finally {
      set({ loading: false });
    }
  },
}));
