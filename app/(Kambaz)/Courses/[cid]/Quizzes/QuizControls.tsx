/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoEllipsisVertical } from "react-icons/io5";
import { TiCancel } from "react-icons/ti";
import GreenCheckmark from "./GreenCheckmark";
import * as client from "../../client";
import { useState } from "react";
import { Dropdown, DropdownButton, DropdownItem } from "react-bootstrap";
import { redirect, useParams } from "next/navigation";

export default function QuizControls({
  quiz,
  fetchQuizzes,
  deleteQuiz,
}: {
  quiz: any;
  fetchQuizzes: () => void;
  deleteQuiz: (quizId: string) => void;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const togglePublish = async () => {
    await client.updateQuiz(quiz._id, { ...quiz, published: !quiz.published });
    fetchQuizzes();
  };

  return (
    <div id="wd-quiz-controls" className="float-end">
      {openMenu && (
        <Dropdown>
          <DropdownItem href={`./Quizzes/${quiz._id}/Details`}>
            Edit
          </DropdownItem>
          <DropdownItem onClick={() => deleteQuiz(quiz._id)}>
            Delete
          </DropdownItem>
          <DropdownItem onClick={togglePublish}>
            {quiz.published ? "Unpublish" : "Publish"}
          </DropdownItem>
        </Dropdown>
      )}
      <IoEllipsisVertical
        className="float-end fs-5 mt-2 dropdown"
        onClick={() => setOpenMenu(!openMenu)}
      />
      {quiz.published ? (
        <GreenCheckmark onToggle={togglePublish} />
      ) : (
        <TiCancel className="text-danger fs-3 mt-1" onClick={togglePublish} />
      )}
    </div>
  );
}
