/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses,
} from "../Courses/reducer";
import Link from "next/link";
// import * as db from "../Database";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setEnrollments } from "../Enrollments/reducer";
import * as client from "../Courses/client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  const [isFaculty, setIsFaculty] = useState(false);
  const [enrollmentsActive, setEnrollmentsActive] = useState(false);
  const dispatch = useDispatch();
  const fetchFaculty = () => {
    if (!currentUser) return;
    if ((currentUser as any).role === "FACULTY") {
      setIsFaculty(true);
    }
  };
  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAllCourses = async () => {
    try {
      const courses = await client.fetchAllCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };
  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(
      setCourses(courses.filter((course: any) => course._id !== courseId))
    );
  };
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c: any) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      )
    );
  };
  const fetchUserEnrollments = async () => {
    const enrollments = await client.findMyEnrollments();
    dispatch(setEnrollments(enrollments));
  };
  const enrollUserInCourse = async (courseId: string) => {
    const newEnrollment = await client.enrollUserInCourse(courseId);
    dispatch(setEnrollments([...enrollments, newEnrollment]));
  };
  const unenrollUserInCourse = async (courseId: string) => {
    await client.unenrollUserInCourse(courseId);
    dispatch(
      setEnrollments(
        enrollments.filter((enrollment: any) => enrollment.course !== courseId)
      )
    );
  };
  useEffect(() => {
    fetchCourses();
    fetchFaculty();
    fetchUserEnrollments();
  }, [currentUser]);
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        {!isFaculty && (
          <Button
            variant="primary"
            className="float-end"
            onClick={() => {
              if (enrollmentsActive) {
                fetchCourses();
              } else {
                fetchAllCourses();
              }
              setEnrollmentsActive(!enrollmentsActive);
            }}
          >
            Enrollments
          </Button>
        )}
      </h1>
      <hr />
      {isFaculty && (
        <div>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <Button
              className="btn-warning float-end me-2"
              onClick={onUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </Button>
          </h5>
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </div>
      )}
      <h2 id="wd-dashboard-published">Public Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: any) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              {!enrollmentsActive && (
                <Card>
                  <Link
                    href={`/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      variant="top"
                      src="/images/reactjs.jpg"
                      width="100%"
                      height={160}
                    />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>
                      <Button variant="primary">Go</Button>

                      {isFaculty && (
                        <span>
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              onDeleteCourse(course._id);
                            }}
                            className="btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </Button>
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn-warning float-end me-2"
                            id="wd-edit-course-click"
                          >
                            Edit
                          </Button>
                        </span>
                      )}
                    </CardBody>
                  </Link>
                </Card>
              )}
              {enrollmentsActive && (
                <Card>
                  <CardImg
                    variant="top"
                    src="/images/reactjs.jpg"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    {enrollments.some(
                      (enrollment: any) => enrollment.course === course._id
                    ) ? (
                      <Button
                        className="btn-danger"
                        onClick={() => unenrollUserInCourse(course._id)}
                      >
                        Unenroll
                      </Button>
                    ) : (
                      <Button
                        className="btn-success"
                        onClick={() => enrollUserInCourse(course._id)}
                      >
                        Enroll
                      </Button>
                    )}
                  </CardBody>
                </Card>
              )}
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
