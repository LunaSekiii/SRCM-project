import { useState, useEffect } from "react";
import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import routes from "../router";

export default function RouterGuard() {
	// const location = useLocation();
	// const navigate = useNavigate();
	// const pass = useState(true);
	// useEffect(() => {
	// 	console.log("path", location.pathname);
	// 	if (location.pathname.split("/")[1] == "files") {
	// 		navigate(-1);
	// 	}
	// 	return () => {};
	// }, [location, navigate]);

	const Routes = () => useRoutes(routes);
	return <Routes />;
}
