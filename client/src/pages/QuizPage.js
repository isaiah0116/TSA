//this is replaced by Quiz.js but don't delete the file just yet bc it might have been refered to in somewhere
import { ArrowLeftIcon } from "@heroicons/react/solid";
import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import Slider from '@mui/material/Slider';
import "../quiz.css"
import { TextField } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { elementTypeAcceptingRef } from "@mui/utils";
export default function Quiz() {

	let [percent, setPercent] = useState(0);
	const {id} = useParams();
	const [quizData, setQuizData] = useState({});
	const [answers, setAnswers] = useState([]);
	const [active, setActive] = useState()
	const [success, setSuccess] = useState()
	const clusters = [
		"Agriculture","Architecture","Arts",
		"Business","Education","Finance",
		"Government","Health","Hospitality",
		"Human Services","IT","Public Safety",
		"Manufacturing","Marketing","STEM",
		"Transportation"
	]

	const clickAnswer = (event, name) => {
		// id is of form "<question #> <answer._id>"
		var arr = event.target.id.split(' ')
		console.log("arr: " + arr);
		var a = answers;
		a[arr[0]] = arr[1];
		console.log(a)
		setAnswers(a);

		setActive(name)
	}

	const saveAnswers = () => {
		const loggedInUser = localStorage.getItem("token")

		fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + `/api/quiz/` + (quizData.saved ? 'update_saved_quiz' : 'create_saved_quiz'), 

		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + loggedInUser
			},
			body: JSON.stringify({
				quizID: quizData._id,
				name: quizData.name,
				answers: answers
			})
		})
		.then(response => {
			if(response.ok){
				setSuccess(true);
				return response.json()
			}
			else{
				throw new Error("could not save")
			}
				
				
		})
		.then(data => {
			console.log(data)

		});
	}

	useEffect(()=> {
		console.log("hello" , id)
		const loggedInUser = localStorage.getItem("token")

		fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + `/api/quiz/get_quiz/${id}`, {headers: {'Authorization': 'Bearer ' + loggedInUser}})

			.then(
				
				response =>{
					if (!response.ok) {
						throw new Error('Could not fetch');
						
					}
					else{
						return response.json()
					}
				}
				)
			.then(data => {
				// give a question number for each question
				for (var i = 0; i < data.questions.length; i++) {
					data.questions[i].num = i
				}
				setQuizData(data);
				console.log(data.saved)
			});
	}, [/* empty sensitivity array means it runs once */]);
  
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	// const handleAnswerOptionClick = () => {
	// 	setPercent((currentQuestion/questions.length)*100);

	// 	const nextQuestion = currentQuestion + 1;
	// 	if (nextQuestion < questions.length) {
	// 		setCurrentQuestion(nextQuestion);
	// 	} else {
	// 		setShowScore(true);
	// 	}
	// };

    
	return (
		<div className='app max-w-4xl mx-auto py-3'>
			{showScore ? (
				<div className='score-section'>
					<h1 class="text-center text-5xl my-2 py-3 font-semibold flex-auto">These are some recommended careers for you.</h1>
                    <p>UX Designer</p>
                    <p>Software Engineer</p>
                    <p>Web Designer</p>
				</div>
			) : (
				<>{}
                    <div>
					<Link to="/quizzes" class="flex rounded-md bg-blue-100 mt-1 p-3 w-24">
						<ArrowLeftIcon class="h-4 w-4 align-middle m-1"/>
						Back
					</Link>
				    </div>
                    
							<h1 class="text-center text-indigo-400 text-5xl my-2 py-3 font-semibold flex-auto">{quizData.name}</h1>
                   
							{quizData.questions? 
								<>
									{quizData.questions.map(question => 
										<div id={question._id}>
											<h2 className='question-text font-semibold'>  {question.question}</h2>
											<div className='answer-section'>
												{question.answers.map(ans => 
													<Button color="secondary"  sx={{display: "flex", justifyContent: "start"}} variant={active == ans._id? "contained" : "outlined"} className={active == ans._id? "bg-blue-200" : " "} id={question.num + " " + ans._id} onClick={(e)=>clickAnswer(e, ans._id)/*(quizData.questions.num, ans)*/}>{ans.answer}</Button>
												)}
											</div>
										</div>
									)}
								</>
							:
								<></>
							}
							<div className="mt-5 ">
								<Grid>
								<Button size="large" variant="contained" onClick={saveAnswers}>{quizData.saved ? "Update" : "Save"}</Button>
								<div className="text-green-800 mt-6">{success? "successfully saved" : "Not saved yet, you need to be logged in and make sure to complete all questions before saving/updating"}</div>
								</Grid>
							</div>

						<div>
					</div>
						
						
						{/* <div className='answer-section'>
							{questions[currentQuestion].answerOptions.map((answerOption) => (
								<button onClick={() => handleAnswerOptionClick()}>{answerOption.answerText}</button>
							))}
	 */}
							
							{/* <Button onClick={() => handleAnswerOptionClick()} variant="contained">Next</Button> */}
						{/* </div> */}
                    
                    
				</>
			)}
		</div>
	);

}