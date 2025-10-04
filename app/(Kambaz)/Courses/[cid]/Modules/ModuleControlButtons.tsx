import React from 'react';
import GreenCheckmark from './GreenCheckmark';
import { BsPlus } from 'react-icons/bs';
import { IoEllipsisVertical } from 'react-icons/io5';

export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlus className="fs-3" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
