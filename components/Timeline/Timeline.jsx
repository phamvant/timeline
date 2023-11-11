"use client";

import PropTypes from "prop-types";
import { useState } from "react";
import { Element, Link } from "react-scroll";
import TimelineItem from "../TimelineItem/TimelineItem";
import "./TimelineStyle.css";

const Timeline = ({ timelineData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSetActive = (to) => {
    setActiveIndex(Number(to.split("-").pop()) + 1);
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

Timeline.propTypes = {
  timelineData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        year: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
export default Timeline;
