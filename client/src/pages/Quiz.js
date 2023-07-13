import '../newQuiz.css';
import questions from '../quiz/quizData';
import { Button, Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useParams, Link, Navigate} from 'react-router-dom';
import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { ArrowLeftIcon } from "@heroicons/react/solid";

export default function NewQuiz(){
  const {id} = useParams();
  const [quizData, setQuizData] = useState({});
  const [answers, setAnswers] = useState([]);
  const [active, setActive] = useState();
  const [success, setSuccess] = useState();
  const [answeredCurr, setAnsweredCurr] = useState(false);
  const [value, setValue] = useState("");
  const [hasClickedNext, setHasClickedNext] = useState(false);
  const loggedInUser = localStorage.getItem("token")

  const navigate = useNavigate();
  
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
    setAnsweredCurr(true);
    setActive(name);
    //console.log(typeof answers[0])
    /*if(typeof answers[0] == 'undefined') {
      
    }*/
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

  const navigateToCareers = () => {
    // 👇️ navigate to /careers
    saveAnswers()
    navigate('/results');
  };

  const handleChange = (event) => {
    setValue(event.value)
  }

  useEffect(()=> {
		console.log("hello" , id)
		const loggedInUser = localStorage.getItem("token")
		fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + `/api/quiz/get_quiz/64690d150b26c4172345ee3b`, {headers: {'Authorization': 'Bearer ' + loggedInUser}})
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
          console.log(data.questions)
				}
				setQuizData(data);
				console.log(data.saved)
			});
	}, [/* empty sensitivity array means it runs once */]);
   
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // Helper Functions
    const [flag, setFlag] = React.useState(true);

    const  nextClick = () => {
      setHasClickedNext(true);
        // Handle next question button
        if (((answers.length >= currentQuestion+1) && (currentQuestion + 1 < quizData.questions.length)) || currentQuestion < 2){
          setAnsweredCurr(false);
          setHasClickedNext(false);
          setCurrentQuestion(currentQuestion + 1);
          setValue("");
        }
    }      

    const  backClick = () => {
        // Handle next question button
        if (currentQuestion - 1 > -1){
            setCurrentQuestion(currentQuestion - 1);
            setValue("");
        }
    }    

    return(
      <div className='app max-w-4xl mx-auto py-3'>
        {loggedInUser? 
        <>
        <div>
        {/* 2. Question Card */}
        {quizData.questions? 
          <>
            <div className='question-card'>
                {/* Display picture */}  
                {/* let imagePath =  "../quiz/quizImages/" */}
                <div className='picture'>
                    <img src={questions[currentQuestion].picture} class="center" />
                    {/* <img alt="sports balls" src="./src/pages/quiz/quizImages/imageQ1.jpeg" class="center" /> */}
                </div>

                <div className='app'>
                  <>
                    <div className='question-section'>
                      <div className='question-count'>
                        <span>Question {currentQuestion + 1}</span>/23
                      </div>
                      <div className='question-text'>{quizData.questions[currentQuestion].question}</div>
                    </div>
                    <div className='answer-section'>
                      {quizData.questions[currentQuestion].answers.map((ans) => (
                        <Button
                          style={{
                            width: '100%',
                            fontSize: '14px',
                            color: '#ffffff',
                            borderRadius: '15px',
                            display: 'flex',
                            padding: '5px',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            border: '5px solid #234668',
                            cursor: 'pointer'
                          }}
                          className={active == ans._id ? "bg-blue-200" : " "}
                          color={flag ? "primary" : "primary"}  
                          sx={{display: "flex", justifyContent: "start"}} 
                          variant={active == ans._id? "contained" : "outlined"}
                          id={ quizData.questions[currentQuestion].num +  " " + ans._id} 
                          onClick={(e)=>clickAnswer(e, ans._id)}
                        >
                        {ans.answer}</Button>
                      ))
                      }
                    </div>
                  </>
                </div>

                {/* //Display question
                <div className="questions-text">
                <Box sx={{ p: 2 }} >
                    {quizData.questions[currentQuestion].question}
                </Box>
                </div>
                
                //Display multiple choices
                <ul>
                    {quizData.questions[currentQuestion].answers.map((ans) => 
                      <li>
                        <div classname="answers">
                        <Box sx={{ p: 0.5 }} textAlign="center" display="flex" alignItems="center" justifyContent="center"> 
                        <Button 
                          style={{maxWidth: '400px', maxHeight: '30px', minWidth: '775px', minHeight: '30px', borderColor: "#3f51b5"}}
                          className={active == ans._id ? "bg-blue-200" : " "}
                          color={flag ? "primary" : "primary"}  
                          sx={{display: "flex", justifyContent: "start"}} 
                          variant={active == ans._id? "contained" : "outlined"} 
                          id={ quizData.questions[currentQuestion].num +  " " + ans._id} 
                          onClick={(e)=>clickAnswer(e, ans._id)}
                          >
                          {ans.answer}
                        </Button>
                        </Box>
                        </div>
                      </li>
                    )}       
                  </ul>*/}
                  <Box sx={{ p: 1.5 }} > 
                    <div className="next">
                      {/* Next question button */}
                        <Button
                                style={{
                                  width:'10%',
                                  float:'right',
                                  right:'20px'
                                }}
                                variant="contained"
                                color="primary"
                                size="medium"
                                onClick={(currentQuestion==(quizData.questions.length - 1)) ? navigateToCareers : nextClick} > 
                                {(currentQuestion==(quizData.questions.length - 1)) ? "Save" : "Next"}

                        </Button>
                    </div>
                    <div className="back">
                        {/* Previous question button */}
                        <Button
                                style={{
                                  width:'10%',
                                  float:'left',
                                  left:'20px'
                                }}
                                variant="contained"
                                color="primary"
                                size="medium"
                                onClick={backClick} >
                                Back
                        </Button>
                    </div>
                  </Box>

                  <Link to="/quizzes" class="flex rounded-md bg-blue-100 mt-1 p-1 w-24" style={{margin:'0 auto'}}>
                    <ArrowLeftIcon class="h-4 w-4 align-middle m-1"/>
                    Exit Quiz
                  </Link>
              <div className="text-green-800 mt-6" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                {(hasClickedNext) ? (answeredCurr && value != "" ? "": ("Please answer the current question before moving on!")) : ""}
              </div>
              <div className="text-green-800 mt-6">
                {currentQuestion==(quizData.questions.length - 1) && success? "Successfully saved, click on your profile to view your career compass!" : ""}
              </div>
            </div>
          </>
          :
          <>
            
          </>
       }

          <div className="mt-5 ">

          {/* <Grid>
               <Button size="large" variant="contained" onClick={saveAnswers}>{quizData.saved ? "Update" : "Save"}</Button>
               <div className="text-green-800 mt-6">{success? "successfully saved" : "Not saved yet, you need to be logged in and make sure to complete all questions before saving/updating"}
               </div>
          </Grid> */}
         </div>

        </div> 
        </>
        :
        <>
          <Navigate to="/" />

        </>
      }
      </div>
    )
    
}

