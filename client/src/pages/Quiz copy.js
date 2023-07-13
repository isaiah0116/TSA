import '../newQuiz.css'
import questions from '../quiz/quizData'
import Button from '@material-ui/core/Button';
import { useParams, Link } from 'react-router-dom';
import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/solid";

export default function NewQuiz2(){
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // Helper Functions
    const  handleClick = () => {
        // Handle next question button
        if (currentQuestion + 1 < 15){
            setCurrentQuestion(currentQuestion + 1);
        }
        else{
            // TODO: show final results
        }
    }      

    // Main Function
    return(
      <div className='app max-w-4xl mx-auto py-3'>

        <Link to="/quizzes" class="flex rounded-md bg-blue-100 mt-1 p-3 w-24">
          <ArrowLeftIcon class="h-4 w-4 align-middle m-1"/>
          Back
        </Link>

        <div className="header">
        {/* 1. Header */}
            Career Quiz 

        {/* 2. Question Card */}
            <div className='question-card'>
                {/* Display question # user is on */}
                <div className='question-num'>
                    Question {currentQuestion+1} out of 15
                     {/* Next question button */}
                    <div className="controls">
                    <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={handleClick} >
                            Next
                        </Button>
                    </div>
                </div>

                {/* Display picture */}    
                <div className='picture'>
                    <img src={questions[currentQuestion].picture} class="center" />
                </div>
                
                {/* Display question */}  
                <div className="questions-text">
                    {questions[currentQuestion].Question}
                </div>

                {/* Display multiple choices */}  
                <ul>
                    {questions[currentQuestion].options.map((option) => {
                        return (
                            <li className="option-li" key={option.id}>{option.text}</li>
                        );
                    })}       
                </ul>
            </div>
        
        </div>
      </div>
    )
    
}
