import type { User } from "../../types/User";
import { formatDate } from "../../shared/utils/dateHelper";

type AuctionSellerInfoProp = {
  seller: User;
};

const AuctionSellerInfo = ({ seller }: AuctionSellerInfoProp) => {
  return (
    <div className="seller-info back-secondary flexcol rounded shadow-dark font-dark">
      <h3 className="font-7 bold">Seller's info</h3>
      <div className="mt-3 w-100 px-2">
        <p className="flexbox">
          Name:{" "}
          <span className="font-light bold font-4 ml-2">{seller.fullName}</span>
        </p>
        <p className="flexbox">
          Email:{" "}
          <span className="font-light bold font-4 ml-2">
            {`${seller.email}`}
          </span>
        </p>
        <p className="flexbox">
          Phone:{" "}
          <span className="font-light bold font-4 ml-2">
            {`${seller.phoneNumber}`}
          </span>
        </p>
        <hr className="line back-dark" />
        <p className="flexbox">
          Street:{" "}
          <span className="font-light bold font-4 ml-2">
            {`${seller.street} ${seller.streetNumber}`}
          </span>
        </p>
        <p className="flexbox">
          City:{" "}
          <span className="font-light bold font-4 ml-2">
            {`${seller.placeName}`}
          </span>
        </p>
        <hr className="line back-dark" />
        <p className="flexbox">
          Member from:{" "}
          <span className="font-light bold font-4 ml-2">
            {`${formatDate(seller.memberFrom, "short")}`}
          </span>
        </p>
        <p className="flexbox">
          Number of positive reviews:{" "}
          <span className="font-light bold font-4 ml-2">
            {`${seller.positiveReviewsCount}`}
          </span>
        </p>
        <p className="flexbox">
          Number of negative reviews:{" "}
          <span className="font-light bold font-4 ml-2">
            {`${seller.negativeReviewsCount}`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuctionSellerInfo;
