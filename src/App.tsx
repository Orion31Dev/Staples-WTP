import React from 'react';
import './styles/style.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import Home from './routes/Home';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route>
            <Header />
            <Switch>

            </Switch>
          </Route>
        </Switch>
        <Footer></Footer>
      </Router>
  );
}

export default App;
