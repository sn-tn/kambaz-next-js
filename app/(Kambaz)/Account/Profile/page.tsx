import Link from "next/link";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <input defaultValue="alice" placeholder="username" className="wd-username form-control mb-2" />
      <input defaultValue="123" placeholder="password" className="wd-password form-control mb-2" />
      <input defaultValue="Alice" placeholder="First Name" id="wd-firstname" className="form-control mb-2" />
      <input defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" className="form-control mb-2" />
      <input type="date" id="wd-dob" className="form-control mb-2" />
      <input defaultValue="alice@wonderland.com" type="email" id="wd-email" className="form-control mb-2" />
      <select defaultValue="USER" id="wd-role" className="form-select mb-2">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <Link href="Signin" className="btn btn-danger w-100 mb-2">Signout</Link>
    </div>
  );
}