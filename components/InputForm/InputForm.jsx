"use client";

import React, { useState } from "react";
import "./InputForm.css";
import FileUpload from "../file-upload";
import "@uploadthing/react/styles.css";

const InputForm = (session) => {
  const [data, setData] = useState({
    url: "",
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!data.url) {
        alert("You forgot to put some image right?");
        return;
      }
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: data.url,
          title: data.title,
          content: data.content,
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
      <button type="submit">Submit our Memories</button>
    </form>
  );
};

export default InputForm;
