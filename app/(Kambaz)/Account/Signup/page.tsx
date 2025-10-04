import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Signup</h3>
      <input placeholder="username" className="wd-username form-control mb-2" />
      <input placeholder="password" type="password" className="wd-password form-control mb-2" />
      <Link href="Profile" className="btn btn-primary w-100 mb-2"> Signup </Link> <br />
      <Link href="Signin"> Signin </Link>
    </div>
  );
}
