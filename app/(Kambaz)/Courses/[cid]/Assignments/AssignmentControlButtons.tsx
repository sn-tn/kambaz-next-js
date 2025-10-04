import React from 'react';
import GreenCheckmark from './GreenCheckmark';
import { IoEllipsisVertical } from 'react-icons/io5';

export default function AssignmentsControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
