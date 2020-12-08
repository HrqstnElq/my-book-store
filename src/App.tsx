import "./App.css";
import {Redirect, Route, Switch} from "react-router-dom";
import AdminPage from "./pages/admin";
import PublicPage from "./pages/public";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import {useSelector} from "react-redux";
require("dotenv").config();

function App() {
	const userState = useSelector((state: any) => state.user);

	return (
		<Switch>
			<Route exact path="/">
				{((userState.current.role === "admin" || userState.current.role === "sales") && <Redirect to="/admin"></Redirect>) || <PublicPage />}
			</Route>
			<Route path="/public">
				{((userState.current.role === "admin" || userState.current.role === "sales") && <Redirect to="/admin"></Redirect>) || <PublicPage />}
			</Route>
			<Route path="/admin">
				{(userState.current.token && (userState.current.role === "admin" || userState.current.role === "sales") && <AdminPage />) || (
					<Redirect to="/public"></Redirect>
				)}
			</Route>
			<Route exact path="/login" component={LoginPage}></Route>
			<Route path="*" component={NotFoundPage}></Route>
		</Switch>
	);
}
export default App;
