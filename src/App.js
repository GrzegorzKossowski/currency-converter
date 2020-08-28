import React from 'react';
import './App.scss';
import HomePage from './views/home-page/HomePage';
import { Switch, Route } from 'react-router-dom';
import ErrorBoundary from './components/error-handling/ErrorBoundary';

function App() {

  return (
    <div className="App">
      {/* <ErrorBoundary> */}
        <Switch>
          <Route exact path={['/', '/currency-converter']}>
            <HomePage isHistoryOn={false} />
          </Route>
          <Route path='/history'>
            <HomePage isHistoryOn={true} />
          </Route>
        </Switch>
      {/* </ErrorBoundary> */}
    </div>
  );
}

export default App;
