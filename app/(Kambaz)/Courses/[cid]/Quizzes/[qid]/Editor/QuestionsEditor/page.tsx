/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import * as client from "../../../../../client";
import QuestionsMenu from "./QuestionsMenu";

export default function QuizQuestionsEditor() {
  const [questions, setQuestions] = useState<any[]>();
  const { cid, qid } = useParams();
  const fetchQuestions = async () => {
    const questions = await client.fetchQuestionsForQuiz(
      cid as string,
      qid as string
    );
    setQuestions(questions);
  };
  const createQuestion = async () => {
    const question = await client.createQuestionForQuiz(
      cid as string,
      qid as string
    );
    setQuestions([...(questions as any[]), question]);
    fetchQuestions();
  };
  const deleteQuestion = async (questionId: string) => {
    await client.deleteQuestion(cid as string, qid as string, questionId);
    fetchQuestions();
  }
  useEffect(() => {
    fetchQuestions();
  }, []);
  if (!questions) {
    return (
      <div>
        <h4>Loading</h4>
      </div>
    );
  }
  return (
    <div id="wd-quiz-questions-editor">
      <div className="text-center mt-2">
        <Button variant="secondary" size="lg" onClick={createQuestion}>
          <FaPlus className="fs-6" /> Question
        </Button>
      </div>
      <ListGroup id="wd-questions" className="m-2">
        {(questions as any).map((question: any) => (
          <ListGroupItem key={question._id} className="border rounded-0">
            <div><QuestionsMenu question={question} deleteQuestion={deleteQuestion}/></div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
