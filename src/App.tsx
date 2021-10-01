import React from 'react';
import './styles/style.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Units from './routes/Units';
import Unit from './routes/Unit';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100%' }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route>
            <Header />
            <Switch>
              <Route exact path="/units" component={Units} />
              <Route exact path="/unit/:unitNumber" component={Unit} />
            </Switch>
          </Route>
        </Switch>
      </div>
      <Footer></Footer>
    </Router>
  );
}

export default App;
