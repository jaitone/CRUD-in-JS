import React, { Component } from "react";
import { Container } from "reactstrap";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Home from "./Components/homePage";
import NavBar from "./Components/navbar";
import NotFound from "./Components/notFound";
import About from "./Components/about";

import SignUp from "./Components/Users/Signup";
import Login from "./Components/Users/Login";
import UserPage from "./Components/Users/UserPage";
import Profile from "./Components/Users/profile";
import LogOut from "./Components/Users/logout";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <NavBar />
        </Container>
        <BrowserRouter>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/userpage" component={UserPage} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/about" component={About} />
            <Route exact path="/logout" component={LogOut} />
            <Redirect exact path="/" to="/home" />
            <Route path="/*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
