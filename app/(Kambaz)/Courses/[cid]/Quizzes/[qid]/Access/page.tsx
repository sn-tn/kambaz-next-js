/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, FloatingLabel, FormControl } from "react-bootstrap";
import * as client from "../../../../client";

export default function QuizAccess() {
  const { cid, qid } = useParams();
  const [code, setCode] = useState<string>("");
  const [quiz, setQuiz] = useState<any>();
  const fetchQuiz = async () => {
    const quiz = await client.fetchQuizById(cid as string, qid as string);
    setQuiz(quiz);
  };
  const validate = () => {
    if (quiz.accessCode === code) {
      redirect(`/Courses/${cid}/Quizzes/${qid}/Preview`);
    }
  };
  useEffect(() => {
    fetchQuiz();
  });
  if (quiz && quiz.accessCode === "") {
    validate();
  }
  return (
    <div id="wd-quiz-access">
      <FloatingLabel label="Access Code">
        <FormControl
          id="wd-access-field"
          onChange={(e) => setCode(e.target.value)}
        />
      </FloatingLabel>
      <Button as="label" htmlFor="" onClick={validate}>
        Submit
      </Button>
    </div>
  );
}
