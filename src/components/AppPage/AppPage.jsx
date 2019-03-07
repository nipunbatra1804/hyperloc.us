import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import ExplorePage from "../ExplorePage/ExplorePage";
import AdminPage from "../AdminPage/AdminPage";

export default function AppPage() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/explore" component={ExplorePage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
