import React from "react";
import axios from "axios";
import { markdown } from "markdown";

function RepoDetail(props) {
  const data = props.location.state.data;
  const [readMeData, setReadMeData] = React.useState({});

  React.useEffect(() => {
    async function getData() {
      const { userId, reponame } = props.match.params;
      let response;
      try {
        response = await axios.get(
          `https://api.github.com/repos/${userId}/${reponame}/readme`
        );
        console.log(response);
        setReadMeData(response.data);
      } catch (error) {
        setReadMeData({});
      }

      //console.log(data);

      return data;
    }

    getData();
  }, []);

  return (
    <div className="repoRoot">
      {data
        .filter((repo) => repo.name === props.match.params.reponame)
        .map((repo) => (
          <div key={repo.id} className="left-section">
            <div className="repoDetailImg">
              {console.log(repo.owner.avatar_url)}
              <span
                className="repoDetailMedia"
                style={{
                  backgroundImage: "url(" + repo.owner.avatar_url + ")",
                }}
              ></span>
            </div>
            <div className="repo-tags">
              <h5 style={{ marginTop: "0px" }}>Verified by Github</h5>
              <p style={{ marginTop: "0px" }}>
                Github confirms that this app meets the{" "}
                <span style={{ color: "blue" }}>
                  requirements for verification
                </span>
              </p>
              <div>
                <h6>Categories</h6>
                <div class="categories">
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
            <>
              <h5 style={{ color: "rgb(90, 95, 90)" }}>Application</h5>
              <h2 className="repoName">{repo.name}</h2>
              <button class="repo-button">Set up a plan</button>
            </>
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
