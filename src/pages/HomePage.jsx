import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Search } from "lucide-react";
import { cryptoListState } from "../recoil/atoms";
import CryptoCard from "../components/CryptoCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const ITEMS_PER_PAGE = 10;

export default function HomePage() {
  const [cryptos, setCryptos] = useRecoilState(cryptoListState);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [currency, setCurrency] = useState("usd");

  /* Fetching cryptocurrency data when the component mounts or when the `sortBy` or `currency` state values change. */
  useEffect(() => {
    const fetchCryptos = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortBy}&per_page=100&page=1&sparkline=false`
      );
      const data = await response.json();
      setCryptos(data);
      setLoading(false);
    };
    fetchCryptos();
  }, [setCryptos, sortBy, currency]);

  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* Pagination - Config */
  const paginatedCryptos = filteredCryptos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const pageCount = Math.ceil(filteredCryptos.length / ITEMS_PER_PAGE);

  /* Loader */
  if (loading)
    return (
      <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div
          class="loader border-r-4 rounded-full border-yellow-500 bg-yellow-300 animate-bounce
    aspect-square w-16 flex justify-center items-center text-yellow-700 text-2xl"
        >
          $
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Hi, Rahul Kumar</h1>

          <div className="flex items-center space-x-4">
            {/* Currency Converter */}
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="gbp">GBP</SelectItem>
              </SelectContent>
            </Select>
            {/* Currency Converter - End */}

            {/* CryptoCurrency Sorter */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market_cap_desc">
                  Market Cap (High to Low)
                </SelectItem>
                <SelectItem value="market_cap_asc">
                  Market Cap (Low to High)
                </SelectItem>
                <SelectItem value="price_desc">Price (High to Low)</SelectItem>
                <SelectItem value="price_asc">Price (Low to High)</SelectItem>
              </SelectContent>
            </Select>
            {/* CryptoCurrency Sorter - End */}
          </div>
        </div>
        {/* Header - End */}

        {/* Search bar */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            type="text"
            placeholder="Search Crypto Currencies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        {/* Search bar - End */}

        {/* Card Grid - CryptoCurrencies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCryptos.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} currency={currency} />
          ))}
        </div>
        {/* Card Grid - End */}

        {/* Pagination */}
        <div className="mt-8 flex justify-center space-x-2">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
          >
            Previous
          </Button>
          <span className="flex items-center">
            Page {currentPage} of {pageCount}
          </span>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageCount}
            variant="outline"
          >
            Next
          </Button>
        </div>
        {/* Pagination - End */}
      </div>
    </div>
  );
}
