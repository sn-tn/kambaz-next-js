/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import * as client from "../../../../../client";
import { redirect, useParams } from "next/navigation";
import {
  Button,
  Col,
  Container,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

export default function QuizDetailsEditor() {
  const [quiz, setQuiz] = useState<any>();
  const [timeLimitEnable, setTimeLimitEnable] = useState(false);
  const { cid, qid } = useParams();
  const fetchQuiz = async () => {
    const quiz = await client.fetchQuizById(cid as string, qid as string);
    console.log(quiz);
    setQuiz(quiz);
  };
  const updateQuiz = async (newQuiz: any) => {
    await client.updateQuiz(cid as string, newQuiz);
  };
  useEffect(() => {
    fetchQuiz();
  }, []);
  if (!quiz) {
    return (
      <div>
        <h4>Loading</h4>
      </div>
    );
  }
  return (
    <div id="wd-details-editor">
      <FormControl
        className="m-1 mt-2"
        placeholder="Title"
        defaultValue={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
      />
      <FormGroup controlId="wd-details-description" className="m-1 mt-3">
        <FormLabel>Quiz Description:</FormLabel>
        <FormControl defaultValue={quiz.description} as="textarea" />
      </FormGroup>
      <Row className="m-1 mt-3">
        <Col className="col-3 text-end">Quiz Type</Col>
        <Col className="col-9 w-50">
          <FormSelect
            defaultValue={quiz.quizType}
            onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
          >
            <option value="GRADED">Graded Quiz</option>
            <option value="PRACTICE">Practice Quiz</option>
            <option value="GRADED_SURVEY">Graded Survey</option>
            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
          </FormSelect>
        </Col>
      </Row>
      <Row className="m-1">
        <Col className="col-3 text-end">Points</Col>
        <Col className="col-9 w-50">
          <FormControl type="number" defaultValue={quiz.points} />
        </Col>
      </Row>
      <Row className="m-1">
        <Col className="col-3 text-end">Assignment Group</Col>
        <Col className="col-9 w-50">
          <FormSelect
            defaultValue={quiz.assignmentGroup}
            onChange={(e) =>
              setQuiz({ ...quiz, assignmentGroup: e.target.value })
            }
          >
            <option value="QUIZZES">Quizzes</option>
            <option value="EXAMS">Exams</option>
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="PROJECTS">Projects</option>
          </FormSelect>
        </Col>
      </Row>{" "}
      <br />
      <Row id="wd-details-editor-options" className="m-1">
        <Col className="col-3 text-end">
          <b>Options</b>
        </Col>
        <Col className="col-9">
          <FormCheck
            type="checkbox"
            label="Shuffle Answers"
            id="wd-details-editor-shuffle"
            className="m-1"
            defaultChecked={quiz.shuffle}
            onChange={(e) => setQuiz({ ...quiz, shuffle: e.target.value })}
          />
          <Row>
            <Col className="col-4">
              <FormCheck
                type="checkbox"
                label="Time Limit"
                id="wd-details-editor-time-limit"
                className="m-1"
                defaultChecked={quiz.timeLimit > 0}
                onChange={() => {
                  setQuiz({ ...quiz, timeLimit: 0 });
                  setTimeLimitEnable(!timeLimitEnable);
                }}
              />
            </Col>
            <Col className="col-4">
              {timeLimitEnable ? (
                <FormControl
                  id="wd-details-editor-time-limit-num"
                  className="w-50 float-end"
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) =>
                    setQuiz({ ...quiz, timeLimit: e.target.value })
                  }
                />
              ) : (
                <FormControl
                  id="wd-details-editor-time-limit-num"
                  className="w-50 float-end"
                  type="number"
                  value={quiz.timeLimit}
                  disabled
                  onChange={(e) =>
                    setQuiz({ ...quiz, timeLimit: e.target.value })
                  }
                />
              )}
            </Col>
            <Col className="col-4">
              <FormLabel htmlFor="wd-details-editor-time-limit-num">
                Minutes
              </FormLabel>
            </Col>
          </Row>
          <div
            id="wd-details-editor-attempt-options"
            className="border rounded-2 p-1 w-75 mt-2"
          >
            <FormCheck
              id="wd-details-editor-multiple-attempts"
              label="Multiple Attempts"
              className=""
              defaultChecked={quiz.multipleAttempts}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  multipleAttempts: e.target.checked,
                  attempts: 1,
                })
              }
            />
            {quiz.multipleAttempts && (
              <div>
                <FormGroup>
                  <FormLabel htmlFor="wd-details-editor-attempts">
                    Attempts
                  </FormLabel>
                  <FormControl
                    id="wd-details-editor-attempts"
                    defaultValue={quiz.attempts}
                    type="number"
                    onChange={(e) =>
                      setQuiz({ ...quiz, attempts: e.target.value })
                    }
                  />
                </FormGroup>
              </div>
            )}
          </div>
          <FormCheck
            type="checkbox"
            label="One Question at a Time"
            id="wd-details-editor-oqaat"
            className="m-1"
            defaultChecked={quiz.oneQuestionAtATime}
            onChange={(e) =>
              setQuiz({ ...quiz, oneQuestionAtATime: e.target.value })
            }
          />
          <FormCheck
            type="checkbox"
            label="Webcam Required"
            id="wd-details-editor-webcam"
            className="m-1"
            defaultChecked={quiz.webcamRequired}
            onChange={(e) =>
              setQuiz({ ...quiz, webcamRequired: e.target.value })
            }
          />
          <FormCheck
            type="checkbox"
            label="Lock Questions After Answering"
            id="wd-details-editor-lqaa"
            className="m-1"
            defaultChecked={quiz.lockQuestions}
            onChange={(e) =>
              setQuiz({ ...quiz, lockQuestions: e.target.value })
            }
          />
        </Col>
      </Row>
      <Row className="m-1">
        <Col className="col-3 text-end">Show Correct Answers</Col>
        <Col className="col-9 w-50">
          <FormSelect
            defaultValue={quiz.showCorrect}
            className="m-1"
            onChange={(e) => setQuiz({ ...quiz, showCorrect: e.target.value })}
          >
            <option value="NEVER">Never</option>
            <option value="IMMEDIATELY">Immediately</option>
          </FormSelect>
        </Col>
      </Row>
      <Row className="m-1">
        <Col className="col-3 text-end">Access Code</Col>
        <Col className="col-9 w-50">
          <FormControl
            defaultValue={quiz.accessCode}
            className="m-1"
            onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
          />
        </Col>
      </Row>
      <Row className="m-1 mt-2">
        <Col className="col-3 text-end">Assign</Col>
        <Col className="col-9">
          <Container className="border rounded p-3">
            <label htmlFor="wd-assign-to" className="form-label">
              <b>Assign To</b>
            </label>
            <input
              disabled
              id="wd-assign-to"
              defaultValue="Everyone"
              className="form-control mb-4"
            />
            <label htmlFor="wd-due-date" className="form-label">
              <b>Due</b>
            </label>{" "}
            <br />
            <input
              type="date"
              id="wd-due-date"
              value={quiz.due.slice(0, 10) || ""}
              className="form-control mb-4"
              onChange={(e) => setQuiz({ ...quiz, due: e.target.value })}
            />
            <Row>
              <Col>
                <label htmlFor="wd-available-from" className="form-label">
                  <b>Available from</b>
                </label>
                <input
                  type="date"
                  id="wd-available-from"
                  value={quiz.availableFrom.slice(0, 10) || ""}
                  className="form-control"
                  onChange={(e) =>
                    setQuiz({ ...quiz, availableFrom: e.target.value })
                  }
                />
              </Col>
              <Col>
                <label htmlFor="wd-available-until" className="form-label">
                  <b>Until</b>
                </label>
                <input
                  type="date"
                  id="wd-available-until"
                  value={quiz.availableUntil.slice(0, 10) || ""}
                  className="form-control col-md-6"
                  onChange={(e) =>
                    setQuiz({ ...quiz, availableUntil: e.target.value })
                  }
                />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <div id="wd-submission-buttons" className="mt-2 me-1 float-end">
        <Button
          className="me-2"
          variant="danger"
          onClick={() => {
            updateQuiz(quiz);
            redirect(`/Courses/${cid}/Quizzes/${qid}/Details`);
          }}
        >
          Save
        </Button>
        <Button
          className="me-2"
          variant="danger"
          onClick={() => {
            updateQuiz({... quiz, published: true});
            redirect(`/Courses/${cid}/Quizzes/`);
          }}
        >
          Save and Publish
        </Button>
        <Button
          className="me-2"
          variant="secondary"
          href={`/Courses/${cid}/Quizzes`}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
