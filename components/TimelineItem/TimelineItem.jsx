"use client";

// import PropTypes from "prop-types";
import { Plus, X } from "lucide-react";
import AlertDialogDemo from "../edit-dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";
import "./TimelineItemStyle.css";

const TimelineItem = ({ data }) => {
  const { imageUrl, title, content, id } = data.item;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="timeline__content">
          <img
            className="timeline__img"
            src={`${imageUrl}`}
            alt={title}
            loading="lazy"
          />
          <h2 className="timeline__content-title leading-tight text-5xl lg:text-7xl">
            {title}
          </h2>

          <h2 className="timeline__content-date text-teal-50 mb-5">
            &#x2022; 13 April 2023
          </h2>
          <AlertDialogDemo id={id}>
            <p className="timeline__content-desc lg:w-[500px]"> {content}</p>
          </AlertDialogDemo>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="rounded-full w-fit backdrop-blur-sm bg-white/50">
        <ContextMenuItem inset className="p-0">
          <Plus className="p-0" />
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset className="p-0">
          <X color="#ED7B84" className="p-0" />
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default TimelineItem;
