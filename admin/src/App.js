import 'antd/dist/antd.css';
//import Body from './components/index';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
//import Login from './components/content/login/Login';
import RouterAdmin from './routerAdmin'

function App() {
  return (

    <div className="App">
      <Router>
        <Switch>
          {
            RouterAdmin.map((item, index) => {
              const {Component} = item
              return (
                <Route path={item.path} exact={item.exact} key={index}>
                  <Component typeID={item.typeID}/>
                </Route>
              )
            })
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
