"use client";
import { redirect, useParams } from "next/navigation";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  redirect(`/Courses/${cid}/Quizzes/${qid}/Editor/DetailsEditor`);
}
