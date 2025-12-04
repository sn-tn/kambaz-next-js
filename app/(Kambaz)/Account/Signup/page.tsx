/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as client from "../client";
import { setCurrentUser } from "../reducer";
import { redirect } from "next/navigation";

export default function Signup() {
  const [user, setUser] = useState<any>();
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    redirect("/Account/Profile");
  };
  return (
    <div id="wd-signup-screen">
      <h3>Signup</h3>
      <input
        placeholder="username"
        // defaultValue={user.username}
        className="wd-username form-control b-2"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        placeholder="password"
        // defaultValue={user.password}
        type="password"
        className="wd-password form-control mb-2"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Link
        href="Profile"
        className="btn btn-primary w-100 mb-2"
        onClick={signup}
      >
        Signup
      </Link>
      <br />
      <Link href="Signin"> Signin </Link>
    </div>
  );
}
