import React from "react";
import { useSelector } from "react-redux";
// import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
// import Loader from "../components/Layout/Loader";
import EventCard from "../components/Route/EventCard/EventCard";
import Footer from "../components/Route/Footer/Footer";

const EventsPage = () => {
    // const { allEvents, isLoading } = useSelector((state) => state.events);
    return (
        <>
            <div>
                <Header activeHeading={4} />
                {/* <EventCard active={true} data={allEvents && allEvents[0]} /> */}
                <EventCard/>
                <EventCard/>
                <Footer/>
            </div>

        </>
    );
};

export default EventsPage;