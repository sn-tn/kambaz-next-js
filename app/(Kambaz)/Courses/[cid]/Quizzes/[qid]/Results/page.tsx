"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, useParams } from "next/navigation";
import { Button } from "react-bootstrap";
import * as client from "../../../../client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import QuestionResult from "./QuestionResult";

export default function QuizResultsPage() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState();
  const [answers, setAnswers] = useState();
  const [recentAttempt, setRecentAttempt] = useState<any>();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  // const [isFaculty, setIsFaculty] = useState(false);
  // const fetchFaculty = () => {
  //   if (!currentUser) return;
  //   if ((currentUser as any).role === "FACULTY") {
  //     setIsFaculty(true);
  //   }
  // };
  const fetchQuiz = async () => {
    const quiz = await client.fetchQuizById(cid as string, qid as string);
    setQuiz(quiz);
  };
  const takeQuiz = async () => {
    const attempts = await remainingAttempts();
    if (attempts > 0) {
      redirect(`/Courses/${cid}/Quizzes/${qid}/Preview`);
    } else {
      alert("Not enough attempts left!");
    }
  };
  const remainingAttempts = async () => {
    const attempts = await client.getAttemptsCountForUser(
      cid as string,
      qid as string,
      (currentUser as any)._id
    );
    return (quiz as any).attempts - attempts;
  };
  const fetchRecentAttempt = async () => {
    const attempts = await client.getAttemptsForUser(
      cid as string,
      (currentUser as any)._id
    );
    if (attempts.length > 0) {
      let mostRecent = attempts[0];
      for (let i = 0; i < attempts.length; i++) {
        if (new Date(attempts[i].time) > new Date(mostRecent.time)) {
          mostRecent = attempts[i];
        }
      }
      setRecentAttempt(mostRecent);
    }
  };
  const getAnswerForQuestion = (qid: string) => {
    return recentAttempt.answers[qid];
  };
  useEffect(() => {
    fetchQuiz();
    fetchRecentAttempt();
  }, []);
  if (!quiz) {
    return (
      <div>
        <h4>Loading</h4>
      </div>
    );
  }
  return (
    <div id="wd-quiz-results">
      <div id="wd-quiz-preview-info" className="border mb-2">
        <h2>{(quiz as any).title}</h2>
        <div className="border rounded-1 m-1 p-2">
          <h4>Quiz Description:</h4>
          <div className="text-secondary">{(quiz as any).description}</div>
        </div>
      </div>
      <Button className="m-1" onClick={takeQuiz}>
        Take Quiz
      </Button>
      {(!recentAttempt || recentAttempt.answers.length === 0) && (
        <div>Take the quiz!</div>
      )}
      {recentAttempt && (
        <div>
          Previous Score: {recentAttempt.score}
          {(quiz as any).questions.map((question: any) => (
            <QuestionResult
              key={question._id}
              question={question}
              answer={getAnswerForQuestion(question._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
