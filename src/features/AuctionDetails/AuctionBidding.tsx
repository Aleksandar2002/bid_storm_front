/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import TextField from "../../shared/components/form/TextField";
import { useToast } from "../../app/stores/toastMessageStore";
import Button from "../../shared/components/global/Button";
import SmallButton from "../../shared/components/global/SmallButton";
import type { Auction } from "../../types/Auction";
import Timer from "../../shared/components/partial/Timer";
import { formatDate } from "../../shared/utils/dateHelper";
import { placeBid } from "../../app/services/auctionsService";
import { useHubs } from "../../shared/hubs/useHubs";

type AuctionFormType = {
  bidValue: number;
};

type AuctionBiddingProps = {
  auction: Auction;
  onPriceChange: (x: number) => void;
  isExpiredProp: boolean;
};

const AuctionBidding = ({
  auction,
  onPriceChange,
  isExpiredProp,
}: AuctionBiddingProps) => {
  const [currentPrice, setCurrentPrice] = useState<number>(
    auction.currentPrice,
  );
  const [biddingValue, setBiddingValue] = useState<string>(
    String(auction.currentPrice + auction.minimumStep),
  );
  const [bidError, setBidError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setErrorToast, setSuccessToast } = useToast();
  const [expired, setExpired] = useState<boolean>(false);
  const btnValues = [1, 1.1, 1.2, 1.5, 2, 3];

  const buildSmallBtnsArray = () => {
    const arr: number[] = [];
    btnValues.forEach((val, ind) => {
      arr[ind] = auction.minimumStep * val;
    });
    return arr;
  };
  const smallBtnsValues = buildSmallBtnsArray();

  const { auctionsHub } = useHubs();

  useEffect(() => {
    const handlePriceChanged = (data: any) => {
      console.log("NEW PRICE:", data);
      setCurrentPrice(data.newPrice);
      onPriceChange(data.newPrice);
    };

    const startConnection = async () => {
      try {
        console.log("Connected to auction hub");
        await auctionsHub?.invoke("JoinAuction", auction.id);
        auctionsHub?.on("AuctionPriceChanged", handlePriceChanged);
      } catch (err) {
        console.error("SignalR connection failed:", err);
      }
    };
    startConnection();

    return () => {
      if (auctionsHub) auctionsHub?.off("AuctionPriceChanged");
    };
  }, [auction.id, auctionsHub, onPriceChange]);

  useEffect(() => {
    const reset = () => {
      setCurrentPrice(auction.currentPrice);
    };
    reset();
  }, [auction.id, auction.currentPrice]);

  useEffect(() => {
    const initBidValue = () => {
      setBiddingValue(String(currentPrice + auction.minimumStep));
    };
    initBidValue();
  }, [currentPrice, auction.minimumStep]);

  const handleBidInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setBiddingValue("");
      return;
    }
    setBiddingValue(String(e.target.value));
  };

  const handleBidSubmit = async () => {
    setBidError(null);
    setLoading(true);
    if (isNaN(Number(biddingValue)) || Number(biddingValue) <= 0) {
      setBidError("Bidding value must be a number and bigger then 0");
      return;
    }

    if (Number(biddingValue) < currentPrice + auction.minimumStep) {
      setBidError(
        `Bidding value must be a greater then minimum step (${auction.minimumStep})`,
      );
      return;
    }
    try {
      await placeBid({
        auctionId: auction.id,
        bid: Number(biddingValue),
      });
      setSuccessToast("Bid placed successfully");
    } catch (err: any) {
      if (err && err.response && err.response.status == 422) {
        console.log(err.response);
        if (err.response?.data?.[0]?.error) {
          setBidError(err.response.data?.[0].error);
        } else {
          setBidError(err.response?.data?.message);
        }
      } else {
        setErrorToast("Some error happened while placing a bid");
      }
    }
    setLoading(false);
  };
  const handleQuickActionsClick = (val: number) => {
    const newValue = currentPrice + val;
    setBiddingValue(newValue.toFixed(2));
  };
  const handleExpired = () => {
    setExpired(true);
  };

  return (
    <div className="auction-bidding back-secondary rounded shadow-dark font-dark">
      {!isExpiredProp && (
        <Timer endDate={new Date(auction.endsAt)} onExpiring={handleExpired} />
      )}
      <p className="flexbox font-3 bold">
        Starting price:
        <span className="font-light bold font-4 ml-2">
          ${auction.startingPrice}
        </span>
      </p>
      <p className="flexbox font-3 bold">
        Current price:
        <span className="font-light bold font-4 ml-2">${currentPrice}</span>
      </p>
      <p className="flexbox font-3 bold">
        Ends at:
        <span className="font-light bold font-4 ml-2">
          {formatDate(auction.endsAt, "long")}
        </span>
      </p>
      <p className="flexbox font-3 bold ">
        Number of bids:
        <span className="font-light bold font-4 ml-2">
          {auction.auctionBidsCount}
        </span>
      </p>
      <p className="flexbox font-3 bold mb-4">
        Minimum step:
        <span className="font-light bold font-4 ml-2">
          {auction.minimumStep}
        </span>
      </p>
      {!expired && !isExpiredProp ? (
        <>
          <hr className="line back-dark" />
          <h3 className="font-4 mb-3 mt-4">Want to make a bid?</h3>
          <div className="flexcol">
            <div className="flexbox w-full ">
              <div className="w-75">
                <TextField<AuctionFormType>
                  key={String("bidValue")}
                  label={"Bid value"}
                  name={"bidValue"}
                  onChange={handleBidInputChange}
                  value={String(biddingValue)}
                />
              </div>
              <Button
                text="Place a bid"
                disabled={loading}
                handleClickFunction={handleBidSubmit}
                btnClass="ml-4"
              />
            </div>
            {bidError && <div className="error-message">{bidError}</div>}
          </div>
          <h4 className="font-3 bold mt-3">Quick bids:</h4>
          <div className="flexbox justify-center ">
            {smallBtnsValues.map((val) => {
              return (
                <SmallButton
                  key={val}
                  text={"$" + val}
                  onClick={() => handleQuickActionsClick(val)}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center back-light rounded p-2 shadow-dark">
          Auction has already expired
        </div>
      )}
    </div>
  );
};

export default AuctionBidding;
