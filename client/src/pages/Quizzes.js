import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { Button, Modal, Input, Box, Stack, Grid, Paper, TextField} from "@mui/material";
import BottomNavigation from '@mui/material/BottomNavigation';
import { useNavigate, Navigate } from "react-router-dom";
import Login from "../components/login";
//import AccessCode from '..../server/models/accessCodeModel';
import { color } from "d3";
import { SitePal } from 'sitepal-react'; 

//import Accesscode from "../components/accesscode";
//import {checked} from "../components/accesscode";
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Quizzes() {
	let navigate = useNavigate();
  const loggedInUser = localStorage.getItem("token");


	const [query, setQuery] = useState("")
	const [quizData, setQuizData] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [savedQuizzes, setSavedQuizzes] = React.useState([]);
	const [clusters, setClusters] = useState();
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
	  setOpen(false);
	  setClicked(false);
	  setQuestions([]);
	  setAnswers([])
	  setQuizName("New quiz")
	  setAddDisabled(false)
	}
	const [accessCode, setCode] = useState(null);
	const [checked, setCheck] = useState(false);
	const [wrongCode, setwrongCode] = useState(false);

	const [signature, setSignature] = React.useState();

	// get user profile

    fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/user/get_self_profile',{

        headers:{
            'Authorization': 'Bearer ' + loggedInUser
        }
    })
    .then(response =>{
        if (!response.ok) {
            throw new Error('Could not login');
            }
            else{
            return response.json()
            }
        
    })
    .then(data => {
        console.log("profile data: ", data);
        setSignature(data.signature)
    })
    .catch();
	function getCode(val) {
		setCode(val.target.value)
		console.warn(val.target.value)
	}
	const getCheck = async () => {
		try {
		  const response = await fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/access_code/search_access_code', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({ code: accessCode }),
		  });
	  
		  const data = await response.json();
	  
		  if (data.valid) {
			console.log("Access code found");
			setCheck(true);
			setwrongCode(false);
		  } else {
			console.log("Access code not found");
			setCheck(false);
			setwrongCode(true);
		  }
		} catch (error) {
		  console.error("Error searching for access code:", error);
		}
	};
    useEffect(()=> {
		const logged = localStorage.getItem('token');
		const admin = localStorage.getItem('isAdmin') === 'true';
		setIsAdmin(admin);
		

		fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/quiz/get_quizzes', { headers: { 'Authorization': 'Bearer ' + logged } })
			.then(response => response.json())
			.then(data => { setQuizData(data);
			});
		fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/clusters/get_clusters')

		.then(response => response.json())
		.then(data => {
			setClusters(data);
		});

		// get user saved quizzes

		fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/quiz/get_saved_quizzes', {

			headers: {
				'Authorization': 'Bearer ' + loggedInUser
			}
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Could not login');
			} else {
				return response.json()
			}
		})
		.then(data => {
			console.log("saved quizzes: ", data)
			setSavedQuizzes(data);
		});
	}, [/* empty sensitivity array means it runs once */]);

	// useEffect(() => {
	// 	console.log(isAdmin)
	// 	console.log(isAdmin == true)
	// 	console.log(typeof(isAdmin))
	// }, [isAdmin])

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 700,
		maxHeight: 500,
		overflow: "auto",
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

	//for admin
	const [quizName, setQuizName] = useState("New quiz")
	const [questions, setQuestions] = useState([])
	const [answers, setAnswers] = useState([]);
	const [addDisabled, setAddDisabled] = useState(false);
	const [answer, setAnswer] = useState();
	const [numCluster, setNumCluster] = useState();
	const [cluster, setCluster] = useState("");
	const [success, setSuccess] = useState();
	const [clicked, setClicked] =useState();	//const [question, setQuestion] = useState();
	const addQuestion = ()=>{
		
		 setQuestions([...questions, {question: ""}])
		 setAddDisabled(true)
	}

	const handleChange = (e, index) => {
		//e.preventDefault();
	
		const {name, value} = e.target;
		const list = [...questions];
		list[index][name] = value;
		setQuestions(list);
	};	
	const [tempCluster, setTempCluster] = useState("");
	const addAnswer = ()=>{
		for (let i = 0; i < numCluster; i++){
			let temp = cluster.indexOf(",");
			if (temp == -1){
				setTempCluster(cluster.substring(0));
				setCluster("")
			}
			else {
				setTempCluster(cluster.substring(0,temp));
				setCluster(cluster.substring(temp+1));
			}
			setAnswers([...answers, {answer: answer, answerCluster: tempCluster}])
		}
		setAnswer("")
	}
	const handleDone = (index)=>{
		
		const list = [...questions];
		list[index]["answers"] = answers;
		setQuestions(list);
		setAnswers([]);
		setAddDisabled(false);

	}
	const sendQuiz = ()=>{
		// const loggedInUser = localStorage.getItem("token");
		console.log(questions)

		fetch('http://localhost:3001/api/quiz/create_quiz', 
		{
		  method: 'POST',
		  headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + loggedInUser
		  },
		  body: JSON.stringify({
				name: quizName,
				questions: questions
		  })
		})
		.then(response => {
			if(response.ok){
				setSuccess(true);
				console.log("success??" + response.ok);
				return response.json()
			}
			else{
				return response.json()
			}
		})
		.then(data => {
			console.log(data)
			//setQuizData(data);
		});
		setClicked(true);
	}
	const handleAnswer = (e)=> {setAnswer(e.target.value)}
	const handleCluster = (e)=> {setCluster(e.target.value)}
	
	return (
		<div className="max-w-4xl mx-auto py-3">
    	<h2 class="text-center text-5xl my-6 py-3 font-semibold">Transferable Skills Assessment<sup>TM</sup></h2>
		{(savedQuizzes.length == 0 && typeof signature != "undefined") ?
    	<>
			{/*<SitePal embed='8617581,480,256,"",1,1,2756763,0,1,1,"5jcqcybdQCw2ZdgIs3YQoRAQWMYef3DF",0,"256|480|15|15|L|B|false|0|0|0|0|https://vhss.oddcast.com/admin/img//no_image.jpg|Double%20click%20to%20play%20me|0|C|0|0|0|0"'/>*/}
			{/* <div className={`${isAdmin? 'block':'hidden'}`}>
				<Button onClick={handleOpen} variant="outlined">+ Add new quiz</Button>
			</div> */}
			<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<>
					{!clicked? 
					<Stack spacing={2}>
						<Input id="component-simple" value={quizName} onChange={(e) => setQuizName(e.target.value)} />
						
						
						{/* <RenderQuestions items={questions} /> */}
						{questions.map((singlequestion, idx)=> (
							<div key={idx} className="relative p-3 hover:bg-gray-200 rounded-md bg-gray-100 my-2 space-y-1">
							<Stack spacing={3}>
							
								<Input fullWidth="true" name="question" placeholder={`Question ${idx+1}`} type="text" id="component-simple" value={singlequestion.question} onChange={(e)=>handleChange(e, idx)}/>
							
								
									{/* <Grid container spacing={1}>
									{answers.map((ans)=>(
										<>
										<Grid item xs={6}>
											<p className="font-semibold text-base">{ans.answer}</p>
										</Grid>
										<Grid item xs={6}>
											<p className="text-base">{ans.answerCluster}</p>
										</Grid>
										</>
									))}
									</Grid> */}
									<Grid container spacing={1}>
									{singlequestion.answers? singlequestion.answers.map((a)=>(
										<>
										<Grid item xs={6}>
											<p className="font-semibold text-base">{a.answer}</p>
										</Grid>
										<Grid item xs={6}>
											<p className="text-base">{a.answerCluster}</p>
										</Grid>
										</>
										//hello
									)):<>{answers.map((ans)=>(
										<>
										<Grid item xs={6}>
											<p className="font-semibold text-base">{ans.answer}</p>
										</Grid>
										<Grid item xs={6}>
											<p className="text-base">{ans.answerCluster}</p>
										</Grid>
										</>
									))}
									<>

									<Grid container spacing={20}>
										<Grid item xs={3}>

									
											<Input fullWidth="true" name="answer" value={answer} id="standard-multiline-flexible" onChange={(e) => handleAnswer(e)}label="Multiline" multiline maxRows={4} placeholder="Answer choice"/>

										</Grid>
										{/*<Grid>
											<Input fullWidth="true" name="numCluster" value={numCluster} id="standard-multiline-flexible" onChange={(e) => handleNumCluster(e)}label="Multiline" multiline maxRows={4} placeholder="Number of Cluster"/>
										</Grid>*/}
										<Grid item xs={3}>
											{/*<Input fullWidth="true" name="cluster inputs" value={cluster} id="standard-multiline-flexible" onChange={(e) => handleCluster(e)}label="Multiline" multiline maxRows={4} placeholder="Clusters"/>*/}
											
											{/* the cluster dropdown*/}
											<TextField
												id="outlined-select-currency-native"
												select size="small"
												value={cluster}
												onChange={(e) => handleCluster(e)}
												SelectProps={{
													native: true,
												}}
												helperText="Career cluster"
												>
													<option>
														
													</option>
												{clusters.map((c) => (
													<option>
														{c.shortName}
													</option>
											))}
													
											</TextField>
										</Grid>
                    
										<Grid item md={10}>

											<Button color="success" onClick= {addAnswer} className="p-3" variant="outlined"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
											<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
											</svg></Button>

										</Grid>

									</Grid>
									<div className="mt-5">
										{/* <div className="flex justify-center m-5">
											<Button onClick= {addAnswer} className="p-3" variant="outlined">+ Add this answer choice</Button>
										</div> */}
										<div className="flex justify-right">
											<Button onClick= {()=>handleDone(idx)} className="p-3" variant="contained">Done</Button>
										</div>
									</div>
									</>
									</>
									}
									
									</Grid>		
								 
							</Stack>
								
							</div>
						))}
						<Button onClick={addQuestion} disabled={addDisabled} variant="outlined">+ Add question</Button>

						
						<Button onClick={sendQuiz} variant="contained" color="success" size="large">Submit</Button>

					</Stack>
					: <div className="flex justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={2}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				  </svg><h2 className="text-base font-semibold text-black-800 pl-2">{success? "Quiz created successfully": "Unable to create quiz"}</h2></div>}
					</>

				
				</Box>
				
			</Modal>
			<div className="w-full px-2 py-6 sm:px-0">
				{/* <Tab.Group>
					<Tab.List className="flex p-1 space-x-1 rounded-xl">
						{Object.keys(categories).map((category) => (
							<Tab
								key={category}
								className={({ selected }) =>
									classNames(
										'w-full py-2.5 text-sm leading-5 font-medium rounded-lg rounded-sm',
										'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
										selected ? 'bg-blue-100 text-blue-700' : ' hover:bg-white hover:text-blue-700'
									)
								}
							>
								{category}
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels className="mt-2">
						
							<Tab.Panel className={classNames('bg-white rounded-xl p-3', 'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60')}>
								<ul>
									{quizData.map((q) => (
										<li key={q.id} className="relative p-6 rounded-md bg-gray-100 my-2">
											<h3 className="text-md pb-2 font-medium leading-5">
												{q.name}
											</h3>

											<ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
												<li>10 mins</li>
											</ul>

											<a href={`quizzes/${q.url}`} className={classNames('absolute inset-0 rounded-md','focus:z-10 focus:outline-none focus:ring-2 ring-blue-400')}/>
										</li>
									))}
								</ul>
							</Tab.Panel>
						
					</Tab.Panels>
				</Tab.Group> */}
				<div className="max-w-4xl mx-auto py-3">
					<div className={`${checked? 'hidden':'block'}`}>
						<div className="flex items-center justify-center px-4 border-l" style={{ color: "black", height: "100px"}}>

							<h1 
                className="text-center text-4xl my-6"
              >Input access code:
              {/* <input 
                type="text" 
                style={{color: "black", outline: true, borderColor: "black", borderWidth: "1px"}}
                onChange={getCode}
              /> */}
              </h1>
              <p>
                  <input
                    class="my-6 mx-3"
                    type="text" 
                    style={{color: "black", outline: true, borderColor: "black", borderWidth: "1px"}}
                    onChange={getCode}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    align="center"
                    onClick={() => getCheck()}
								  >
									Check
                  </Button>
              </p>
						</div>
					</div>
					<div class="flex text-green-800 justify-center">{checked? 'Correct access code! ' : null} {wrongCode? 'Wrong access code!': null} </div>

						{checked?(<div class="flex items-center justify-center">
							{/*<div class="flex border-2 rounded">
								<input onChange={ e => setQuery(e.target.value)} value={query} type="text" class="px-3 py-1 w-80" placeholder="Search..."/>
								<button class="flex items-center justify-center px-4 border-l">
									<svg class="w-5 h-5 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24">
										<path
											d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
									</svg>
								</button>
							</div>*/}
							<div>
								<Button
									variant="contained"
									size="large"
									align="center"
									onClick={() => {
									console.log(localStorage.getItem('token'));
									localStorage.getItem('token')? navigate("/quiz"):<Login btnstyle= " bg-gray-700 text-white-400 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-lg text-lg font-large display-inline "/>
								}}
								>
									Take Quiz
								</Button>
							</div>
						</div>):''}
							
						<div>
					</div>
					{/* <div>
						{checked?(
						quizData.filter(post => {
							if (query === '') {
							return post;
							} else if (post.name.toLowerCase().includes(query.toLowerCase())) {
							return post;
							}
						}).map((q) => (
							<div className="relative p-3 hover:bg-gray-200 rounded-md bg-gray-100 my-4 space-y-2 p-8">
								<h3 className="text-md font-bold leading-5 pb-2">
									{q.name}
								</h3>

								<ul className="flex mt-1 space-x-1 text-smfont-normal">
									{// <li><HeartIcon class={`h-5 w-5 ${c.liked ? "fill-black" : ""}`}/></li> }
									<ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
										<li>{q.saved ? "Saved!" : "Not taken yet!"}</li>
									</ul>
									
								</ul>
								<div className="flex justify-end ">

								</div>
								<a href={`quizzes/${q._id}`} className='absolute inset-0 rounded-md focus:z-10 focus:outline-none focus:ring-2 ring-blue-400'/>
								
								{
									isAdmin ? <Button onClick={()=>handleDelete(q._id)} size="small" variant="outlined" color="error">Delete</Button> : <></>
								}
							</div>
						))):''
						}
					</div> */}
				</div>
				
			</div>
      	</>
      	:
      	<>
      	</>
		}
		{
			(savedQuizzes.length != 0 && typeof signature != "undefined") ?
				<div class="flex text-green-800 justify-center"><p>You have already completed your assessment.</p></div>
			:
			<>
			</>
		}
    </div>
	)
}