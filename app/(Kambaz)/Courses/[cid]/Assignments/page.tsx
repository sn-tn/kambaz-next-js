/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import AssignmentsControls from "./AssignmentsControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import AssignmentsPercentage from "./AssignmentsPercentage";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "./client";
import { setAssignments } from "./reducer";
import { useEffect } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentReducer);
  const dispatch = useDispatch();
  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  }
  const onRemoveAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(setAssignments(assignments.filter((assignment: any) => assignment._id !== assignmentId)));
  }
  useEffect(() => {
    fetchAssignments()
  }, []);
  return (
    <div>
      <AssignmentsControls /> <br /> <br /> <br /> <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem id="wd-assignment-list" className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="fs-3" /> <IoMdArrowDropdown className="me-2 fs-2" />
            ASSIGNMENTS
            <AssignmentsControlButtons /> <AssignmentsPercentage />
          </div>
          {assignments
            .map((assignment: any) => (
              <ListGroup key={assignment._id} className="wd-assignment-list-item rounded-0">
                <ListGroupItem className="p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3 float-start" />
                  <div id="wd-assignment-description" className="float-start">
                    <Link href={`/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link text-decoration-none text-dark fs-4">
                      <b>{assignment.title}</b>
                    </Link>
                    <div id="wd-assignment-available" className="fs-6">
                      <span className="text-danger">Multiple Modules</span> | <b>Available From</b> {new Date(assignment.availableFrom).toDateString()} | <b>Available Until</b> {new Date(assignment.availableUntil).toDateString()}
                    </div>
                    <div id="wd-assignment-due" className="fs-6">
                      <b>Due</b> {new Date(assignment.due).toDateString()} | {assignment.points} pts
                    </div>
                  </div>
                  <AssignmentControlButtons assignment={assignment} onRemoveAssignment={onRemoveAssignment}/>
                </ListGroupItem>
              </ListGroup>
            ))}
          {/*old assignments*/}
          {/* <ListGroup className="wd-assignment-list-item rounded-0">
            <ListGroupItem className="p-3 ps-1">
              <BsGripVertical className="me-2 fs-3 float-start" />
              <div id="wd-assignment-description" className="float-start">
                <Link href="/Courses/1234/Assignments/0001" className="wd-assignment-link text-decoration-none text-dark fs-4">
                  <b> A1 - ENV + HTML </b>
                </Link>
                <div id="wd-assignment-available" className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am |
                </div>
                <div id="wd-assignment-due" className="fs-6">
                  <b>Due</b> May 13 at 11:59pm | 100 pts
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="wd-assignment-list-item rounded-0">
            <ListGroupItem className="p-3 ps-1">
              <BsGripVertical className="me-2 fs-3 float-start" />
              <div id="wd-assignment-description" className="float-start">
                <Link href="/Courses/1234/Assignments/0002" className="wd-assignment-link text-decoration-none text-dark fs-4">
                  <b>A2 - CSS + BOOTSTRAP</b>
                </Link>
                <div id="wd-assignment-available" className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am |
                </div>
                <div id="wd-assignment-due" className="fs-6">
                  <b>Due</b> May 20 at 11:59pm | 100 pts
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
          </ListGroup>
          <ListGroup className="wd-assignment-list-item rounded-0">
            <ListGroupItem className="p-3 ps-1">
              <BsGripVertical className="me-2 fs-3 float-start" />
              <div id="wd-assignment-description" className="float-start">
                <Link href="/Courses/1234/Assignments/0003" className="wd-assignment-link text-decoration-none text-dark fs-4">
                  <b>A3 - JAVASCRIPT + REACT</b>
                </Link>
                <div id="wd-assignment-available" className="fs-6">
                  <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am |
                </div>
                <div id="wd-assignment-due" className="fs-6">
                  <b>Due</b> May 27 at 11:59pm | 100 pts
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
          </ListGroup> */}
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}