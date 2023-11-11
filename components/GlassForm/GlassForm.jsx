"use client";

import React, { useState } from "react";
import useRouter from "next/router";
import axios from "axios";
import { signIn } from "next-auth/react";
import "./GlassForm.css";

const GlassForm = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter;

  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        email: credentials.name,
        password: credentials.password,
        redirect: false,
      });
      // const response = await axios.post("/api/auth/signin", credentials);
      if (response.ok) {
        // router.push("/"); // Redirect to dashboard or another page on successful registration
        // router.refresh();
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

export default GlassForm;
