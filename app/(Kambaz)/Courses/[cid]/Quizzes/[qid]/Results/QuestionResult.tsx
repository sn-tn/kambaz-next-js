"use client";

import { Col, Row } from "react-bootstrap";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function QuestionResult({
  question,
  answer,
}: {
  question: any;
  answer: any;
}) {
  const isCorrect = () => {
    return question.answers.includes(answer);
  };
  return (
    <div
      key={question._id}
      className={`border ${
        isCorrect() ? "border-success" : "border-danger"
      } m-1 mb-3`}
    >
      <div id="wd-quiz-preview-question" className="border bg-light">
        <Row id="wd-quiz-preview-header" className="bg-secondary m-1 p-2">
          <Col className="col-6">{question.title}</Col>
          <Col className="col-6 text-end">{question.points} pts</Col>
        </Row>
        <Row id="wd-quiz-preview-content" className="m-1 p-2">
          <div>{question.description}</div>
          <Col className="col-6 text-end">
            <div>Your Answer:</div>
          </Col>
          <Col className="col-6">
            <div>{answer}</div>
          </Col>
        </Row>
        <Row className="m-1 p-2">
          <Col className="col-6 text-end">
            <div>Correct Answers:</div>
          </Col>
          <Col className="col-6">
            <div>
              {question.answers.map((answer: any) => (
                <div key={answer}>
                  <b>{answer}</b>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
