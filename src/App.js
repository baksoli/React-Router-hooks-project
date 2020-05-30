import React from 'react';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Header from "./components/Header";
import Recipe from "./components/Recipe";
import RecipeDetail from "./components/RecipeDetail";
import Chef from "./components/Chef";
import ChefDetail from "./components/ChefDetail";
import RecipeFind from "./components/RecipeFind";
import RecipeNews from "./components/RecipeNews";

/*
  index.js
    -> ReactDom.render(<App/>, document.getElementById('root'))
      -> <App/> => html을 읽어서 => <div id="root">여기에 넣어라</div>
                  ==== html이 아닌 jsp,asp,php 모두 가능
 */
function App() {
  return (
    <Router>
        <Header/>
        <div className={"container-fluid"}>
          <div className={"jumbotron"}>
            <Switch>
              <Route exact path={"/"} component={Recipe}/>
              <Route path={"/recipe_detail/:no"} component={RecipeDetail}/>
              <Route path={"/chef"} component={Chef}/>
              <Route path={"/chef_detail"} component={ChefDetail}/>
              <Route path={"/news"} component={RecipeNews}/>
              <Route path={"/find"} component={RecipeFind}/>
            </Switch>
          </div>
        </div>
    </Router>

  );
}

export default App;
