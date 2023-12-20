import React from "react";
import styles from "../../../style/style";
import EventCard from "../EventCard/EventCard.jsx";

const Events = () => {
  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Events</h1>
      </div>
      <div className="w-full grid">
        <EventCard />
      </div>
    </div>
  );
};

export default Events;
