import { ArrowLeftIcon } from "@heroicons/react/solid";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Career({params}) {
	const {id} = useParams();
	const [careerData, setCareerData] = useState({});
	useEffect(()=> {
		console.log("hello" , id)

		fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + `/api/career/get_career/${id}`)

			.then(response =>{return response.json()})
			.then(data => {
				console.log("MindMap: ", data);
				setCareerData(data);
			});
	}, [/* empty sensitivity array means it runs once */]);
	return (
		<div className="max-w-4xl mx-auto py-3">
			
					<><div class="grid grid-cols-3">
					<div>
						<Link to="/careers" class="flex rounded-md bg-blue-100 mx-5 mt-1 p-3 w-24 mt-5">
							<ArrowLeftIcon class="h-4 w-4 align-middle m-1" />
							Back
						</Link>
					</div>

					<div>
						<h1 class="text-indigo-600 text-center text-5xl my-6 py-3 font-semibold flex-auto">{careerData.name}</h1>
					</div>
					<div />
				</div><h2 class="text-indigo-500  text-3xl my-3 font-semibold">Salary</h2>
				{careerData.salary?
				<>
					<p>Median Hourly: ${careerData.salary.medianHourly}</p>
					<p>Mean Hourly: ${careerData.salary.meanHourly}</p>
					<p>Mean Annual: ${careerData.salary.meanAnnual}</p>
				</>
				: <></>}
				<h2 class="text-indigo-500 text-3xl my-3 font-semibold">Job Description</h2>
				<p class="mb-4">{careerData.description? careerData.description: "no description yet"} </p>
				<h2 class="text-indigo-500  text-3xl my-3 font-semibold">Pathways</h2>
				<p class="mb-4">{careerData.pathway}</p></>
				
			
		</div>
	)
}