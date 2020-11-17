import React from "react";
import { withRouter } from "react-router-dom";

function Home(props) {
  async function handleClick() {
    props.history.push("/repos/" + props.username);
  }
  return (
    <div>
      <input type="text" onChange={props.handleChange} value={props.username} />
      <button type="submit" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
}

export default withRouter(Home);
