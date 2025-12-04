/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as client from "../../../../Account/client";
import { Button, FormControl } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      {!editing && (
        <FaPencil
          onClick={() => setEditing(true)}
          className="float-end fs-5 mt-2 wd-edit"
        />
      )}
      {editing && (
        <FaCheck
          onClick={() => saveUser()}
          className="float-end fs-5 mt-2 me-2 wd-save"
        />
      )}
      <Button
        onClick={onClose}
        className="position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </Button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      {!editing && (
        <div
          className="text-danger fs-4 wd-name"
          onClick={() => setEditing(true)}
        >
          {user.firstName} {user.lastName}
        </div>
      )}
      {user && editing && (
        <FormControl
          className="w-50 wd-edit-name"
          defaultValue={`${user.firstName} ${user.lastName}`}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveUser();
            }
          }}
        />
      )}
      <b>Roles:</b>
      <span className="wd-roles">{user.role}</span>
      <br />
      <b>Login ID:</b>
      <span className="wd-login-id">{user.loginId}</span>
      <br />
      <b>Section:</b>
      <span className="wd-section">{user.section}</span>
      <br />
      <b>Total Activity:</b>
      <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <Button
        onClick={() => deleteUser(uid)}
        className="btn-danger float-end wd-delete"
      >
        Delete
      </Button>
      <Button
        onClick={onClose}
        className="btn-secondary float-end me-2 wd-cancel"
      >
        Cancel
      </Button>
    </div>
  );
}
