import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CustomerPage from './components/pages/CustomerPage';
import AdminPage from './components/pages/AdminPage';
import CreateCategories from './admin/CreateCategories';
import Login from './components/pages/Login';
import Register from './components/pages/Register';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={CustomerPage}/>
          <Route path='/Admin' exact component={AdminPage}/>
          <Route path='/login' exact component={Login}/>
          <Route path='/createCate' exact component={CreateCategories}/>
          <Route path='/register' exact component={Register}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
