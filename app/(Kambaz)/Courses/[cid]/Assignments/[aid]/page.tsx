export default function AssignmentEditor() {
  return (
    <div id="wd-assignment-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /> <br /> <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of your Web application running on Netlify.
        The landing page should include he following: Your full name and section Links to each of the lab assignments
        Link to the Kambaz application Links to all relevant source code repositories The Kambaz application should include
        a link to navigate back to the landing page.
      </textarea> <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </ td>
            <td>
              <input id="wd-points" type="number" defaultValue={100} />
            </td>
          </tr>
          <tr >
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="PERCENTAGE">Percentage</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="ONLINE">Online</option>
              </select> <br />
              <h4>Online Entry Options</h4>
              <input type="checkbox" name="wd-online-type" id="wd-text-entry" />
              <label htmlFor="wd-text-entry">Text</label> <br />
              <input type="checkbox" name="wd-online-type" id="wd-website-url" />
              <label htmlFor="wd-website-url">Website URL</label> <br />
              <input type="checkbox" name="wd-online-type" id="wd-media-recordings" />
              <label htmlFor="wd-media-recordings">Media Recordings</label> <br />
              <input type="checkbox" name="wd-online-type" id="wd-student-annotations" />
              <label htmlFor="wd-student-annotations">Student Annotations</label> <br />
              <input type="checkbox" name="wd-online-type" id="wd-file-uploads" />
              <label htmlFor="wd-file-uploads">File Uploads</label> <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label>Assign</label>
            </td>
            <td>
              <label htmlFor="wd-assign-to">Assign To</label> <br />
              <input id="wd-assign-to" defaultValue="Everyone" /> <br /> <br />
              <label htmlFor="wd-due-date">Due</label> <br />
              <input type="date" id="wd-due-date" defaultValue="2024-05-13" /> <br /> <br />
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="wd-available-from">Available from</label>
                    </td>
                    <td>
                      <label htmlFor="wd-available-until">Until</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="date" id="wd-available-from" defaultValue="2024-05-06"/>
                    </td>
                    <td>
                      <input type="date" id="wd-available-until" defaultValue="2024-05-20" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}