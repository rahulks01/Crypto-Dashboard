import React, { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Modal, ModalContent, ModalTrigger } from "../components/ui/modal";
import ExchangeDetails from "../components/ExchangeDetails";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const ITEMS_PER_PAGE = 9;

const ExchangesPage = () => {
  const [exchanges, setExchanges] = useState([]);
  const [filteredExchanges, setFilteredExchanges] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("volume_desc");
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  /* Fetching data from the endpoint when the component mounts for the first time */
  useEffect(() => {
    const fetchExchanges = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/exchanges"
      );
      const data = await response.json();
      setExchanges(data);
      setFilteredExchanges(data);
    };
    fetchExchanges();
  }, []);

  /* Responsible for filtering and sorting the list of exchanges based on the search query and the selected sorting option.*/
  useEffect(() => {
    let filtered = exchanges.filter((exchange) =>
      exchange.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "volume_desc":
          return b.trade_volume_24h_btc - a.trade_volume_24h_btc;
        case "volume_asc":
          return a.trade_volume_24h_btc - b.trade_volume_24h_btc;
        case "trust_desc":
          return b.trust_score - a.trust_score;
        case "trust_asc":
          return a.trust_score - b.trust_score;
        default:
          return 0;
      }
    });

    setFilteredExchanges(filtered);
    setCurrentPage(1);
  }, [searchQuery, exchanges, sortBy]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  /* Fetches detailed information about a specific cryptocurrency exchange using its ID 
     likely has properties such as `id`, `name`, `country`,`year_established`, and other relevant information about the exchange. */
  const handleExchangeClick = async (exchange) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/exchanges/${exchange.id}`
    );
    const detailedExchange = await response.json();
    setSelectedExchange(detailedExchange);
  };

  /* Handling pagination for the list of exchanges displayed on the page. */
  const pageCount = Math.ceil(filteredExchanges.length / ITEMS_PER_PAGE);
  const paginatedExchanges = filteredExchanges.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Crypto Exchanges</h1>

      {/* Render search input field and a select dropdown for sorting exchanges on the Cryptocurrency Exchanges page */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        {/* Search bar */}
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search exchanges"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 " />
        </div>
        {/* Search bar - End */}

        {/* Filter (Sorting) */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="volume_desc">Volume (High to Low)</SelectItem>
            <SelectItem value="volume_asc">Volume (Low to High)</SelectItem>
            <SelectItem value="trust_desc">
              Trust Score (High to Low)
            </SelectItem>
            <SelectItem value="trust_asc">Trust Score (Low to High)</SelectItem>
          </SelectContent>
        </Select>
        {/* Filter (Sorting) - End */}
      </div>
      {/* Search bar and Sort - End */}

      {/* Modals Grid - Exchanges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {console.log(paginatedExchanges)}
        {paginatedExchanges.map((exchange) => (
          <Card key={exchange.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={exchange.image}
                    alt={exchange.name}
                    className="w-8 h-8"
                  />
                  <h2 className="text-xl font-semibold">{exchange.name}</h2>
                </div>
                <Modal>
                  <ModalTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExchangeClick(exchange)}
                    >
                      Details
                    </Button>
                  </ModalTrigger>
                  <ModalContent className="sm:max-w-[425px]">
                    {selectedExchange && (
                      <ExchangeDetails exchange={selectedExchange} />
                    )}
                  </ModalContent>
                </Modal>
              </div>
              <p>
                <strong>Trading Volume (24h):</strong>{" "}
                {exchange.trade_volume_24h_btc.toFixed(2)} BTC
              </p>
              <p>
                <strong>Number of Coins:</strong> {100}
              </p>
              <p>
                <strong>Trust Score:</strong> {exchange.trust_score}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Modals Grid - End  */}

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredExchanges.length)} of{" "}
          {filteredExchanges.length} exchanges
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageCount))
            }
            disabled={currentPage === pageCount}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
      {/* Pagination - End */}
    </div>
  );
};

export default ExchangesPage;
