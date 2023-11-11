// import PropTypes from "prop-types";
import Image from "next/image";
import "./TimelineItemStyle.css";
import { useEffect } from "react";

const TimelineItem = ({ data }) => {
  const { year, imageUrl, title, description } = data.item;

  return (
    <div className="timeline__content">
      <img
        className="timeline__img"
        src={`${imageUrl}?random=${data.index}`}
        alt={title}
      />
      <h2 className="timeline__content-title">{year}</h2>
      <p className="timeline__content-desc">{description}</p>
    </div>
  );
};

export default TimelineItem;
