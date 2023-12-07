"use client";

import { cn } from "@/lib/utils";
import "@uploadthing/react/styles.css";
import format from "date-fns/format";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import FileUpload from "../file-upload";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import "./InputForm.css";

const InputForm = (session) => {
  const [data, setData] = useState({
    url: "",
    title: "",
    content: "",
    date: new Date(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if (!data.url) {
      //   alert("You forgot to put some image right?");
      //   return;
      // }
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: data.url,
          title: data.title,
          content: data.content,
          date: format(data.date, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        }),
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Registration failed");
      }
    } catch (e) {
      console.log("err", e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeUrl = (val) => {
    console.log(val);
    setData((prevData) => ({
      ...prevData,
      url: val,
    }));
  };

  return (
    <div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>You have something to keep?</h2>

          <FileUpload
            endpoint={"imageUploader"}
            value={data.url}
            onChange={handleChangeUrl}
          />
          <div className="input-field" style={{ marginTop: " 50px" }}>
            <input
              name="title"
              value={data.title}
              onChange={handleChange}
              required
            />
            <label>What so happy?</label>
          </div>
          <div className="input-field" style={{ marginTop: "50px" }}>
            <textarea
              name="content"
              value={data.content}
              onChange={handleChange}
              required
            />
            <label>Some details for this cute moment</label>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal text-white backdrop-blur-md bg-white/30",
                  !data.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.date ? (
                  format(data.date, "PPP")
                ) : (
                  <span className="text-black">Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.date}
                onSelect={(dateIn) => {
                  setData((prev) => ({
                    ...prev,
                    date: dateIn,
                  }));
                }}
                initialFocus
                className={"bg-transparent"}
              />
            </PopoverContent>
          </Popover>
          <button type="submit">Submit our Memories</button>
        </form>
      </div>
      <button
        style={{ position: "fixed", bottom: "5%", right: "5%" }}
        onClick={() => {
          window.location.assign("/");
        }}
      >
        Back
      </button>
    </div>
  );
};

export default InputForm;
