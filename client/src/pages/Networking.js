import React from "react";
import { Navigate } from "react-router-dom";

export default function Networking() {

	const loggedInUser1 = localStorage.getItem("token");
	
	return (
		<div className="max-w-4xl mx-auto py-3">
		{loggedInUser1?
		<div>
			<div class="flex text-green-800 justify-center"><p>Networking page coming soon!</p></div>
    	</div>
		: 
		<>
		<Navigate to="/" />
		{/* <h1 className="text-center text-4xl my-10">No one is logged in</h1>
		<Link className="flex justify-center" to="/">
			<Button variant="outlined">Back to home</Button>
		</Link> */}
		</> }
    </div>
	)
}