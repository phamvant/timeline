"use client";

import React, { useState } from "react";
import "./InputForm.css";

const InputForm = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: "url",
          title: "Post Title",
          content: "Post Content",
        }),
      });

      if (response.ok) {
      } else {
        console.error("Registration failed");
      }
    } catch (e) {
      console.log("err", e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Hold on!</h2>
      <div className="input-field">
        <input
          type="text"
          name="name"
          value={credentials.user}
          onChange={handleChange}
          required
        />
        <label>Your Last Name Only, Darling</label>
      </div>
      <div className="input-field">
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <label>Our Secret</label>
      </div>
      <button type="submit">Get In To Ours Memories</button>
    </form>
  );
};

export default InputForm;
