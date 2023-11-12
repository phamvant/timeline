// import PropTypes from "prop-types";
import Image from "next/image";
import "./TimelineItemStyle.css";
import { useEffect } from "react";

const TimelineItem = ({ data }) => {
  const { imageUrl, title, content } = data.item;

  return (
    <div className="timeline__content">
      <img className="timeline__img" src={`${imageUrl}`} alt={title} />
      <h2 className="timeline__content-title">{title}</h2>
      <p className="timeline__content-desc">{content}</p>
    </div>
  );
};

export default TimelineItem;
