import React from 'react';
import './styles/style.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Units from './routes/Units';
import Unit from './routes/Unit';
import Footer from './components/Footer';
import Admin from './routes/Admin';
import Profile from './routes/Profile';
import Page404 from './routes/Page404';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route>
            <Header />
            <Switch>
              <Route exact path="/units" component={Units} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/unit/:unitNumber" component={Unit} />
              <Route component={Page404} />
            </Switch>
          </Route>
        </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
