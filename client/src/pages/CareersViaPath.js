import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { HeartIcon, SearchIcon } from "@heroicons/react/outline";

export default function CareersViaPath() {
    const {pathway} = useParams();
	const [query, setQuery] = useState("")
	const [careerData, setCareerData] = useState([]);
	useEffect(()=> {

		fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + `/api/career/get_careers_via_pathways/${pathway}`)

			.then(response => response.json())
			.then(data => {
				console.log(data)
				setCareerData(data);
			});
	}, [/* empty sensitivity array means it runs once */]);
	return (
		<div className="max-w-4xl mx-auto py-3">
			<h2 class=" text-center text-5xl font-semibold my-8">Careers</h2>
			<p className="text-base text-center my-8">Here is where you will find a list of careers within this pathway.</p>
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
				{careerData.filter(post => {
					if (query === '') {
					return post;
					} else if (post.name.toLowerCase().includes(query.toLowerCase())) {
					return post;
					}
				}).map((c) => (
					<li className="hover:bg-gray-200 relative p-3 rounded-md bg-gray-100 my-4 space-y-2 p-7">
						<h3 className="text-md font-bold leading-5 pb-2">
							{c.name}
						</h3>

						<p class="text-sm font-sm text-gray-500 pb-2">{c.description}</p>

						<ul className="flex mt-1 space-x-1 text-smfont-normal">
							{/* <li><HeartIcon class={`h-5 w-5 ${c.liked ? "fill-black" : ""}`}/></li> */}
							<li class="font-bold text-sm">Learn More</li>
						</ul>

						<a href={`/careers/${c._id}`} className='absolute inset-0 rounded-md focus:z-10 focus:outline-none focus:ring-2 ring-blue-400'/>
					</li>
				))
				
				}
			</ul>
		</div>
	)
}