"use client";

import usePageBottom from "@/utils/usePageBottom";
import { useEffect, useRef, useState } from "react";
import { Element, Link } from "react-scroll";
import TimelineItem from "../TimelineItem/TimelineItem";
import "./TimelineStyle.css";

const Timeline = () => {
  const initData = {
    title: "Our Sacred Timeline",
    subtitle: "For all time, always",
    items: [
      {
        id: 0,
        imageUrl: "/bg.jpg",
        title: "Loading...",
        date: "T",
      },
    ],
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [timelineData, setTimelineData] = useState(initData);

  const reached = usePageBottom();
  if (reached && activeIndex != timelineData.items.length - 1) {
    setActiveIndex(timelineData.items.length - 1);
  }

  useEffect(() => {
    const dataFetch = async () => {
      const response = await (await fetch("/api/query")).json();
      const { data } = response;
      const sortedArray = data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setTimelineData((prev) => ({
        ...prev,
        items: sortedArray,
      }));
    };

    dataFetch();
  }, []);

  const handleSetActive = (to) => {
    setActiveIndex(Number(to.split("-").pop()));
  };

  const listInnerRef = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;

      if (isNearBottom) {
        console.log("Reached bottom");
      }
    }
  };

  useEffect(() => {
    const listInnerElement = listInnerRef.current;

    if (listInnerElement) {
      listInnerElement.addEventListener("scroll", onScroll);

      // Clean-up
      return () => {
        listInnerElement.removeEventListener("scroll", onScroll);
      };
    }
  }, []);

  return (
    <div className="list-inner" ref={listInnerRef}>
      <div
        className="timeline-container"
        style={{
          backgroundImage: `url("${
            timelineData.items[activeIndex].imageUrl
              ? timelineData.items[activeIndex].imageUrl
              : "/default.jpeg"
          }")`,
        }}
      >
        <div className="timeline-header">
          <h2 className="timeline-header__title text-6xl">
            {timelineData.title}
          </h2>
          <h3 className="timeline-header__subtitle">{timelineData.subtitle}</h3>
          <button
            onClick={() => {
              window.location.href = "/createMemories";
            }}
          >
            Create some
          </button>
        </div>
        <div className="timeline max-w-5xl lg:max-w-7xl">
          {timelineData.items.map((item, index) => (
            <Element
              style={{ paddingTop: "100px" }}
              key={index}
              name={`timeline-item-${index}`}
              className={`timeline-item timeline-item${
                index === activeIndex ? "--active" : ""
              }`}
            >
              {index % 2 == 0 ? (
                <>
                  <TimelineItem key={index} data={{ item, index }} />
                  <p className="text-5xl text-white mr-40 hidden lg:block font-mono">
                    &#x2022; {item.date.split("T")[0]}
                  </p>
                  <Link
                    activeClass="active"
                    onSetActive={handleSetActive}
                    className="link hidden"
                    to={`timeline-item-${index}`}
                    spy={true}
                  ></Link>
                </>
              ) : (
                <>
                  <p className="text-5xl ml-40 text-white hidden lg:block font-mono">
                    &#x2022; {item.date.split("T")[0]}
                  </p>
                  <TimelineItem key={index} data={{ item, index }} />
                  <Link
                    activeClass="active"
                    onSetActive={handleSetActive}
                    className="link hidden"
                    to={`timeline-item-${index}`}
                    spy={true}
                  ></Link>
                </>
              )}
            </Element>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
