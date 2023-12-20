import React from "react";
import styles from "../../../style/style";

const Sponsered = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white p-[10px] mb-10 rounded-md`}
    >
      <div className="w-full flex items-center justify-between ">
        <div className="flex items-start">
          <img
            src="https://ww2.freelogovectors.net/wp-content/uploads/2021/12/sonyliv-logo-freelogovectors.net_.png?lossy=1&ssl=1"
            className="w-[150px] object-contain"
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Dell_Logo.png/799px-Dell_Logo.png"
            className="w-[150px] object-contain"
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png"
            className="w-[150px] object-contain"
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg"
            className="w-[150px] object-contain"
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Boat_Logo.webp/1200px-Boat_Logo.webp.png"
            className="w-[150px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsered;
