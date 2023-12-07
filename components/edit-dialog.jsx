"use client";

import { cn } from "@/lib/utils";
import format from "date-fns/format";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

const AlertDialogDemo = ({ children, data }) => {
  const [content, setContent] = useState(data.content);
  const [isSuccess, setIsSuccess] = useState("Edit");
  const [date, setDate] = useState(undefined);

  useEffect(() => {
    // console.log(format(date, "MM/dd/yyyy"));
  }, [date]);

  const handleSubmit = async (e) => {
    setIsSuccess("Loading...");
    e.preventDefault();
    try {
      const response = await fetch("/api/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          id: data.id,
          date: format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
        }),
      });

      if (response.ok) {
        console.log(response);
        setIsSuccess("Success");
      } else {
        console.error("Registration failed");
      }
    } catch (e) {
      console.log("err", e);
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="backdrop-blur-md bg-white/50">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-400">
            Make our memories more beautiful
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <Textarea
            name="content"
            value={content}
            onChange={handleChange}
            className="w-full bg-white/50 h-52 text-slate-900"
            required
          />
          {/* ------------ DATE PICKER ------------ */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal text-pink-500 backdrop-blur-md bg-white/10",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span className="text-black">Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className={"bg-transparent"}
              />
            </PopoverContent>
          </Popover>
          {/* ------------ DATE PICKER ------------ */}
        </AlertDialogDescription>
        <AlertDialogContent></AlertDialogContent>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-slate-200 text-slate-700 hover:bg-red-400">
            Cancel
          </AlertDialogAction>
          <form onSubmit={handleSubmit}>
            <Button
              type="submit"
              className={`${
                isSuccess === "Success"
                  ? "bg-green-600"
                  : isSuccess === "Loading..."
                  ? "bg-orange-400"
                  : "bg-red-400"
              } hover:bg-red-300`}
              variant="other"
            >
              {isSuccess}
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogDemo;
