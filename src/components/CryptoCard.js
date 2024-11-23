import React from "react";
import { useRecoilState } from "recoil";
import { favoritesState } from "../recoil/atoms";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const CryptoCard = ({ crypto, currency }) => {
  const [favorites, setFavorites] = useRecoilState(favoritesState);

  /* Toggles the favorite status of a cryptocurrency by adding or removing 
    its ID from the favorites list and updating the local storage accordingly. */
  const toggleFavorite = () => {
    const updatedFavorites = favorites.includes(crypto.id)
      ? favorites.filter((id) => id !== crypto.id)
      : [...favorites, crypto.id];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const currencySymbol = {
    usd: "$",
    eur: "€",
    gbp: "£",
  }[currency];

  const isFavorite = favorites.includes(crypto.id);

  return (
    <Card className="overflow-hidden">
      {/* Card Header */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={crypto.image} alt={`${crypto.name} logo`} />
            <AvatarFallback>
              {crypto.symbol.toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-sm font-medium">
            {crypto.name} ({crypto.symbol.toUpperCase()})
          </CardTitle>
        </div>

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFavorite}
          className={isFavorite ? "text-red-500" : "text-gray-400"}
        >
          <Heart
            className="h-4 w-4"
            fill={isFavorite ? "currentColor" : "none"}
          />
        </Button>
        {/* Favorite button - End */}
      </CardHeader>
      {/* Card Header - End */}

      {/* Card Content */}
      <CardContent>
        <div className="text-2xl font-bold">
          {currencySymbol}
          {crypto.current_price.toLocaleString()}
        </div>
        <p
          className={`text-sm ${
            crypto.price_change_percentage_24h > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {crypto.price_change_percentage_24h > 0 ? "▲" : "▼"}{" "}
          {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
        </p>
      </CardContent>
      {/* Card Content - End */}

      {/* Card Footer */}
      <CardFooter>
        <Link to={`/details/${crypto.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
      {/* Card Footer - End */}
    </Card>
  );
};

export default CryptoCard;
