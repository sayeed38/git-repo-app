import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Repos from "./components/repos";
import Home from "./components/Home";
import RepoDetail from "./components/repoDetail";
import Followers from "./components/followers";


function App() {
  const [username, setUsername] = React.useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  }

  return (
    <div className="App">
    <Switch>
      <Route path="/repos/:userId/followers" component={Followers}/>
      <Route path="/repos/:userId/:reponame" component={RepoDetail}/>
      <Route path="/repos/:username" component={Repos}/>
      <Route path="/">
        <Home username={username} handleChange={handleChange}/>
      </Route>
      <Route component={Error}/>
    </Switch>
    </div> 
  )
}

export default App;
