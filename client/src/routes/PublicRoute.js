import {useSelector} from "react-redux";
import {Route, Redirect} from "react-router-dom"
const PublicRoute = ({path, exact, component}) => {
    const {token, user} = useSelector(state => state.authReducer);
    
    return !token ? <Route path={path} exact={exact} component={component} /> : <Redirect to="/profile" />
}
export default PublicRoute