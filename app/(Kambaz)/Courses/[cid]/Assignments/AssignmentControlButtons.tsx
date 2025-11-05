/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import GreenCheckmark from './GreenCheckmark';
import { IoEllipsisVertical } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { deleteAssignment } from './reducer';

export default function AssignmentsControlButtons({assignment} : {assignment: any}) {
  const dispatch = useDispatch();
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <FaTrashCan id="wd-assignment-delete-click" className="mt-1 fs-4 text-danger float-end"
        onClick={() => {
          if (confirm(`Are you sure you want to remove assignment: ${assignment.title}`)) {
            dispatch(deleteAssignment(assignment._id));
          }
        }} />
    </div>
  );
}
