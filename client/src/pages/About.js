import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export default function About() {
	const[users, setUsers] = useState([])
	useEffect(()=> {
		fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/user/get_users')
			.then(response => response.json())
			.then(data => {
				setUsers(data);
			});
	}, [/* empty sensitivity array means it runs once */]);
	return (
		<div className="max-w-4xl mx-auto py-3">
			<h2 class="text-center text-5xl my-6 py-3 font-semibold ">About us</h2>
			<p className="text-lg">
				This website is meant to help athletes find careers post-playing based off of their interests.
			</p>
			<p className="font-semibold">Users</p>
			<List sx={{ width: '100%', maxWidth: 360}}>
				{users.map((user)=>(
					<ListItem>
						<ListItemAvatar>
						<Avatar>
							<Avatar src={user.pfp} />
						</Avatar>
						</ListItemAvatar>
						<p>{user.name}</p>
					</ListItem>
				))

				}
				
				
			</List>
		</div>
	)
}