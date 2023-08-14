import React from "react";
import Pin from "./Pin";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const MasonaryLayout = ({ pins }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 , 2000:4, }}>
      <Masonry>
      {pins && pins.map((pin) => {
        return <Pin key={pin._id} pin={pin}></Pin>
      })}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonaryLayout;
