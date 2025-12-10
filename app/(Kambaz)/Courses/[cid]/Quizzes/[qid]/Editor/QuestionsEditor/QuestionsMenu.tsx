"use client";
import { useState } from "react";
import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import * as client from "../../../../../client";
import { useParams } from "next/navigation";
import { FaTrash } from "react-icons/fa";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function QuestionsMenu({
  question,
  deleteQuestion,
  fetchQuestions,
}: {
  question: any;
  deleteQuestion: (questionId: string) => void;
  fetchQuestions: () => void;
}) {
  const { cid, qid } = useParams();
  const [showEdit, setShowEdit] = useState(false);
  const [questionUpdates, setQuestionUpdates] = useState(question);
  const fetchQuestion = async () => {
    const fetchedQuestion = await client.fetchQuestionById(
      cid as string,
      qid as string,
      question._id
    );
    setQuestionUpdates(fetchedQuestion);
  };
  const updateQuestion = async () => {
    console.log(questionUpdates);
    await client.updateQuestion(
      cid as string,
      qid as string,
      question._id as string,
      questionUpdates
    );
    fetchQuestions();
  };
  const deleteLastChoice = () => {
    const { choices } = questionUpdates;
    choices.pop();
    setQuestionUpdates({
      ...questionUpdates,
      choices: choices,
    });
  };
  const deleteLastAnswer = () => {
    const { answers } = questionUpdates;
    answers.pop();
    setQuestionUpdates({
      ...questionUpdates,
      answers: answers,
    });
  };
  const changeAnswer = (answer: string) => {
    setQuestionUpdates({ ...questionUpdates, answers: [answer] });
  };
  const changeAnswerAtIndex = (index: number, newAnswer: string) => {
    const { answers } = questionUpdates;
    answers[index] = newAnswer;
    setQuestionUpdates({ ...questionUpdates, answers: answers });
  };

  return (
    <div id="wd-questions-menu">
      {!showEdit && (
        <div className="p-2">
          {question.title}
          <Button
            variant="secondary"
            className="float-end"
            onClick={() => {
              setShowEdit(!showEdit);
              fetchQuestion();
            }}
          >
            <FaPencil className="text-white me-2" />
            Edit
          </Button>
        </div>
      )}
      {showEdit && (
        <div className="mt-2">
          <Row>
            <Col className="col-3">
              <FormControl
                defaultValue={questionUpdates.title}
                onChange={(e) =>
                  setQuestionUpdates({
                    ...questionUpdates,
                    title: e.target.value,
                  })
                }
              />
            </Col>
            <Col className="col-5">
              <FormSelect
                defaultValue={questionUpdates.questionType}
                onChange={(e) =>
                  setQuestionUpdates({
                    ...questionUpdates,
                    questionType: e.target.value,
                  })
                }
              >
                <option value="MC">Multiple Choice</option>
                <option value="TF">True/False</option>
                <option value="FITB">Fill In The Blank</option>
              </FormSelect>
            </Col>
            <Col className="col-4">
              <Row>
                <Col className="text-end">
                  <FormLabel className="fs-5" htmlFor="wd-question-points">
                    pts:
                  </FormLabel>
                </Col>
                <Col>
                  <FormControl
                    id="wd-question-points"
                    type="number"
                    defaultValue={questionUpdates.points}
                    onChange={(e) =>
                      setQuestionUpdates({
                        ...questionUpdates,
                        points: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />
          {questionUpdates.questionType === "MC" && (
            <div id="wd-question-editor-mc">
              <FormLabel htmlFor="wd-question-description">Question:</FormLabel>
              <FormControl
                id="wd-question-description"
                as="textarea"
                className="m-1 mb-2"
                defaultValue={questionUpdates.description}
                onChange={(e) => setQuestionUpdates({...questionUpdates, description: e.target.value})}
              />
              <FormGroup>
                <FormLabel>Answers</FormLabel>
                {questionUpdates.choices.map((choice: any, index: number) => (
                  <div key={index}>
                    <FormCheck
                      label={`Choice ${index}`}
                      type="radio"
                      name="Choices"
                      onChange={() => changeAnswer(choice)}
                      defaultChecked={questionUpdates.answers.some(
                        (answer: string) => choice === answer
                      )}
                    />
                    <FormControl
                      as="textarea"
                      defaultValue={choice}
                      onChange={(e) => {
                        const newChoices = [...questionUpdates.choices];
                        newChoices[index] = e.target.value;
                        setQuestionUpdates({...questionUpdates, choices: newChoices});
                      }}
                    />
                  </div>
                ))}
              </FormGroup>
              <Button
                className="m-1"
                onClick={() =>
                  setQuestionUpdates({
                    ...questionUpdates,
                    choices: [
                      ...questionUpdates.choices,
                      `New Choice ${questionUpdates.choices.length}`,
                    ],
                  })
                }
              >
                + Another Answer
              </Button>
              <Button variant="danger" onClick={deleteLastChoice}>
                <FaTrash className="fs-6 me-2" />
                Delete Last Choice
              </Button>
            </div>
          )}

          {questionUpdates.questionType === "TF" && (
            <div id="wd-question-editor-tf">
              <FormLabel htmlFor="wd-question-description">Question:</FormLabel>
              <FormControl
                id="wd-question-description"
                as="textarea"
                className="m-1 mb-2"
                defaultValue={questionUpdates.description}
                onChange={(e) => setQuestionUpdates({...questionUpdates, description: e.target.value})}
              />
              <FormGroup>
                <FormLabel>Answers</FormLabel>
                <FormCheck
                  label="True"
                  type="radio"
                  name="Choices"
                  onChange={() => changeAnswer("True")}
                  defaultChecked={questionUpdates.answers.some(
                    (answer: string) => answer === "True"
                  )}
                />
                <FormCheck
                  label="False"
                  type="radio"
                  name="Choices"
                  onChange={() => changeAnswer("False")}
                  defaultChecked={questionUpdates.answers.some(
                    (answer: string) => answer === "False"
                  )}
                />
              </FormGroup>
            </div>
          )}

          {questionUpdates.questionType === "FITB" && (
            <div id="wd-question-editor-fitb">
              <FormLabel htmlFor="wd-question-description">Question:</FormLabel>
              <FormControl
                id="wd-question-description"
                as="textarea"
                className="m-1 mb-2"
                defaultValue={questionUpdates.description}
                onChange={(e) => setQuestionUpdates({...questionUpdates, description: e.target.value})}
              />
              <FormGroup>
                <FormLabel>Answers</FormLabel>
                {questionUpdates.answers.map((answer: any, index: number) => (
                  <div key={index}>
                    <FormLabel htmlFor={`wd-fitb-answer-${index}`}>
                      Possible Answer
                    </FormLabel>
                    <FormControl
                      id={`wd-fitb-answer-${index}`}
                      as="textarea"
                      defaultValue={answer}
                      onChange={(e) =>
                        changeAnswerAtIndex(index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </FormGroup>
              <Button
                className="m-1"
                onClick={() =>
                  setQuestionUpdates({
                    ...questionUpdates,
                    answers: [
                      ...questionUpdates.answers,
                      `New Answer ${questionUpdates.answers.length}`,
                    ],
                  })
                }
              >
                + Another Answer
              </Button>
              <Button variant="danger" onClick={deleteLastAnswer}>
                <FaTrash className="fs-6 me-2" />
                Delete Last Choice
              </Button>
            </div>
          )}

          <Button
            variant="danger"
            className="float-end me-2"
            onClick={() => {
              updateQuestion();
              setShowEdit(!showEdit);
            }}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            className="float-end me-2"
            onClick={() => {
              setShowEdit(!showEdit);
              fetchQuestion();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteQuestion(question._id);
              setShowEdit(false);
            }}
          >
            <FaTrash className="fs-6 me-2" />
            Delete Question
          </Button>
        </div>
      )}
    </div>
  );
}
