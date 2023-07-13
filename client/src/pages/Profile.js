import React, {useState, useEffect} from "react";
import '../newQuiz.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Navigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SitePal } from 'sitepal-react';
import ChatbotModal from "../components/chatmodal";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [school, setSchool] = React.useState();
  const [grade, setGrade] = React.useState();
  const [signature, setSignature] = React.useState();
  const [pfp, setPfp] = React.useState();
  const [sport, setSport] = React.useState();
  const [position, setPosition] = React.useState();
  const [subject, setSubject] = React.useState();
  const [hobby, setHobby] = React.useState();
  //const [clusterPoints, setClusterPoints] = React.useState();
  const [careerList, setCareerList] = React.useState(); //!
  const [savedQuizzes, setSavedQuizzes] = React.useState([]);
  const [profileQuestions, setProfileQuestions] = React.useState([]);
  const [profileAnswers, setProfileAnswers] = React.useState([]);
  const [showResults, setShowResults] = React.useState(true);
  const [confirmMessage, setConfirmMessage] = React.useState(false);
	
	// // means this only runs when you want to
	// useEffect(() => {
	// 	// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	// 	// might recommend making a series of functions to set up common request types...
	// 	fetch('/api/dummy/get_profile/0')
	// 		.then(response => {
	// 			// can do things here like check if its correct, or if it returns 200...
	// 			return response.json()
	// 		})
	// 		.then(data => {
	// 			console.log("profile: ", data);
	// 			setProfileData(data);
	// 		});

	// 	fetch('/api/dummy/get_mind_clusters/0')
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			console.log("MindMap: ", data);
	// 			setClusterData(data);
	// 		});
		
	// }, [/* empty sensitivity array means it runs once */]);

    const theme = createTheme({
        palette: {
          primary: {
            // light: will be calculated from palette.primary.main,
            main: '#303a5f',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
          },
          secondary: {
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
          },
          // Provide every color token (light, main, dark, and contrastText) when using
          // custom colors for props in Material UI's components.
          // Then you will be able to use it like this: `<Button color="custom">`
          // (For TypeScript, you need to add module augmentation for the `custom` value)
          custom: {
            light: '#ffa726',
            main: '#f57c00',
            dark: '#ef6c00',
            contrastText: 'rgba(0, 0, 0, 0.87)',
          },
          // Used by `getContrastText()` to maximize the contrast between
          // the background and the text.
          contrastThreshold: 3,
          // Used by the functions below to shift a color's luminance by approximately
          // two indexes within its tonal palette.
          // E.g., shift from Red 500 to Red 300 or Red 700.
          tonalOffset: 0.2,
        },
      });
	
	useEffect(() => {
		const loggedInUser = localStorage.getItem("token");
		const user = localStorage.getItem('id');
		if (loggedInUser) {
		  console.log("userToken =>", loggedInUser)
		}
		else{
			console.log("No user token")
		}

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
      setProfileData(data)
      setName(data.name)
      setEmail(data.email)
      setSchool(data.school)
      setGrade(data.grade)
      setSignature(data.signature)
      setPfp(data.pfp)
      setSport(data.sport)
      setPosition(data.position)
      setSubject(data.subject)
      setHobby(data.hobby)
      setProfileQuestions(["What position(s) do you play?","What is your favorite position?","What is your least favorite position?","What other sports do you play?","Why do you play sports?","What skills do you think you gain from playing sports?","What other things do you like to do?","If you could not play sports what would you do?","What do you want to be when you grow up?"])
      setProfileAnswers(data.profileAnswers)
      if(data.pfp != "default") {
        setShowResults(false)
      }
      //setClusterPoints(data.clusterPoints)
		})
		.catch();

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


        // get top 3 careers

        fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/career/get_careers', {

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
			console.log("list of careers: ", data)
			setCareerList(data);
		});
	  }, []);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [expanded, setExpanded] = React.useState(false);

    const handleProfile1 = (event) => {
        setSport(event.target.value);     
    };
    const handleProfile2 = (event) => {
        let newArr = [...profileAnswers];
        newArr.splice(0, 1, event.target.value);

        setProfileAnswers(newArr);     
    };
    const handleProfile3 = (event) => {
        setPosition(event.target.value);     
    };
    const handleProfile4 = (event) => {
        let newArr = [...profileAnswers];
        newArr.splice(1, 1, event.target.value);

        setProfileAnswers(newArr);     
    };
    const handleProfile5 = (event) => {
        setHobby(event.target.value);   
    };
    const handleProfile6 = (event) => {
        setSubject(event.target.value);    
    };
    const handleProfile7 = (event) => {
        let newArr = [...profileAnswers];
        newArr.splice(2, 1, event.target.value);

        setProfileAnswers(newArr);     
    };
    const handleProfile8 = (event) => {
        let newArr = [...profileAnswers];
        newArr.splice(3, 1, event.target.value);

        setProfileAnswers(newArr);     
    };
    const handleProfile9 = (event) => {
        let newArr = [...profileAnswers];
        newArr.splice(4, 1, event.target.value);

        setProfileAnswers(newArr);     
    };
    const handleProfile10 = (event) => {
        let newArr = [...profileAnswers];
        newArr.splice(5, 1, event.target.value);

        setProfileAnswers(newArr);     
    };
    const handleProfile11 = (event) => {
        let newArr = [...profileAnswers];
        newArr.splice(6, 1, event.target.value);

        setProfileAnswers(newArr);     
    };
    const handleProfile12 = (event) => {
        let newArr = [...profileAnswers];
        newArr.splice(7, 1, event.target.value);

        setProfileAnswers(newArr);     
    };
    const handleProfile13 = (event) => {
        let newArr = [...profileAnswers];
        newArr.splice(8, 1, event.target.value);

        setProfileAnswers(newArr);     
    };
    const handleProfile14 = (event) => {
        let newArr = [...profileAnswers];
        newArr.splice(9, 1, event.target.value);

        setProfileAnswers(newArr);     
    };
    const handleProfile15 = (event) => {
        let newArr = [...profileAnswers];
        newArr.splice(10, 1, event.target.value);

        setProfileAnswers(newArr);     
    };
    const handleProfile16 = (event) => {
        let newArr = [...profileAnswers];
        newArr.splice(11, 1, event.target.value);

        setProfileAnswers(newArr);     
    };
    const handleSubmit = (event) => {
        const loggedInUser = localStorage.getItem("token");
        setConfirmMessage(true);

        fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/user/update_self', 

        {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            },
            body: JSON.stringify({
              name: name,  
              email: email,
              school: school,
              grade: grade,
              pfp: pfp,
              signature: signature,
              sport: sport,
              position: position,
              subject: subject,
              hobby: hobby,
              profileAnswers: profileAnswers
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Could not change profile');
                  }else{
                    return response.json()}
                  }
            )
            .then(data => {
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
        });
            if (typeof event == "object") {
                event.preventDefault();
            }
            //console.log(typeof event)
    }
    const loggedInUser1 = localStorage.getItem("token");

    const downloadFileDocument = () => {
		const input = document.getElementById("goals");
		html2canvas(input).then((canvas) => {
		  const pdf = new jsPDF("p", "pt", [canvas.width + 40, canvas.height + 40]); // Add 20pt padding to each edge
		  const imgWidth = pdf.internal.pageSize.getWidth() - 40; // Subtract 20pt padding from each edge
		  const imgHeight = (canvas.height * imgWidth) / canvas.width;
		  let position = 0;
	  
		  while (position < canvas.height) {
			const nextPageCanvas = document.createElement("canvas");
			nextPageCanvas.width = canvas.width;
			nextPageCanvas.height = canvas.height - position;
			const nextPageCtx = nextPageCanvas.getContext("2d");
			nextPageCtx.drawImage(
			  canvas,
			  0,
			  position,
			  canvas.width,
			  canvas.height - position,
			  0,
			  0,
			  canvas.width,
			  canvas.height - position
			);
	  
			const nextPageImgData = nextPageCanvas.toDataURL("image/png");
			pdf.addImage(
			  nextPageImgData,
			  "JPEG",
			  20, // Add 20pt margin to the left
			  20 + position * (imgWidth / canvas.width), // Add 20pt margin to the top, and adjust for previous pages
			  imgWidth,
			  imgHeight
			);
			position += imgHeight;
	  
			if (position < canvas.height) {
			  pdf.addPage();
			}
		  }
	  
		  pdf.save("GoalsPage.pdf");
		});
	};

    return (
        <div className="max-w-4xl mx-auto py-3">
            {loggedInUser1? 
            <div id="goals">
                <ChatbotModal />
                {/*<SitePal embed='8617581,480,256,"",1,1,2757903,0,1,1,"6dLYoNB4IRHxqMM6DV1N4RkwE76b00KC",0,0,"256|480|15|15|L|B|false|0|0|0|0|https://vhss.oddcast.com/admin/img//no_image.jpg|Double%20click%20to%20play%20me|0|C|0|0|0|0"'/>*/}
                <h2 class="text-center text-5xl my-6 py-3 font-semibold mb-4">My Career Transition Plan</h2>
                <hr class="my-4"/>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
					<h2 className="font-semibold text-lg">Complete each section and save all responses below when finished. If you need assistance or ideas just ask the TSA chat (located in the bottom right corner).</h2>
                </div>
                <br/>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <ThemeProvider theme={theme}>
                        <Button onClick={(e)=> handleSubmit(e)} variant="contained">
                            Save All Responses
                        </Button>
                    </ThemeProvider>
                </div>
                </div>
                <br/>
                <div>
                    <div>
                        <h2 className="font-semibold text-lg">Some of your hobbies:</h2>
                        <div>
                            <TextField
                            variant="filled"
                            label="Hobbies"
                            defaultValue={hobby}
                            multiline
                            fullWidth
                            focused
                            rows={1}
                            onChange={handleProfile1}
                            inputProps={{ style: { color: 'black' } }} />
                        </div>
                        <br/>
                        <h2 className="font-semibold text-lg">What soft skills do you get from your favorite hobby?</h2>
                        <div>
                            <TextField
                            variant="filled"
                            label="Hobby soft skills"
                            defaultValue={profileAnswers[0]}
                            multiline
                            fullWidth
                            focused
                            rows={1}
                            onChange={handleProfile2}
                            inputProps={{ style: { color: 'black' } }} />
                        </div>
                        <br/>
                        <h2 className="font-semibold text-lg">If you play sports, what is your primary position?</h2>
                        <div>
                            <TextField
                            variant="filled"
                            label="Position"
                            defaultValue={sport}
                            multiline
                            fullWidth
                            focused
                            rows={1}
                            onChange={handleProfile3}
                            inputProps={{ style: { color: 'black' } }} />
                        </div>
                        <br/>
                        <h2 className="font-semibold text-lg">If you play sports, what soft skills do you get from your position?</h2>
                        <div>
                            <TextField
                            variant="filled"
                            label="Position soft skills"
                            defaultValue={position}
                            multiline
                            fullWidth
                            focused
                            rows={1}
                            onChange={handleProfile4}
                            inputProps={{ style: { color: 'black' } }} />
                        </div>
                        <br/>
                        <h2 className="font-semibold text-lg">Your desired career:</h2>
                        <div>
                            <TextField
                            variant="filled"
                            label="Career"
                            defaultValue={profileAnswers[1]}
                            multiline
                            fullWidth
                            focused
                            rows={1}
                            onChange={handleProfile5}
                            inputProps={{ style: { color: 'black' } }} />
                        </div>
                        <br/>
                        <h2 className="font-semibold text-lg">If you are a student, what is your favorite academic subject?</h2>
                        <div>
                            <TextField
                            variant="filled"
                            label="Subject"
                            defaultValue={subject}
                            multiline
                            fullWidth
                            focused
                            rows={1}
                            onChange={handleProfile6}
                            inputProps={{ style: { color: 'black' } }} />
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <h2 className="font-semibold text-lg">If you are a student, is your GPA in good standing?</h2>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                        <FormControlLabel value="n/a" control={<Radio />} label="N/A" />
                    </RadioGroup>
                    <br/>
                    <h2 className="font-semibold text-lg">If you are a college student, do you know your major or are you currently in a major that aligns with your desired career?</h2>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                        <FormControlLabel value="n/a" control={<Radio />} label="N/A" />
                    </RadioGroup>
                    <br/>
                    <h2 className="font-semibold text-lg">Are you currently in courses or have you taken courses that are aligned with your desired career?</h2>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                    <br/>
                    <h2 className="font-semibold text-lg">Do you know someone who is already in the career field you would like to pursue?</h2>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                    <br/>
                    <h2 className="font-semibold text-lg">Do you have a company you want to work for?</h2>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                    <br/>
                    <br/>
                    <div>
                        <h2 className="font-semibold text-lg">If you have taken the Gallup Strengths Assessment, what are your top 5 strengths?</h2>
                        <div>
                            {/*<TextField
                            variant="outlined"
                            label="Education Goal"
                            placeholder="Examples: To score at least 95% on my math test; To get a 3.5 gpa this year; To read and study for 30 mins a day"
                            defaultValue={profileAnswers[3]}
                            multiline
                            fullWidth
                            focused
                            rows={1}
                            onChange={handleProfile4}
                            inputProps={{ style: { color: 'black' } }} /> */}
                            <TextField
                            style={{ marginRight: '30px', marginBottom: '30px' }}
                            variant="filled"
                            label="Strength 1"
                            defaultValue={profileAnswers[2]}
                            multiline
                            focused
                            rows={1}
                            onChange={handleProfile7}
                            inputProps={{ style: { color: 'black' } }} />

                            <TextField
                            style={{ marginRight: '30px', marginBottom: '30px' }}
                            variant="filled"
                            label="Strength 2"
                            defaultValue={profileAnswers[3]}
                            multiline
                            focused
                            rows={1}
                            onChange={handleProfile8}
                            inputProps={{ style: { color: 'black' } }} />

                            <TextField
                            style={{ marginRight: '30px', marginBottom: '30px' }}
                            variant="filled"
                            label="Strength 3"
                            defaultValue={profileAnswers[4]}
                            multiline
                            focused
                            rows={1}
                            onChange={handleProfile9}
                            inputProps={{ style: { color: 'black' } }} />

                            <TextField
                            style={{ marginRight: '30px' }}
                            variant="filled"
                            label="Strength 4"
                            defaultValue={profileAnswers[5]}
                            multiline
                            focused
                            rows={1}
                            onChange={handleProfile10}
                            inputProps={{ style: { color: 'black' } }} />

                            <TextField
                            style={{ marginRight: '30px' }}
                            variant="filled"
                            label="Strength 5"
                            defaultValue={profileAnswers[6]}
                            multiline
                            focused
                            rows={1}
                            onChange={handleProfile11}
                            inputProps={{ style: { color: 'black' } }} />
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <h2 className="font-semibold text-lg">Write 3 goals or tasks you will do in the next 3 months. They can be educational, professional or career goals.</h2>
                        <div>
                            <TextField
                            variant="filled"
                            label="Goal 1"
                            defaultValue={profileAnswers[7]}
                            multiline
                            fullWidth
                            focused
                            rows={1}
                            onChange={handleProfile12}
                            inputProps={{ style: { color: 'black' } }} />
                        </div>
                        <br/>
                        <div>
                            <TextField
                            variant="filled"
                            label="Goal 2"
                            defaultValue={profileAnswers[8]}
                            multiline
                            fullWidth
                            focused
                            rows={1}
                            onChange={handleProfile13}
                            inputProps={{ style: { color: 'black' } }} />
                        </div>
                        <br/>
                        <div>
                            <TextField
                            variant="filled"
                            label="Goal 3"
                            defaultValue={profileAnswers[9]}
                            multiline
                            fullWidth
                            focused
                            rows={1}
                            onChange={handleProfile14}
                            inputProps={{ style: { color: 'black' } }} />
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <h2 className="font-semibold text-lg">Identify a support person who can keep you accountable to your goals.</h2>
                        <div>
                            <TextField
                            variant="filled"
                            label="Name"
                            defaultValue={profileAnswers[10]}
                            multiline
                            fullWidth
                            focused
                            rows={1}
                            onChange={handleProfile15}
                            inputProps={{ style: { color: 'black' } }} />
                        </div>
                        <br/>
                        <div>
                            <TextField
                            variant="filled"
                            label="Email"
                            defaultValue={profileAnswers[11]}
                            multiline
                            fullWidth
                            focused
                            rows={1}
                            onChange={handleProfile16}
                            inputProps={{ style: { color: 'black' } }} />
                        </div>
                    </div>
                </div>
            </div> : 
            <>
            <Navigate to="/" />
            {/* <h1 className="text-center text-4xl my-10">No one is logged in</h1>
            <Link className="flex justify-center" to="/">
                <Button variant="outlined">Back to home</Button>
            </Link> */}
            </> }

            <div>
                <hr class="my-4"/>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
					<h2 className="font-semibold text-lg">Would you like to see any changes made? Give your feedback by completing the system survey below!</h2>
                </div>
                <br/>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <ThemeProvider theme={theme}>
						<Button variant="contained" component="a" href="https://forms.gle/TVaBoPmRtZto1BTAA" target="_blank" rel="noopener noreferrer" style={{marginLeft: "10px"}}>
							System Survey
						</Button>
					</ThemeProvider>
                </div>
                <br/>
                {confirmMessage ? <div className="text-green-800 mt-6" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Reponses have been saved!</div> : <></>}
                {
                (savedQuizzes.length > 0) ?
                    <div>
                        {
                            savedQuizzes.map(q => 
                                <div className="relative p-3 hover:bg-gray-200 rounded-md bg-gray-100 my-4 space-y-2 p-8">
                                    <h3 className="text-md font-bold leading-5 pb-2">
                                        Download Goals Page
                                    </h3>
                                    <a href={`/quizzes/${q.quizID}`} className='absolute inset-0 rounded-md focus:z-10 focus:outline-none focus:ring-2 ring-blue-400'/>
                                    
                                    <Button onClick={downloadFileDocument} size="small" variant="outlined" color="error">Download</Button>
                                </div>
                            )
                        }
                    </div> : <></>
                }
            </div>
        </div>
    )
}