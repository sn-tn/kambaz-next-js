/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { Button, FormControl } from "react-bootstrap";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const fetchProfile = () => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  };
  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl defaultValue={profile.username} className="mb-2" id="wd-username" onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
          <FormControl defaultValue={profile.password} className="mb-2" id="wd-password" onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
          <FormControl defaultValue={profile.firstName} className="mb-2" id="wd-firstname" onChange={(e) => setProfile({ ...profile, firstname: e.target.value })} />
          <FormControl defaultValue={profile.lastName} className="mb-2" id="wd-lastname" onChange={(e) => setProfile({ ...profile, lastname: e.target.value })} />
          <FormControl defaultValue={profile.dob} className="mb-2" id="wd-dob" onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date" />
          <FormControl defaultValue={profile.email} className="mb-2" id="wd-email" onChange={(e) => setProfile({ ...profile, email: e.target.value })} type="email" />
          <select id="wd-role" className="form-select mb-2" onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option> {" "}
            <option value="STUDENT">Student</option>
          </select>
          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
          <Button onClick={() =>
            dispatch(setCurrentUser(profile))
          }> Save </Button>
        </div>
      )}
    </div>
  );
}