import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Tooltip from "../../shared/components/partial/Tooltip";

const TopCategories = () => {
  const categories: { icon: IconProp; title: string }[] = [
    { icon: "shirt", title: "Fashion" },
    { icon: "mobile", title: "Electronics" },
    { icon: "car", title: "Vehicles" },
    { icon: "clock", title: "Watches" },
    { icon: "gem", title: "Collectibles" },
    { icon: "couch", title: "Home & Garden" },
    { icon: "palette", title: "Art" },
    { icon: "futbol", title: "Sports" },
    { icon: "guitar", title: "Music" },
    { icon: "gamepad", title: "Gaming" },
  ];
  return (
    <div className="top-categories">
      <div className="wrapper flexbox">
        <div className="content-left">
          <h2 className="font-12 bold">Top categories</h2>
          <hr className="line" />
          <p className="font-6">Here you can find everything you need</p>
        </div>
        <div className="content-right">
          {categories.map((x, ind) => (
            <div className={"icons i" + ind} key={ind}>
              <Tooltip
                title={x.title}
                bottomSpacing="40px"
                leftSpacing="-100px"
              >
                <FontAwesomeIcon icon={x.icon} />
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
