import React from 'react';
import { BsPlus } from 'react-icons/bs';
import { IoEllipsisVertical } from 'react-icons/io5';

export default function AssignmentsControlButtons() {
  return (
    <div className="float-end">
      <BsPlus className="fs-3" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
