import { atom } from "recoil";

// Atom to hold the cryptocurrency list
export const cryptoListState = atom({
  key: "cryptoListState",
  default: [],
});

// Atom to hold the favorites
export const favoritesState = atom({
  key: "favoritesState",
  default: JSON.parse(localStorage.getItem("favorites")) || [],
});
