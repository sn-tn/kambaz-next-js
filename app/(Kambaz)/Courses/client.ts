/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};
export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};
export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}/`);
  return data;
};
export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
export const createModulesForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};
export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return response.data;
};
export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};

export const findMyEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/current`);
  return data;
};
export const enrollUserInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/current/courses/${courseId}`
  );
  return response.data;
};
export const unenrollUserInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/current/courses/${courseId}`
  );
  return data;
};

export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};
export const updateQuiz = async (courseId: string, quiz: any) => {
  const response = await axios.put(
    `${COURSES_API}/${courseId}/quizzes/${quiz._id}`,
    quiz
  );
  return response.data;
};
export const createQuiz = async (courseId: string) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};
export const deleteQuiz = async (courseId: string, quizId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`
  );
  return response.data;
};
export const fetchQuizById = async (courseId: string, quizId: string) => {
  const response = await axios.get(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`
  );
  return response.data;
};
export const fetchQuestionsForQuiz = async (
  courseId: string,
  quizId: string
) => {
  const response = await axios.get(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/questions`
  );
  return response.data;
};
export const createQuestionForQuiz = async (
  courseId: string,
  quizId: string
) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/questions`
  );
  return response.data;
};
// export const deleteQuestionForQuiz
export const fetchQuestionById = async (
  courseId: string,
  quizId: string,
  questionId: string
) => {
  const response = await axios.get(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${questionId}`
  );
  return response.data;
};
export const updateQuestion = async (
  courseId: string,
  quizId: string,
  questionId: string,
  questionUpdates: any
) => {
  const response = await axios.put(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${questionId}`,
    questionUpdates
  );
  return response.data;
};
export const deleteQuestion = async (
  courseId: string,
  quizId: string,
  questionId: string
) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${questionId}`
  );
  return response.data;
};

export const createAttempt = async (
  courseId: string,
  quizId: string,
  userId: string,
  score: number
) => {
  const scoreJSON = {score: score};
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes/${quizId}/users/${userId}`, scoreJSON);
  return response.data;
};

export const getAttemptsCountForUser = async (courseId: string, quizId:string, userId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/users/${userId}/count`);
  return response.data;
}
export const getAttemptsForUser = async (courseId: string, userId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes/user/${userId}`);
  return response.data;
}