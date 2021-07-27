import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import CustomerPage from './components/pages/CustomerPage';
import AdminPage from './components/pages/AdminPage';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import history from '../src/services/history';



function App() {

    return (
      <>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home/main" />
            </Route>
            <Route path='/home' component={CustomerPage} />
            <Route path='/Admin' component={AdminPage} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
          </Switch>
        </Router>
      </>
    );
  
}

export default App;
