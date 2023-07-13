import React, { useState, useEffect } from "react";
import backgroundVideo from './video/sports.mp4'
import {Link} from "react-router-dom";
import '../home.css'
import Login from "../components/login";
import { SitePal } from 'sitepal-react'; 
//import ScaleText from 'react-scale-text';

export default function Home() {
	//const [userToken, setUserToken] = useState();
	const [userInfo, setUserInfo] = useState();
	const [loggedOn, setLoggedOn] = useState(false);
	const [ userID, setUserID] = useState();
	const [success, setSuccess] = useState(false);
	const [isAdmin, setIsAdmin] = useState();
	const admin = localStorage.getItem('isAdmin') === 'true';

	let bearer = 'Bearer ';
	
	useEffect(() => {
		
		const loggedInUser = localStorage.getItem("token");
		const user = localStorage.getItem('id');
		console.log(loggedInUser);
		if (loggedInUser) {
		
		  setUserID(user);
		  setLoggedOn(true);
		  
		  console.log("userToken =>", loggedInUser)
		  
		}

		if(admin){
			setIsAdmin(admin);
		} 

		console.log(process.env.REACT_APP_S_HOST + "   " + process.env.REACT_APP_S_PORT)
		fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/user/get_self_profile',{

			headers:{
				'Authorization': 'Bearer ' + loggedInUser
			}
		})
		.then(response =>{
			if (!response.ok) {
				setSuccess(false);
				throw new Error('Could not login');
				
			  }
			  else{
				setSuccess(true);
				return response.json()
			  }
			
		})
		.then(data => {
			console.log("user information: ", data);
			setUserInfo(data);
		});
	  }, []);

	return (
		<div className="  ">
			{
				/*loggedOn ? 
				<SitePal embed='8617581,480,256,"",1,1,2754297,0,1,1,"EVbvGQYqcI7WqOKmc6F0hkyNj0i6onLR",0,0,"256|480|15|15|L|B|false|0|0|0|0|https://vhss.oddcast.com/admin/img//no_image.jpg|Double%20click%20to%20play%20me|0|C|0|0|0|0"'/>
				:
				<></>*/
			}
			<video autoPlay loop muted id='video'>
				<source src={backgroundVideo}/>
			</video>
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center text-white font-semibold truncate">
					<h2 class="top-message">{userInfo? `Welcome ${userInfo.name}.` : "Unlock your full potential. Take the TSA to find it!"}</h2><br></br>
					<p class="bottom-message">Thinking about finding something you can truly become passionate about? <br></br>With the Transferable Skills Assessment<sup>TM</sup> you can find what career paths are a good fit for you and your lifestyle.</p>
					{ loggedOn ? <></> : <Link to = "/register"className="bg-gray-700 text-white-400 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-lg text-lg font-large display-inline spacing-5px"> <button> Register </button> </Link> }
					{ isAdmin ? <Link to = "/create_codes"className="bg-gray-700 text-white-400 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-lg text-lg font-large display-inline spacing-5px"> <button> Create Access Codes </button> </Link> : <></> }
					<Login btnstyle= " bg-gray-700 text-white-400 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-lg text-lg font-large display-inline "/>
				</div>			
			</div>
		</div>
	);
}
