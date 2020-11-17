import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

function Repos(props) {
  //const history = useHistory();

  const userName = props.match.params.username;
  //console.log(userName);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData(userName) {
      let response = null;
      try {
        response = await axios.get(
          `https://api.github.com/users/${userName}/repos`
        );
        //console.log(response.data);
        setData(response.data);
      } catch (error) {
        setData([]);
      }
      //return response.data;
    }
    getData(userName);
  }, []);

  const handleClick = (name) => {
    props.history.push({
      pathname: `/repos/${userName}/${name}`,
      state: { data: data },
    });
  };

  const routeFollowers = () => {
    props.history.push({
      pathname: `/${userName}/followers`,
      state: { data: data[0].owner.followers_url },
    });
  };

  return (
    <div style={{ height: "100%" }}>
      <div className="userInfo">
        {data.length > 0 && (
          <>
            <h3 className="userID">{data[0].owner.login}</h3>
            <h6 className="totalrepo">Total Repositories: {data.length}</h6>
            <h6 className="routefollowers" onClick={routeFollowers}>
              Followers
            </h6>
          </>
        )}
      </div>
      <div className="parent-container">
        {data.length > 0 &&
          data.map((repo) => (
            <div
              key={repo.name}
              className="card-container"
              onClick={() => handleClick(repo.name)}
            >
              <img
                className="repo-pic"
                src={`${repo.owner.avatar_url}`}
                alt={"Repo"}
              />
              <div className="right-section">
                <h5 className={"repo__name"}>{repo.name}</h5>
                <p className="repoDesc">
                  {repo.description && repo.description.length > 200
                    ? `${repo.description.substring(0, 120)}....`
                    : repo.description}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Repos;
