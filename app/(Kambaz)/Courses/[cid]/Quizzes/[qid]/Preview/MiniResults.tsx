"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "next/navigation";
import * as client from "../../../../client";
import { useEffect, useState } from "react";
import QuestionResult from "../Results/QuestionResult";

export default function FakeResults({
  answers,
  score,
}: {
  answers: any;
  score: number;
}) {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState();
  const fetchQuiz = async () => {
    const quiz = await client.fetchQuizById(cid as string, qid as string);
    setQuiz(quiz);
  };
  const getAnswerForQuestion = (qid: string) => {
    return answers[qid];
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
    <div id="wd-quiz-results">
      Score: {score}
      {(quiz as any).questions.map((question: any) => (
        <QuestionResult
          key={question._id}
          question={question}
          answer={getAnswerForQuestion(question._id)}
        />
      ))}
    </div>
  );
}
