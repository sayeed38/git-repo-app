import Axios from "axios";
import React from "react";
import axios from "axios";

function Followers(props) {
  const URL = props.location.state.data;
  const [followers, setFollowers] = React.useState([]);

  React.useEffect(() => {
    async function getFollowers() {
      let response;
      try {
        response = axios.get(URL);
        console.log(response);
        setFollowers(response);
      } catch (error) {
        console.log("Not found");
      }
    }

    getFollowers();
  }, []);

  const handleClick = (username) => {
    props.history.push("/repos" + username);
  };

  return (
    <div className="follower-container">
      {followers.map((follower) => (
        <div onClick={() => handleClick(follower.username)} key={follower.id}>
          {follower.name}
        </div>
      ))}
    </div>
  );
}

export default Followers;
