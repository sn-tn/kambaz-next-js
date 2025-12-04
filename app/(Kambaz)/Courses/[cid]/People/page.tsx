/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import * as client from "../../client";
import { useParams } from "next/navigation";
import PeopleTable from "./Table/page";

export default function PeoplePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const fetchUsers = async () => {
    const users = await client.findUsersForCourse(cid as string);
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, [])
  return (
    <div>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
