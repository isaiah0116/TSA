import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { HeartIcon, SearchIcon } from "@heroicons/react/outline";

export default function CareersViaPath() {
	let [career] = useState([
		{
			url: "UX_Designer",
			title: "User Experience Designer",
			desc: "User experience design is the process of supporting user behavior through usability, usefulness, and desirability provided in the interaction with a product",
			liked: true
		},
		{
			url: "Marketing_Manager",
			title: "Marketing Manager",
			desc: "A marketing manager handles the marketing of a business or product. They can be responsible for several services or products, or be in charge of a single paroduct.",
			liked: false
		},
		{
			url: "Architect",
			title: "Architect",
			desc: "An architect plans, designs, and oversees the construction of buildings. To practice architecture means to provide serviecs in connection with the design of buildings and the space within the site surrounding the buildings that have human occupancy or use as their principle purpose.",
			liked: false
		}
	])
	const [query, setQuery] = useState("")
	const [careerData, setCareerData] = useState([]);
	useEffect(()=> {

		fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/career/get_careers')

			.then(response => response.json())
			.then(data => {
				console.log("MindMap: ", data);
				setCareerData(data);
			});
	}, [/* empty sensitivity array means it runs once */]);
	return (
		<div className="max-w-4xl mx-auto py-3">
			<p className="text-base text-center my-8">If your desired career is not listed you can search all careers by clicking here.</p>
			<div class="flex items-center justify-center">
				<div class="flex border-2 rounded">
						<input onChange={ e => setQuery(e.target.value)} value={query} type="text" class="px-3 py-1 w-80" placeholder="Search..."/>
						<button class="flex items-center justify-center px-4 border-l">
							<svg class="w-5 h-5 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24">
								<path
									d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
							</svg>
						</button>
					</div>
				</div>
			
				<ul>
					{query.length > 0 && careerData.filter(post => post.name.toLowerCase().includes(query.toLowerCase())).map((c) => (
						<li className="hover:bg-gray-200 relative p-3 rounded-md bg-gray-100 my-4 space-y-2 p-7">
							<h3 className="text-md font-bold leading-5 pb-2">
								{c.name}
							</h3>

							<p class="text-sm font-sm text-gray-500 pb-2">{c.description}</p>

							<ul className="flex mt-1 space-x-1 text-smfont-normal">
								{/* <li><HeartIcon class={`h-5 w-5 ${c.liked ? "fill-black" : ""}`}/></li> */}
								<li class="font-bold text-sm">Learn More</li>
							</ul>

							<a href={`careers/${c._id}`} className='absolute inset-0 rounded-md focus:z-10 focus:outline-none focus:ring-2 ring-blue-400'/>
						</li>
					))}
				</ul>
		</div>
	)
}