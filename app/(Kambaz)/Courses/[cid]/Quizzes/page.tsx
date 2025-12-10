/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";
import { redirect, useParams } from "next/navigation";
import { setQuizzes } from "./reducer";
import Link from "next/link";
import QuizControls from "./QuizControls";

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
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
  const [attempts, setAttempts] = useState<any[]>([]);
  const dispatch = useDispatch();
  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  const getAvailability = (quiz: any) => {
    const from = new Date(quiz.availableFrom);
    const until = new Date(quiz.availableUntil);
    const current = new Date();
    if (current.getTime() > until.getTime()) {
      return "Closed";
    } else if (
      current.getTime() <= until.getTime() &&
      current.getTime() >= from.getTime()
    ) {
      return "Available";
    }
    return `Not available until ${from.toString().slice(10)}`;
  };
  const getDueString = (quiz: any) => {
    if (quiz.due) {
      return `${quiz.due.slice(0, 10)} at ${quiz.due.slice(11, 16)}`;
    }
    return "";
  };
  const createQuiz = async () => {
    const quiz = await client.createQuiz(cid as string);
    dispatch(setQuizzes([...quizzes, quiz]));
    redirect(`/Courses/${cid}/Quizzes/${quiz._id}/Details`);
  };
  const deleteQuiz = async (quizId: string) => {
    await client.deleteQuiz(cid as string, quizId);
    dispatch(setQuizzes(quizzes.filter((quiz: any) => quiz._id != quizId)));
  };
  const fetchMyAttempts = async () => {
    const myAttempts = await client.getAttemptsForUser(
      cid as string,
      (currentUser as any)._id
    );
    setAttempts(myAttempts);
  };
  const getAttempts = (quiz: any) => {
    if (!attempts) {
      return quiz.attempts;
    }
    const attemptsTaken = (attempts as any).filter(
      (attempt: any) => attempt.quiz === quiz._id
    ).length;

    return quiz.attempts - attemptsTaken;
  };
  const getScore = (quiz: any) => {
    if (!attempts) {
      return "?";
    }
    const scoresForQuiz = (attempts as any)
      .filter((attempt: any) => attempt.quiz === quiz._id)
      .map((attempt: any) => attempt.score);
    if (scoresForQuiz.length === 0) {
      return "?";
    }

    return Math.max(...scoresForQuiz);
  };
  useEffect(() => {
    fetchQuizzes();
    fetchFaculty();
    fetchMyAttempts();
  }, [currentUser]);
  return (
    <div id="wd-quizzes">
      {isFaculty && (
        <Button
          className="btn-danger float-end me-2 btn-lg"
          onClick={createQuiz}
        >
          <FaPlus className="position-relative me-2" />
          Quiz
        </Button>
      )}
      <br /> <br /> <br />
      <ListGroup id="wd-quizzes-list" className="rounded-0">
        <ListGroupItem className="p-0 mb-5 fs-5">
          <div className="border-gray bg-secondary p-3">
            <BsGripVertical className="fs-3 float-start" />
            <IoMdArrowDropdown className="me-2 fs-2 float-start" />
            QUIZZES
          </div>
          <ListGroup id="wd-quiz-list" className="rounded-0">
            {(isFaculty
              ? quizzes
              : quizzes.filter((quiz: any) => quiz.published)
            )
              .toSorted((a: any, b: any) => {
                const dateA = new Date(a.availableFrom);
                const dateB = new Date(b.availableFrom);
                if (dateA < dateB) {
                  return -1;
                } else if (dateA > dateB) {
                  return 1;
                }
                return 0;
              })
              .map((quiz: any) => (
                <ListGroupItem key={quiz._id}>
                  {isFaculty && (
                    <QuizControls
                      quiz={quiz}
                      fetchQuizzes={fetchQuizzes}
                      deleteQuiz={deleteQuiz}
                    />
                  )}
                  <div id="wd-quiz-info" className="float-start">
                      <Link
                        href={`/Courses/${cid}/Quizzes/${quiz._id}/${
                          isFaculty ? "Details" : "Results"
                        }`}
                        className="text-decoration-none text-dark fs-4"
                        // onClick={(e) => !(isFaculty || getAttempts(quiz) > 0) ? e.preventDefault() : ""}
                      >
                        {quiz.title}
                      </Link>
                    <br />
                    <span className="text-secondary">
                      {getAvailability(quiz)} | Due {getDueString(quiz)} |{" "}
                      {quiz.points} pts | {quiz.questions.length} Questions
                    </span>
                    {!isFaculty && (
                      <span className="text-danger">
                        {" "}
                        | {getAttempts(quiz)} Attempts Left | Current Score:{" "}
                        {getScore(quiz)}
                      </span>
                    )}
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
