import React from "react";
import seller1 from "../../assets/images/sellers/seller1.jpg";
import seller2 from "../../assets/images/sellers/seller2.jpg";
import seller3 from "../../assets/images/sellers/seller3.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Seller = { name: string; image: string; comment: string };

const TopSellers = () => {
  const sellers: Seller[] = [
    {
      image: seller1,
      name: "James Anderson",
      comment:
        "The real-time bidding is incredibly smooth. I never miss a win!",
    },
    {
      image: seller2,
      name: "Sophia Martinez",
      comment:
        "Best auction platform I've used. The interface is clean and intuitive.",
    },
    {
      image: seller3,
      name: "Daniel Thompson",
      comment:
        "Secure payments and verified sellers make this my go-to bidding app.",
    },
  ];
  return (
    <div className="top-sellers shadow-dark">
      <h2 className="font-12 bold">Top sellers experience</h2>
      <hr className="line" />
      <div className="wrapper">
        {sellers.map((seller) => (
          <div className="col rounded shadow-dark" key={seller.name}>
            <img src={seller.image} alt={seller.name} />
            <h3 className="bold font-7 mt-10 mb-5">
              {"<<"} {<span className="mx-2">{seller.name}</span>} {">>"}
            </h3>
            <div className="flexbox mb-5">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon="star" />
              ))}
            </div>
            <p className="font-4">{seller.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellers;
