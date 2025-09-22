export default function Modules() {
  return(
    <div>
      <button>Collapse All</button>
      <button>View Progress</button>
      <select id="wd-modules-dropdown">
        <option>Publish All</option>
      </select>
      <button>+ Module</button>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <span className="wd-title">LEARNING OBJECTIVES</span>
            <ul className="wd-lesson">
              <li className="wd-content-item">Introduction to the course</li>
              <li className="wd-content-item">Learn what is Web Development</li>
            </ul>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <span className="wd-title">LEARNING OBJECTIVES</span>
            <ul className="wd-lesson">
              <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
              <li className="wd-content-item">Keep working on assignment 1</li>
              <li className="wd-content-item">Deploy the assignment to Netlify</li>
            </ul>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
        </li>
      </ul>
    </div>
  );
}