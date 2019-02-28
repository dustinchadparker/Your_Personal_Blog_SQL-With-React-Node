import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import OneBlog from './components/OneBlog';
import BlogPrev from './components/BlogPreviews';

import './scss/app';
import BlogPreviews from './components/BlogPreviews';

export default class App extends React.Component<IAppProps, IAppState> {

    render() {
        return (
          <Router>
            <>
              <div className="container">
                <Switch>
                  <Route exact path="/" component={BlogPrev} />
                  {/* <Route exact path="/blogs/:id" component={OneBlog} /> */}
                </Switch>
              </div>
            </>
          </Router>
        );
      }
    }
interface IAppProps {

}

interface IAppState {
    blogs: Array<{title: string, content: string, _created: string}>;
}