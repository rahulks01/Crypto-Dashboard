import React from "react";
import { useRecoilValue } from "recoil";
import { favoritesState, cryptoListState } from "../recoil/atoms";
import CryptoCard from "../components/CryptoCard";
import { Heart } from "lucide-react";

const Favorites = () => {
  /* Fetching favorites from the localStorage using Recoil */
  const favorites = useRecoilValue(favoritesState);
  const cryptos = useRecoilValue(cryptoListState);

  const favoriteCryptos = cryptos.filter((crypto) =>
    favorites.includes(crypto.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        Your Favorite Cryptocurrencies
        <Heart className="ml-2 h-8 w-8 text-red-500" />
      </h1>

      {/* Render the Favorite cryptos form the localStorage */}
      {favoriteCryptos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteCryptos.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <p className="text-xl text-gray-500">No favorites yet.</p>
          <p className="text-gray-400 mt-2">
            Start adding cryptocurrencies to your favorites to see them here!
          </p>
        </div>
      )}
      {/* Favorites container - End */}
    </div>
  );
};

export default Favorites;
