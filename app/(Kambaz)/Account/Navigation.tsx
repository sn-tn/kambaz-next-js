import Link from "next/link";

export default function AccountNavigation() {
  return(
    <div id="wd-account-navigation">
      <Link href="Signin">Sign in</Link> <br />
      <Link href="Signup">Sign up</Link> <br />
      <Link href="Profile">Profile</Link> <br />
    </div>
  );
}