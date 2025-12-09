/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as client from "../client";
import { setCurrentUser } from "../reducer";
import { redirect } from "next/navigation";
import { Button } from "react-bootstrap";

export default function Signup() {
  const [user, setUser] = useState<any>({role: "NONE"});
  const dispatch = useDispatch();
  const signup = async () => {
    if (user.role == "NONE") {
      alert("You must choose a role!");
      return;
    }
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
      <label htmlFor="id-signup-role-select">
        <b>Role</b>
      </label>
      <select
        id="wd-signup-role-select"
        className="form-select w-50 mb-2"
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        defaultValue="NONE"
      >
        <option value="NONE">Pick a role</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <Button
        className="btn btn-primary w-100 mb-2"
        onClick={signup}
      >
        Signup
      </Button>
      <br />
      <Link href="Signin"> Signin </Link>
    </div>
  );
}
