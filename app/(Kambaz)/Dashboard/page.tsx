import Image from "next/image";
import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Public Courses (3)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link className="wd-dashboard-course-link text-decoration-none text-dark" href="/Courses/1234/Home">
                <CardImg variant="top" src="/images/reactjs.jpg" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-no-wrap overflow-hidden">CS1234 React JS</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Full Stack software developer
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link className="wd-dashboard-course-link text-decoration-none text-dark" href="/Courses/2000">
                <CardImg variant="top" src="/images/algo.jpg" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-no-wrap overflow-hidden">CS2000 Algorithms</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Learn how to use algorithms and data structures to improve programs
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link className="wd-dashboard-course-link text-decoration-none text-dark" href="/Courses/2100">
                <CardImg variant="top" src="/images/systems.jpg" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-no-wrap overflow-hidden">CS2100 Systems</CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    Low level programming
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div >
  )
}