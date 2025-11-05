import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { Button, Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { CiSearch } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

export default function AssignmentsControls() {
  const openEditor = () => {
    redirect(`./Assignments/${uuidv4()}`);
  }
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Row>
        <Col sm={12} md={6}>
          <InputGroup className="me-2 float-start" id="wd-search-assignment">
            <InputGroupText> <CiSearch className="fs-1" /> </InputGroupText>
            <FormControl placeholder="Search..." />
          </InputGroup>
        </Col>
        <Col sm={12} md={6}>
          <Button variant="danger" size="lg" className="me-2 float-end" id="wd-add-assignment" onClick={openEditor}>
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Button>
          <Button variant="secondary" size="lg" className="me-2 float-end" id="wd-add-assignment-group">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </Button>
        </Col>
      </Row>
    </div>
  );
}
