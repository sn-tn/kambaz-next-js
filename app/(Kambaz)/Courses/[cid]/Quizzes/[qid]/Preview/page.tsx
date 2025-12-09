"use client";
import { redirect, useParams } from "next/navigation";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as client from "../../../../client";
import {
  Button,
  Col,
  FormCheck,
  FormControl,
  Row,
} from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quiz, setQuiz] = useState<any>();
  const [quizLength, setQuizLength] = useState(0);
  const [answers, setAnswers] = useState<{ [qid: string]: string }>({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [isFaculty, setIsFaculty] = useState(false);
  const fetchFaculty = () => {
    if (!currentUser) return;
    if ((currentUser as any).role === "FACULTY") {
      setIsFaculty(true);
    }
  };
  const fetchQuizById = async () => {
    const quiz = await client.fetchQuizById(cid as string, qid as string);
    setQuiz(quiz);
    setQuizLength(quiz.questions.length);
  };
  const incrementQuestion = () => {
    if (currentQuestion < quizLength - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const decrementQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const calcScore = () => {
    let score = 0;

    for (const question of quiz.questions) {
      const questionId: string = question._id;
      const selected = answers[questionId];

      if (selected && question.answers.includes(selected)) {
        score += question.points;
      }
    }
    setScore(score);
    return score;
  };
  const submitAttempt = async (score: number) => {
    await client.createAttempt(
      cid as string,
      qid as string,
      (currentUser as any)._id,
      score
    );
    redirect(`/Courses/${cid}/Quizzes`);
  };
  useEffect(() => {
    fetchQuizById();
    fetchFaculty();
  }, []);
  if (!quiz) {
    return (
      <div>
        <h4>Loading</h4>
      </div>
    );
  }
  return (
    <div id="wd-quiz-preview">
      {isFaculty && (
        <Button
          variant="secondary"
          href={`/Courses/${cid}/Quizzes/${qid}/Editor/QuestionsEditor`}
        >
          <FaPencil />
          Edit
        </Button>
      )}
      <div id="wd-quiz-preview-question" className="border bg-light">
        <Row id="wd-quiz-preview-header" className="bg-secondary m-1 p-2">
          <Col className="col-6">{quiz.questions[currentQuestion].title}</Col>
          <Col className="col-6 text-end">
            {quiz.questions[currentQuestion].points} pts
          </Col>
        </Row>
        <Row id="wd-quiz-preview-content" className="m-1 p-2">
          <div>{quiz.questions[currentQuestion].description}</div>
        </Row>
        {quiz.questions[currentQuestion].questionType === "MC" && (
          <Row id="wd-quiz-preview-answers-mc" className="m-1 ps-2">
            {quiz.questions[currentQuestion].choices.map((choice: any) => (
              <div key={choice}>
                <FormCheck
                  name="choices"
                  type="radio"
                  label={choice}
                  onChange={() => {
                    const questionId = quiz.questions[currentQuestion]._id;
                    setAnswers({ ...answers, [questionId]: choice });
                  }}
                />
              </div>
            ))}
          </Row>
        )}

        {quiz.questions[currentQuestion].questionType === "TF" && (
          <Row id="wd-quiz-preview-answers-mc" className="m-1 ps-2">
            <div>
              <FormCheck
                name="choices"
                type="radio"
                label="True"
                onChange={() => {
                  const questionId = quiz.questions[currentQuestion]._id;
                  setAnswers({ ...answers, [questionId]: "True" });
                }}
              />
              <FormCheck
                name="choices"
                type="radio"
                label="False"
                onChange={() => {
                  const questionId = quiz.questions[currentQuestion]._id;
                  setAnswers({ ...answers, [questionId]: "False" });
                }}
              />
            </div>
          </Row>
        )}

        {quiz.questions[currentQuestion].questionType === "FITB" && (
          <Row id="wd-quiz-preview-answers-mc" className="m-1 ps-2">
            <div>
              <FormControl
                as="textarea"
                onChange={(e) => {
                  const questionId = quiz.questions[currentQuestion]._id;
                  setAnswers({ ...answers, [questionId]: e.target.value });
                }}
              />
            </div>
          </Row>
        )}
      </div>
      {currentQuestion < quizLength - 1 && (
        <Button
          variant="secondary"
          className="float-end"
          onClick={incrementQuestion}
        >
          Next
        </Button>
      )}
      {currentQuestion > 0 && (
        <Button
          variant="secondary"
          className="float-start"
          onClick={decrementQuestion}
        >
          Prev
        </Button>
      )}
      <br /> <br />
      {!isFaculty && (
        <Button
          className="m-2 float-end"
          onClick={() => {
            const score = calcScore();
            submitAttempt(score);
          }}
        >
          Submit
        </Button>
      )}
      {isFaculty && (
        <Button
          className="m-2 float-end"
          onClick={() => {
            setShowScore(true);
            calcScore();
          }}
        >
          Submit
        </Button>
      )}
      {showScore && `Score: ${score}`}
    </div>
  );
}
