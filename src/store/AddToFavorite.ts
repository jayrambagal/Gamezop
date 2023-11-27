import { create } from "zustand";

interface FavoriteState {
  FavItems: any;
  addFav: (item: any) => void;
  removeFav: (id: string) => void;
}

const useFavorite = create<FavoriteState>((set) => ({
  FavItems: [],
  addFav: (newItem) =>
    set((state) => ({ FavItems: [...state.FavItems, newItem] })),
  removeFav: (id) => {
    set((state) => ({
      FavItems: state.FavItems.filter((item: any) => item.id !== id),
    }));
  },
}));

export default useFavorite;
