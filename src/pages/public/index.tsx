import NavBar from "components/public/NavBar";
import React from "react";
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import LeftBar from "../../components/public/LeftBar";
import RightBar from "../../components/public/RightBar";
import NotFoundPage from "../NotFoundPage";
import BookDetailPage from "./BookDetailPage";
import CartPage from "./CartPage";
import CategoryPage from "./CategoryPage";
import HighLightPage from "./HighLightPage";
import HomePage from "./HomePage";
import OrderPage from "./OrderPage";
import SearchPage from "./SearchPage";

export default function PublicPage() {
	const match = useRouteMatch();

	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className="public-page">
			<NavBar />
			<div className="flex justify-between">
				<LeftBar />
				<Switch>
					<Route exact path={match.url}>
						<Redirect to={`${match.url}/home`}></Redirect>
					</Route>
					<Route exact path={`${match.url}/home`} component={HomePage} />
					<Route exact path={`${match.url}/search`} component={SearchPage} />
					<Route exact path={`${match.url}/highlight`} component={HighLightPage} />
					<Route exact path={`${match.url}/book/:id`} component={BookDetailPage} />
					<Route exact path={`${match.url}/category`} component={CategoryPage} />
					<Route exact path={`${match.url}/cart`} component={CartPage} />
					<Route exact path={`${match.url}/order`} component={OrderPage} />
					<Route path={"*"} component={NotFoundPage} />
				</Switch>
				<RightBar />
			</div>
			<button
				onClick={scrollTop}
				className="fixed bottom-4 right-4 w-12 h-12 bg-gray-400 hover:bg-gray-300 transition-colors bg-opacity-30 rounded-full">
				<i className="fal fa-angle-up"></i>
			</button>
		</div>
	);
}
