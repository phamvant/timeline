"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

import "./AuthForm.css";
import { redirect } from "next/navigation";

const AuthForm = (csrfToken) => {
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
      if (response.ok) {
        redirect("./");
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
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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

export default AuthForm;
