import React from "react";
import axios from "axios";

function Followers(props) {
  const URL = props.location.state.data;
  const [followers, setFollowers] = React.useState([]);

  React.useEffect(() => {
    async function getFollowers() {
      let response;
      try {
        response = await axios.get(URL);
        setFollowers(response.data);
      } catch (error) {
        console.log("Not found");
      }
    }

    getFollowers();
  }, [URL]);

  const handleClick = (username) => {
    props.history.push("/repos/" + username);
  };

  return (
    <div style={{ margin: "5px" }}>
      <h5>Followers of {props.match.params.userId}</h5>
      <div className="parent-container">
        {followers.length > 0
          ? followers.map((repo) => (
              <div
                key={repo.id}
                className="card-container"
                onClick={() => handleClick(repo.login)}
              >
                <img
                  className="repo-pic"
                  src={`${repo.avatar_url}`}
                  alt={"Repo"}
                />
                <div className="right-section">
                  <h5 className={"repo__name"}>{repo.login}</h5>
                </div>
              </div>
            ))
          : "No Followers"}
      </div>
    </div>
  );
}

export default Followers;
