import { redirect } from "next/navigation"; 

export default async function Courses({ params, }: { params: Promise<{ cid: string }>; }) {
  const { cid } = await params;
  redirect(`/Courses/${cid}/Home`);
}