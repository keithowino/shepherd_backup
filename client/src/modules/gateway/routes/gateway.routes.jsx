import { useState } from "react";
import { Landing, Player } from "../pages/index.js";

const gatewayRoutes = [
	{
		path: "/",
		element: <Landing />,
	},
	{
		path: "/shepherd/anime/:id",
		element: <Player />,
	},
];

export default gatewayRoutes;