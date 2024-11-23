import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ChartContainer } from "../components/ui/chart";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  DollarSignIcon,
  CoinsIcon,
} from "lucide-react";
import { Separator } from "../components/ui/separator";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [coinInfo, setCoinInfo] = useState(null);
  const [currency, setCurrency] = useState("usd");
  const [timeRange, setTimeRange] = useState(30);

  /* Responsible for fetching data related to a specific cryptocurrency 
     based on the `id`, `currency`, and `timeRange` values. */
  useEffect(() => {
    const fetchDetails = async () => {
      const [chartResponse, infoResponse] = await Promise.all([
        fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${timeRange}`
        ),
        fetch(
          `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        ),
      ]);
      const chartData = await chartResponse.json();
      const infoData = await infoResponse.json();
      setData(chartData);
      setCoinInfo(infoData);
    };
    fetchDetails();
  }, [id, currency, timeRange]);

  /* Loader */
  if (!data || !coinInfo)
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

  /* Chart Configuration */
  const chartData = {
    labels: data.prices.map((price) => new Date(price[0]).toLocaleDateString()),
    datasets: [
      {
        label: `Price (${currency.toUpperCase()})`,
        data: data.prices.map((price) => price[1]),
        borderColor:
          coinInfo.market_data.price_change_percentage_24h >= 0
            ? "#22c55e"
            : "#ef4444", // Explicit green/red colors
        backgroundColor:
          coinInfo.market_data.price_change_percentage_24h >= 0
            ? "rgba(34, 197, 94, 0.1)"
            : "rgba(239, 68, 68, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) =>
            `${currency.toUpperCase()} ${context.parsed.y.toLocaleString()}`,
        },
        backgroundColor: "#1f2937",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 5,
          color: "#9ca3af", // Explicit gray color for axis labels
        },
      },
      y: {
        grid: {
          color: "rgba(156, 163, 175, 0.2)", // Explicit gray color for grid lines
        },
        ticks: {
          callback: (value) =>
            `${currency.toUpperCase()} ${value.toLocaleString()}`,
          color: "#9ca3af", // Explicit gray color for axis labels
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  /* This function formats a numerical value as a currency in US dollars with two decimal places. */
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Crypto-Details Card */}
        <Card className="overflow-hidden">
          {/* Render the header section for the card component  */}
          <CardHeader className="bg-muted">
            <div className="flex items-center space-x-4">
              <img
                src={coinInfo.image.small}
                alt={coinInfo.name}
                className="w-12 h-12"
              />
              <div>
                <CardTitle className="text-3xl">
                  {coinInfo.name} ({coinInfo.symbol.toUpperCase()})
                </CardTitle>
                <CardDescription>
                  Rank #{coinInfo.market_cap_rank}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          {/* Card Header - End  */}

          <CardContent className="p-6">
            {/* Information about the CryptoCurrency */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-baseline justify-between">
                  <p className="text-3xl font-bold">
                    {formatCurrency(
                      coinInfo.market_data.current_price[currency]
                    )}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      coinInfo.market_data.price_change_percentage_24h > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coinInfo.market_data.price_change_percentage_24h > 0 ? (
                      <ArrowUpIcon className="inline mr-1" />
                    ) : (
                      <ArrowDownIcon className="inline mr-1" />
                    )}
                    {formatPercentage(
                      coinInfo.market_data.price_change_percentage_24h
                    )}{" "}
                    (24h)
                  </p>
                </div>
                {/* Information about the CryptoCurrency - End */}

                <Separator />

                {/*  Displaying information related to the cryptocurrency, such as Market Cap, 24h Volume, Circulating Supply, and
                All-Time High. */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="text-lg font-semibold flex items-center">
                      <DollarSignIcon className="mr-2 h-4 w-4" />
                      {formatCurrency(
                        coinInfo.market_data.market_cap[currency]
                      )}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">24h Volume</p>
                    <p className="text-lg font-semibold flex items-center">
                      <TrendingUpIcon className="mr-2 h-4 w-4" />
                      {formatCurrency(
                        coinInfo.market_data.total_volume[currency]
                      )}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Circulating Supply
                    </p>
                    <p className="text-lg font-semibold flex items-center">
                      <CoinsIcon className="mr-2 h-4 w-4" />
                      {coinInfo.market_data.circulating_supply.toLocaleString()}{" "}
                      {coinInfo.symbol.toUpperCase()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      All-Time High
                    </p>
                    <p className="text-lg font-semibold flex items-center">
                      <TrendingUpIcon className="mr-2 h-4 w-4" />
                      {formatCurrency(coinInfo.market_data.ath[currency])}
                    </p>
                  </div>
                </div>
                {/* Crypto Info - End */}

                <Separator />

                {/* Filter for Currency and the Time-period */}
                <div className="flex space-x-4">
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="gbp">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={timeRange.toString()}
                    onValueChange={(value) => setTimeRange(Number(value))}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Filters - End */}
              </div>

              {/* Render Chart */}
              <div className="h-[400px] bg-background">
                <ChartContainer>
                  <Line data={chartData} options={options} />
                </ChartContainer>
              </div>
              {/* Render Chart - End */}
            </div>
            {/* Information about the CryptoCurrency - End */}
          </CardContent>
        </Card>
        {/* Crypto-Details Card -End */}
      </div>
    </div>
  );
};

export default DetailsPage;
