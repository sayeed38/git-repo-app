import React from "react";
import axios from "axios";
import { markdown } from "markdown";

function RepoDetail(props) {
  const data = props.location.state.data;
  const [readMeData, setReadMeData] = React.useState({});
  const { userId, reponame } = props.match.params;

  React.useEffect(() => {
    const response = axios.get(
      `https://api.github.com/repos/${userId}/${reponame}/readme`
    );
    response.then((result) => {
      setReadMeData(result.data);
    });
  }, [userId, reponame]);

  return (
    <div className="repoRoot">
      {data
        .filter((repo) => repo.name === props.match.params.reponame)
        .map((repo) => (
          <div key={repo.id} className="left-section">
            <div key={repo.id} className="repoDetailImg">
              <span
                className="repoDetailMedia"
                style={{
                  backgroundImage: "url(" + repo.owner.avatar_url + ")",
                }}
              ></span>
            </div>
            <div key={repo.name} className="repo-tags">
              <h5 style={{ marginTop: "0px" }}>Verified by Github</h5>
              <p style={{ marginTop: "0px" }}>
                Github confirms that this app meets the{" "}
                <span style={{ color: "blue" }}>
                  requirements for verification
                </span>
              </p>
              <div key={repo.node_id}>
                <h6>Categories</h6>
                <div className="categories">
                  <span key="code">Code Review</span>
                  <span key="ide">IDEs</span>
                  <span key="free">Free</span>
                  <span key="paid">Paid</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      <div className="repoDetail-Card">
        {data
          .filter((repo) => repo.name === props.match.params.reponame)
          .map((repo) => (
            <div key={repo.id}>
              <h5 style={{ color: "rgb(90, 95, 90)" }}>Application</h5>
              <h2 className="repoName">{repo.name}</h2>
              <button className="repo-button">Set up a plan</button>
            </div>
          ))}
        {Object.keys(readMeData).length !== 0 ? (
          <div
            dangerouslySetInnerHTML={{
              __html: markdown.toHTML(window.atob(readMeData.content)),
            }}
          ></div>
        ) : null}
      </div>
    </div>
  );
}

export default RepoDetail;
