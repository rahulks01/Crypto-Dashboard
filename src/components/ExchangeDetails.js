import React from "react";
import {
  GlobeIcon,
  FacebookIcon,
  TwitterIcon,
  RedoDotIcon as RedditIcon,
} from "lucide-react";
import { ModalHeader, ModalTitle, ModalDescription } from "./ui/modal";

const ExchangeDetails = ({ exchange }) => {
  return (
    <>
      {/* Modal Content */}
      <ModalHeader>
        <ModalTitle className="flex items-center space-x-2">
          <img src={exchange.image} alt={exchange.name} className="w-8 h-8" />
          <span>{exchange.name}</span>
        </ModalTitle>
        <ModalDescription>
          Detailed information about {exchange.name}
        </ModalDescription>
      </ModalHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Exchange Info - Text - 1 */}
        <div>
          <p>
            <strong>Country:</strong> {exchange.country || "N/A"}
          </p>
          <p>
            <strong>Year Established:</strong>{" "}
            {exchange.year_established || "N/A"}
          </p>
          <p>
            <strong>Trust Score:</strong> {exchange.trust_score}
          </p>
          <p>
            <strong>Trust Score Rank:</strong> {exchange.trust_score_rank}
          </p>
        </div>
        {/* Exchange Info - Text - 1 - End */}

        {/* Exchange Info - Text - 2 */}
        <div>
          <p>
            <strong>24h Trade Volume:</strong>{" "}
            {exchange.trade_volume_24h_btc.toFixed(2)} BTC
          </p>
          <p>
            <strong>Number of Coins:</strong> {100}
          </p>
          <p>
            <strong>Has Trading Incentive:</strong>{" "}
            {exchange.has_trading_incentive ? "Yes" : "No"}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <strong>Links:</strong>
            {exchange.url && (
              <a
                href={exchange.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <GlobeIcon className="w-5 h-5" />
              </a>
            )}
            {exchange.facebook_url && (
              <a
                href={exchange.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            )}
            {exchange.twitter_handle && (
              <a
                href={`https://twitter.com/${exchange.twitter_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
            )}
            {exchange.reddit_url && (
              <a
                href={exchange.reddit_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <RedditIcon className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        {/* Exchange Info - Text - 2 - End */}
      </div>

      {/* Exchange - Description */}
      {exchange.description && (
        <div className="mt-4">
          <strong>Description:</strong>
          <p>{exchange.description}</p>
        </div>
      )}
      {/* Exchange - Description - End */}
    </>
    /* Modal Content - End */
  );
};

export default ExchangeDetails;
