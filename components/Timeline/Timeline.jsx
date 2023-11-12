"use client";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Element, Link } from "react-scroll";
import TimelineItem from "../TimelineItem/TimelineItem";
const { image } = require("@/components/image_dummy.json");
import "./TimelineStyle.css";

const Timeline = () => {
  const initData = {
    title: "Our Sacred Timeline",
    subtitle: "For all time, always",
    items: [{}],
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [timelineData, setTimelineData] = useState(initData);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const response = await (await fetch("/api/query")).json();
      const { data } = response;
      setTimelineData((prev) => ({
        ...prev,
        items: data,
      }));
    };

    dataFetch();
  }, []);

  useEffect(() => {
    console.log(activeIndex, timelineData.items);
  }, [activeIndex]);

  const handleSetActive = (to) => {
    setActiveIndex(Number(to.split("-").pop()));
  };

  return (
    <>
      <div
        className="timeline-container"
        style={{
          backgroundImage: `url("${timelineData.items[activeIndex].imageUrl}")`,
        }}
      >
        <div className="timeline-header">
          <h2 className="timeline-header__title">{timelineData.title}</h2>
          <h3 className="timeline-header__subtitle">{timelineData.subtitle}</h3>
        </div>
        <div className="timeline">
          {timelineData.items.map((item, index) => (
            <Element
              style={{ paddingTop: "100px" }}
              key={index}
              name={`timeline-item-${index}`}
              className={`timeline-item timeline-item${
                index === activeIndex ? "--active" : ""
              }`}
            >
              <Link
                activeClass="active"
                onSetActive={handleSetActive}
                className="link"
                to={`timeline-item-${index}`}
                spy={true}
              ></Link>
              <TimelineItem key={index} data={{ item, index }} />
            </Element>
          ))}
        </div>
      </div>
    </>
  );
};

export default Timeline;
