import React, { lazy, Suspense } from "react";
import Loading from "./Loading";

import { Switch, Route } from "react-router";
import "./App.pcss";

//import IndexPage from "./containers/IndexPageContainer";
//import PersonPage from "./containers/PersonPageContainer";

const IndexPage = lazy(() => import("./containers/IndexPageContainer"));
const PersonPage = lazy(() => import("./containers/PersonPageContainer"));

const lazyPage = Component => props => {
  return (
    <Suspense fallback={<div>laddare!</div>}>
      <Component {...props} />
    </Suspense>
  );
};

class App extends React.PureComponent {
  componentDidMount() {
    const { getPersons } = this.props;
    getPersons();
  }

  // shouldComponentUpdate(prevProps, prevState, props, state) {
  //   return false;
  // }

  render() {
    //console.log("State:", this.state);
    const { loading } = this.props;

    return (
      <div>
        <header>
          {loading && <Loading />}
          <h1>ERP</h1>
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={lazyPage(IndexPage)} />
            <Route path="/person/:id" exact component={lazyPage(PersonPage)} />
          </Switch>
        </main>
        <footer>Hello World!</footer>
      </div>
    );
  }
}

export default App;
