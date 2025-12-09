/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import * as client from "../../../../client";
import { FaPencil } from "react-icons/fa6";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>();
  const fetchQuiz = async () => {
    const quiz = await client.fetchQuizById(cid as string, qid as string);
    setQuiz(quiz);
  };
  const getQuizType = () => {
    if (quiz.quizType === "GRADED") {
      return "Graded Quiz";
    } else if (quiz.quizType === "PRACTICE") {
      return "Practice Quiz";
    } else if (quiz.quizType === "GRADED_SURVEY") {
      return "Graded Survey";
    }
    return "Ungraded Survey";
  };
  const getShowCorrectAnswers = () => {
    if (quiz.showCorrect === "NEVER") {
      return "Never";
    }
    return "Immediately";
  };
  const togglePublish = async () => {
    await client.updateQuiz(quiz._id, { ...quiz, published: !quiz.published });
    fetchQuiz();
  };
  useEffect(() => {
    fetchQuiz();
  }, []);
  if (!quiz) {
    return <h4>Loading</h4>;
  }
  return (
    <div id="wd-quiz-details">
      <div className="text-center m-1">
        <Button href="./Preview" className="border btn-secondary m-1">
          Preview
        </Button>
        <Button href="./Editor" className="border btn-secondary m-1">
          <FaPencil className="" />
          Edit
        </Button>
      </div>
      <div id="wd-quiz-details-table" className="border border-2 border-dotted">
        <h3 className="mb-4">{quiz.title}</h3>
        <Row>
          <Col className="text-end">
            <b>Quiz Type</b>
          </Col>
          <Col>{getQuizType()}</Col>
        </Row>
        <Row>
          <Col className="text-end">
            <b>Points</b>
          </Col>
          <Col>{quiz.points}</Col>
        </Row>
        <Row>
          <Col className="text-end">
            <b>Assignment Group</b>
          </Col>
          <Col>Quizzes</Col>
        </Row>
        <Row>
          <Col className="text-end">
            <b>Shuffle Answers</b>
          </Col>
          <Col>{quiz.shuffle ? "Yes" : "No"}</Col>
        </Row>
        <Row>
          <Col className="text-end">
            <b>Time Limit</b>
          </Col>
          <Col>{quiz.timeLimit} Minutes</Col>
        </Row>
        <Row>
          <Col className="text-end">
            <b>Multiple Attempts</b>
          </Col>
          <Col>{quiz.multipleAttempts ? "Yes" : "No"}</Col>
        </Row>
        {quiz.multipleAttempts && (
          <Row>
            <Col className="text-end">
              <b>How Many Attempts</b>
            </Col>
            <Col>{quiz.attempts}</Col>
          </Row>
        )}
        <Row>
          <Col className="text-end">
            <b>Show Correct Answers</b>
          </Col>
          <Col>{getShowCorrectAnswers()}</Col>
        </Row>
        <Row>
          <Col className="text-end">
            <b>Access Code</b>
          </Col>
          <Col>{quiz.accessCode}</Col>
        </Row>
        <Row>
          <Col className="text-end">
            <b>One Question at a Time</b>
          </Col>
          <Col>{quiz.oneQuestionAtATime ? "Yes" : "No"}</Col>
        </Row>
        <Row>
          <Col className="text-end">
            <b>Webcam Required</b>
          </Col>
          <Col>{quiz.webcamRequired ? "Yes" : "No"}</Col>
        </Row>
        <Row>
          <Col className="text-end">
            <b>Lock Questions After Answering</b>
          </Col>
          <Col>{quiz.lockQuestions ? "Yes" : "No"}</Col>
        </Row>{" "}
        <br />
        <Table>
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{quiz.due}</td>
              <td>Everyone</td>
              <td>{quiz.availableFrom}</td>
              <td>{quiz.availableUntil}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="text-center m-2">
        <Button
          className={`${
            quiz.published ? "btn-danger" : "btn-success"
          } text-center`}
          onClick={togglePublish}
        >
          {quiz.published ? "Unpublish" : "Publish"}
        </Button>
      </div>
    </div>
  );
}
