import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return(
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Public Courses (3)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="react course image"/>
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/2000" className="wd-dashboard-course-link">
            <Image src="/images/algo.jpg" width={200} height={150} alt="algo course image" />
            <div>
              <h5>CS2000 Algorithms</h5>
              <p className="wd-dashboard-course-title">
                Learn how to use algorithms and data structures to improve programs
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/2100" className="wd-dashboard-course-link">
            <Image src="/images/systems.jpg" width={200} height={150} alt="systems course image" />
            <div>
              <h5>CS2100</h5>
              <p className="wd-dashboard-course-title">
                Low level programming
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}