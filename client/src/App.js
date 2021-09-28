import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {Provider} from "react-redux"
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import store from "./store"
import PrivateRoute from "./routes/PrivateRoute"
import Profile from "./pages/Profile";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
     <Switch>
       <PublicRoute path="/" exact component={Register} />
       <PublicRoute path="/login" exact component={Login} />
       <PrivateRoute path='/profile' exact component={Profile} />
     </Switch>
    </Router>
    </Provider>
    
  );
}

export default App;
