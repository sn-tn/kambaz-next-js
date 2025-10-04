import { Button, Col, Container, FormCheck, FormLabel, Row } from "react-bootstrap"

export default function AssignmentEditor() {
  return (
    <div id="wd-assignment-editor" className="ms-5">
      <label htmlFor="wd-name" className="form-label">Assignment Name</label>
      <input id="wd-name" className="form-control mb-5" defaultValue="A1 - ENV + HTML" />
      <textarea id="wd-description" rows={5} className="form-control mb-4">
        The assignment is available online Submit a link to the landing page of your Web application running on Netlify.
        The landing page should include the following: Your full name and section Links to each of the lab assignments
        Link to the Kambaz application Links to all relevant source code repositories The Kambaz application should include
        a link to navigate back to the landing page.
      </textarea>
      <Row className="mb-4">
        <Col sm={4} className="pe-0">
          <label htmlFor="wd-points" className="form-label float-end">Points</label>
        </Col>
        <Col sm={8}>
          <input id="wd-points" type="number" className="form-control" defaultValue={100} />
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
            <input type="date" id="wd-due-date" defaultValue="2024-05-13" className="form-control mb-4" />
            <Row>
              <Col>
                <label htmlFor="wd-available-from" className="form-label"><b>Available from</b></label>
                <input type="date" id="wd-available-from" defaultValue="2024-05-06" className="form-control" />

              </Col>
              <Col>
                <label htmlFor="wd-available-until" className="form-label"><b>Until</b></label>
                <input type="date" id="wd-available-until" defaultValue="2024-05-20" className="form-control col-md-6" />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <hr />
      <div className="float-end">
        <Button variant="secondary" className="border-secondary text-dark me-1">Cancel</Button>
        <Button variant="danger" className="border-secondary">Save</Button>
      </div>
    </div>
  );
}