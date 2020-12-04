import {Route, Switch, useRouteMatch} from "react-router-dom";
import NavBar from "components/admin/NavBar";
import ProductPage from "./ProductPage";
import CustomerPage from "./CustomerPage";
import OrderPage from "pages/public/OrderPage";
import HomePage from "./HomePage";

export default function AdminPage() {
	const match = useRouteMatch();
	return (
		<div>
			<NavBar />
			<Switch>
				<Route exact path={`${match.url}`} component={HomePage} />
				<Route exact path={`${match.url}/home`} component={HomePage} />
				<Route exact path={`${match.url}/product`} component={ProductPage} />
				<Route exact path={`${match.url}/customer`} component={CustomerPage} />
				<Route exact path={`${match.url}/Order`} component={OrderPage} />
			</Switch>
		</div>
	);
}
