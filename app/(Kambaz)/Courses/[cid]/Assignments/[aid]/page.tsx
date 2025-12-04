/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Col, Container, FormCheck, FormLabel, Row } from "react-bootstrap"
import { redirect, useParams } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useEffect, useState } from "react";
import { addAssignment, setAssignments, updateAssignment } from "../reducer";
import * as client from "../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentReducer);
  const [assignment, setAssignment] = useState<any>({
        _id: aid,
        title: "New Assignment",
        course: cid,
        description: "New Assignment Description",
        points: "100",
        due: new Date().toISOString().slice(0, 10),
        availableFrom: new Date().toISOString().slice(0, 10),
        availableUntil: new Date().toISOString().slice(0, 10),
      });
  const dispatch = useDispatch();
  const [isNew, setIsNew] = useState(true);
  const fetchAssignment = async () => {
    const currentAssignment = await client.findAssignmentById(aid as string);
    if (!currentAssignment) return;
    setAssignment(currentAssignment);
    setIsNew(false);
  };
  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  }
  const onCreateAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = await client.createAssignmentForCourse(cid as string, assignment);
    dispatch(setAssignments([...assignments, newAssignment]));
  }
  const onUpdateAssignment = async () => {
    await client.updateAssignment(assignment);
    const newAssignments = assignments.map((a: any) => a._id === assignment._id ? assignment : a);
    dispatch(setAssignments(newAssignments));
  }
  useEffect(() => {
    fetchAssignments();
    fetchAssignment();
  }, []);
  return (
    <div id="wd-assignment-editor" className="ms-5">
      <label htmlFor="wd-name" className="form-label"> Assignment Name</label>
      <input id="wd-name" className="form-control mb-4"
        value={assignment.title} onChange={(e) => {
          setAssignment({ ...assignment, title: e.target.value });
        }} />
      <textarea id="wd-description" value={assignment.description} rows={5} className="form-control mb-4"
        onChange={(e) => {
          setAssignment({ ...assignment, description: e.target.value });
        }} />
      <Row className="mb-4">
        <Col sm={4} className="pe-0">
          <label htmlFor="wd-points" className="form-label float-end">Points</label>
        </Col>
        <Col sm={8}>
          <input id="wd-points" type="number" className="form-control" value={assignment.points}
            onChange={(e) => {
              setAssignment({ ...assignment, points: e.target.value });
            }} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col sm={4} className="pe-0">
          <label htmlFor="wd-group" className="form-label float-end">Assignment Group</label>
        </Col>
        <Col sm={8}>
          <select id="wd-group" className="form-select">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          </select>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col sm={4} className="pe-0">
          <label htmlFor="wd-display-grade-as" className="form-label float-end">Display Grade as</label>
        </Col>
        <Col sm={8}>
          <select id="wd-display-grade-as" className="form-select">
            <option value="PERCENTAGE">Percentage</option>
          </select>
        </Col>
      </Row>
      <Row>
        <Col sm={4} className="pe-0">
          <label htmlFor="wd-submission-type" className="form-label float-end">Submission type</label>
        </Col>
        <Col sm={8}>
          <Container className="border rounded p-3 mb-4">
            <select id="wd-submission-type" className="form-select">
              <option value="ONLINE">Online</option>
            </select> <br />
            <FormLabel as="legend"><b>Online Entry Options</b></FormLabel>
            <FormCheck type="checkbox" label="Text Entry" name="wd-online-type" id="wd-text-entry" className="mb-2" />
            <FormCheck type="checkbox" label="Website URL" name="wd-online-type" id="wd-website-url" className="mb-2" defaultChecked />
            <FormCheck type="checkbox" label="Media Recordings" name="wd-online-type" id="wd-media-recordings" className="mb-2" />
            <FormCheck type="checkbox" label="Student Annotations" name="wd-online-type" id="wd-student-annotations" className="mb-2" />
            <FormCheck type="checkbox" label="File Uploads" name="wd-online-type" id="wd-file-uploads" className="mb-2" />
          </Container>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col sm={4} className="pe-0">
          <span className="float-end">Assign</span>
        </Col>
        <Col sm={8}>
          <Container className="border rounded p-3">
            <label htmlFor="wd-assign-to" className="form-label"><b>Assign To</b></label>
            <input id="wd-assign-to" defaultValue="Everyone" className="form-control mb-4" />
            <label htmlFor="wd-due-date" className="form-label"><b>Due</b></label> <br />
            <input type="date" id="wd-due-date" value={assignment.due || ""} className="form-control mb-4"
              onChange={(e) => setAssignment({ ...assignment, due: e.target.value })} />
            <Row>
              <Col>
                <label htmlFor="wd-available-from" className="form-label"><b>Available from</b></label>
                <input type="date" id="wd-available-from" value={assignment.availableFrom || ""} className="form-control"
                onChange={(e) => setAssignment({...assignment, availableFrom: e.target.value})} />

              </Col>
              <Col>
                <label htmlFor="wd-available-until" className="form-label"><b>Until</b></label>
                <input type="date" id="wd-available-until" value={assignment.availableUntil || ""} className="form-control col-md-6"
                onChange={(e) => setAssignment({...assignment, availableUntil: e.target.value})} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <hr />
      <div className="float-end">
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button variant="secondary" className="border-secondary text-dark me-1"
            onClick={() => redirect("../")}>Cancel</Button>
        </Link>
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button variant="danger" className="border-secondary"
            onClick={() => {
              if (isNew) {
                onCreateAssignmentForCourse()
              } else {
                onUpdateAssignment();
              }
              redirect("../");
            }}>Save</Button>
        </Link>
      </div>
    </div>
  );
}