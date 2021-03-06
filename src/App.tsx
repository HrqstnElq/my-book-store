import LogoutPage from "pages/LogoutPage";
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import "./App.css";
import AdminPage from "./pages/admin";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import PublicPage from "./pages/public";
import {Helmet} from "react-helmet";

require("dotenv").config();

function App() {
	const userState = useSelector((state: any) => state.user);
	return (
		<>
			<Helmet>
				<title>{"Nhà sách An Nguyên"}</title>
			</Helmet>
			<Switch>
				<Route exact path="/">
					{((userState.current.role === "admin" || userState.current.role === "sales") && <Redirect to="/admin"></Redirect>) || (
						<Redirect to="/admin"></Redirect>
					)}
				</Route>
				<Route path="/book-store">
					{((userState.current.role === "admin" || userState.current.role === "sales") && <Redirect to="/admin"></Redirect>) || (
						<PublicPage />
					)}
				</Route>
				<Route path="/admin">
					{(userState.current.token && (userState.current.role === "admin" || userState.current.role === "sales") && <AdminPage />) || (
						<Redirect to="/book-store"></Redirect>
					)}
				</Route>
				<Route exact path="/login" component={LoginPage}></Route>
				<Route exact path="/logout" component={LogoutPage}></Route>
				<Route path="*" component={NotFoundPage}></Route>
			</Switch>
		</>
	);
}
export default App;
