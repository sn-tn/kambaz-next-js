import Link from "next/link";
export default function Signin() {
  return (
    <div>
      <h3>Signin</h3>
      <input placeholder="username" className="form-control mb-2" />
      <input placeholder="password" type="password" className="form-control mb-2" />
      <Link href="/Dashboard" className="btn btn-primary w-100 mb-2"> Signin </Link> <br />
      <Link href="Signup"> Signup </Link>
    </div>
  )
}