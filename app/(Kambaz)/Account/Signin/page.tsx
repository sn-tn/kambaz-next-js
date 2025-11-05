/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as db from "../../Database";
import { setCurrentUser } from "../reducer"
import { redirect } from "next/navigation";
import { Button, FormControl } from "react-bootstrap";
export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  }
  return (
    <div>
      <h3>Signin</h3>
      <FormControl defaultValue={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}
      placeholder="username" className="mb-2" id="wd-username" />
      <FormControl defaultValue={credentials.password} onChange={(e) => setCredentials({... credentials, password: e.target.value})}
      placeholder="password" type="password" className="mb-2" id="wd-password" />
      <Button onClick={signin} className="btn-primary w-100 mb-2" id="wd-signin-btn"> Signin </Button>
      <Link href="Signup"> Signup </Link>
    </div>
  )
}