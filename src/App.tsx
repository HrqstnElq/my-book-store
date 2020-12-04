import "./App.css";
import {Redirect, Route, Switch} from "react-router-dom";
import AdminPage from "./pages/admin";
import PublicPage from "./pages/public";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
	return (
		<Switch>
			<Route exact path="/">
				<Redirect to="/public" />
			</Route>
			<Route path="/public" component={PublicPage}></Route>
			<Route path="/admin" component={AdminPage}></Route>
			<Route exact path="/login" component={LoginPage}></Route>
			<Route path="*" component={NotFoundPage}></Route>
		</Switch>
	);
}
export default App;
