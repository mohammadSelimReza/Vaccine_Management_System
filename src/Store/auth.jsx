import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  allUserData: null,
  loading: false,

  user: () => ({
    username: get().allUserData?.username || null,
    user:get().allUserData || null,
    id: get().allUserData?.id || null,
    first_name: get().allUserData?.first_name ?? null,
    last_name: get().allUserData?.last_name ?? null,
    email: get().allUserData?.email ?? null,
  }),

  setUser: (user) =>
    set({
      allUserData: user,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  isLoggedIn: () => get().allUserData !== null,
}));

if (import.meta.env.DEV) {
  mountStoreDevtool("Store", useAuthStore);
}

export { useAuthStore };