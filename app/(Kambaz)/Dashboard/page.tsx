/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import Link from "next/link";
import * as db from "../Database";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = db;
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });
  // const isFaculty = currentUser && (currentUser as any).role === "FACULTY";
  const isFaculty = true;
  // if (!currentUser) {
  //   return <div>You need to be logged in to view this page.</div>
  // }
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
        {!isFaculty && (<Button variant="primary" className="float-end">Enrollments</Button>)}</h1> <hr />
      {isFaculty && (<div><h5>
        New Course
        <button className="btn btn-primary float-end" id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}> Add </button>
        <Button className="btn-warning float-end me-2" onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click">Update</Button>
      </h5>
      <FormControl defaultValue={course.name} className="mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
      <FormControl as="textarea" defaultValue={course.description} rows={3} onChange={(e) => setCourse({ ...course, description: e.target.value })} />
      <hr /> </div>)}
      <h2 id="wd-dashboard-published">Public Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
          // .filter((course) => enrollments.some(
          //   (enrollment) =>
          //     enrollment.user === (currentUser as any)._id &&
          //     enrollment.course === course._id
          // ))
            .map((course) => (
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link href={`/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                    <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        {course.description}
                      </CardText>
                      <Button variant="primary">Go</Button>

                      {isFaculty && (<span><Button onClick={(event) => {
                        event.preventDefault();
                        dispatch(deleteCourse(course._id));
                      }} className="btn-danger float-end" id="wd-delete-course-click">Delete</Button>
                        <Button onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }} className="btn-warning float-end me-2" id="wd-edit-course-click">Edit</Button></span>)}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div >
  )
}