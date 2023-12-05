"use client";

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
import { useState } from "react";
import innerText from "react-innertext";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const AlertDialogDemo = ({ children, id }) => {
  const [content, setContent] = useState(innerText(children));
  const [isSuccess, setIsSuccess] = useState("Edit");

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
          id: id,
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
          <AlertDialogDescription>
            <Textarea
              name="content"
              value={content}
              onChange={handleChange}
              className="w-full h-52 backdrop-blur-md bg-white/50"
              required
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
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
                  : "bg-pink-500"
              } hover:bg-slate-400`}
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
