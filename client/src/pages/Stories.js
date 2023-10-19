import React, { useEffect, useState } from "react";
import { Card, CardActionArea, CardMedia, CardContent, Box, Modal, Stack, Button, Grid} from '@mui/material';
import { Navigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import chris from "../images/chris.jpeg"
import chris2 from "../images/chris2.jpeg"
import colvin from "../images/colvin.jpeg"
import colvin2 from "../images/colvin2.jpg"
import tiki from "../images/Tiki.jpeg"
import tiki2 from "../images/tiki1.jpg"
import tobias from "../images/tobias.png"
import tobias2 from "../images/tobias2.jpeg"
import dwight from "../images/dwight.jpeg"
import dwight2 from "../images/dwight2.jpeg"
import landon from "../images/landon.jpeg"
import landon2 from "../images/landon2.jpeg"
import leland from "../images/leland.jpeg"
import leland2 from "../images/leland2.jpeg"
import peter from "../images/peter.jpeg"
import peter2 from "../images/peter2.jpeg"
import reggie from "../images/reggie.jpeg"
import reggie2 from "../images/reggie2.jpeg"
import myron from "../images/myron.jpeg"
import myron2 from "../images/myron2.jpeg"
import DawnStaley from "../images/Dawn.jpeg"
import DawnStaley2 from "../images/DawnStaley2.jpeg"  
import LisaLeslie from "../images/LisaLeslie.jpeg"
import LisaLeslie2 from "../images/LisaLeslie2.jpeg" 
import RachelDunn from "../images/RachelDunn.jpeg"
import RachelDunn2 from "../images/RachelDunn2.jpeg"
import JoBrigdenJones from "../images/JoanneBrigden.jpeg"
import JoBrigdenJones2 from "../images/Joanne2.jpeg"
import JohnWomack from "../images/JohnWomack.jpeg"
import JohnWomack2 from "../images/JohnWomack2.jpeg"


import ReactCardFlip from 'react-card-flip'; 

export default function Stories(){
    const [query, setQuery] = useState("")
    const [stories, setStories] = useState([])
    const [defaultStories, setDefaultStories] = useState([
        {
            id:0,
            photo1: chris,
            photo2: chris2,
            name: "Chriss Carr",
            flipped: false,
            title: "Former NFL Player in Law, Public Safety, ​Corrections and Security",
            job: "Criminal and Immigration Lawyer​",
            school: "Boise State (2005)",
            position:"Cornerback / Kick Return",
            playedFor: "Oakland Raiders (2005-2007), Tennessee Titans (2008)​, Baltimore Ravens (2009-2011), Minnesota Vikings (2012), San Diego Chargers (2012), New Orleans Saints (2013)​"
        },
        {   id:1,
            photo1: colvin,
            photo2: colvin2,
            name: "Rosevelt Colvin​",
            flipped: false,
            title: "Former NFL Player in Manufacturing​",
            job: "UPS Shipping and Cupcakes​​",
            school: "Purdue (1999)​",
            position:"Outside Linebacker",
            playedFor: "Chicago Bears (1999-2002, 2008), New England Patriots (2003-2007)​, Houston Texans (2008)"
        },
        {   id:2,
            photo1: tiki,
            photo2: tiki2,
            name: "Tiki Barber",
            flipped: false,
            title: "Former NFL Player in Marketing",
            job: "Cofounded Thuzio a marketing branding company​​",
            school: "Virginia (1997)",
            position:"Running Back​",
            playedFor: "New York Giants (1997-2006​)"
        },
        {   id:3,
            photo1: tobias,
            photo2: tobias2,
            name: "Tobias Dorzon​",
            flipped: false,
            title: "Former NFL Player in Hospitality",
            job: "Chef​​",
            school: "Jackson State University and the Art Institute of Washington",
            position:"Tail Back​",
            playedFor: "Tennessee Titans (2010)"
        },
        {   id:4,
            photo1: dwight,
            photo2: dwight2,
            name: "Dwight Hollier​​",
            flipped: false,
            title: "Former NFL Player in Human Services ",
            job: "Counselor, Motivational Speaker​​​",
            school: "North Carolina (1992)​",
            position:"Linebacker",
            playedFor: "Miami Dolphins (1992-1999), Indianapolis Colts (2000)​"
        },
        {   id:5,
            photo1: landon,
            photo2: landon2,
            name: "Landon Cohen",
            flipped: false,
            title: "Former NFL Player in Transportation",
            job: "CEO of Limo Service",
            school: "Ohio (2008)",
            position:"Defensive Tackle​",
            playedFor: "Detroit Lions (2008-2009), Jacksonville Jaguars (2010)​, New England Patriots (2011), Seattle Seahawks ( 2011, 2014-2015), Arizona Cardinals (2012), Philadelphia Eagles (2012), Dallas Cowboys (2013), Chicago Bears (2013), Buffalo Bills (2014)​"
        },
        {   id:6,
            photo1: leland,
            photo2: leland2,
            name: "Leland Melvin",
            flipped: false,
            title: "Former NFL Player in STEM",
            job: "Astronaut, Engineer, and STEM Educator​​​​",
            school: "University of Richmond (1985), University of Virginia (1991)​​",
            position:"Wide Receiver ​",
            playedFor: "Detroit Lions, Dallas Cowboys​"
        },
        {   id:7,
            photo1: myron,
            photo2: myron2,
            name: "Myron Rolle",
            flipped: false,
            title: "Former NFL Player in Health Science",
            job: "Neurosurgeon​​​​",
            school: "Florida State University (2010), Oxford University (2010), Harvard Medical School​​",
            position:"Safety​",
            playedFor: "Tennessee Titans (2010-2011), Pittsburg Steelers (2012)​"
        },
        {   id:8,
            photo1: peter,
            photo2: peter2,
            name: "Peter Boulware​",
            flipped: false,
            title: "Former NFL Player in Government ​& Public Administration",
            job: "Republican Candidate for House of Representatives in 2008​",
            school: "Florida State (1997)​​​",
            position:"Linebacker​​",
            playedFor: "Baltimore Ravens (1997-2005)​"
        },
        {   id:9,
            photo1: reggie,
            photo2: reggie2,
            name: "Reggie Howard",
            flipped: false,
            title: "Former NFL Player in Information Technology",
            job: "Co-Founder of a Tech Company for Social Good​​​​",
            school: "Memphis (2000)​",
            position:"Cornerback​",
            playedFor: "Oakland Raiders (2000), Carolina Panthers (2000-2003, 2006), Miami Dolphins (2004-2005)​"
        },
        {   id:10,
            photo1: DawnStaley,
            photo2: DawnStaley2,
            name: "Dawn Staley",
            flipped: false,
            title: "Former WNBA Player in Professional Coaching",
            job: "Head coach for the South Carolina Gamecocks",
            school: "University of Virgina (1988–1992)​",
            position:"Point Guard​",
            playedFor: "Regular Season: Charlotte (1999-2005), Houston (2005-2006) ; Playoffs: Charlotte (1999-2003), Houston (2005-2006)​"
        },
        {   id:11,
            photo1: LisaLeslie,
            photo2: LisaLeslie2,
            name: "Lisa Leslie",
            flipped: false,
            title: "Former WNBA Player in Professional Coaching and Journalism",
            job: "Head coach for Triplets in the BIG3 professional basketball league, as well as a studio analyst for Orlando Magic broadcasts on Fox Sports Florida",
            school: "University of Southern California (1990–1994)​",
            position:"Center​",
            playedFor: "Regular Season: Los Angeles (1997-2009) ; Playoffs: Los Angeles (1999-2009)​"
        },
        {   id:12,
            photo1: RachelDunn,
            photo2: RachelDunn2,
            name: "Rachel Dunn",
            flipped: false,
            title: "English international netball player in STEM",
            job: "Full-time job as a genetic technologist working in a NHS laboratory",
            school: "University of Bath",
            position:"GS, GA",
            playedFor: "Surrey Storm (2009-2016), Wasps Netball (2017-2022)​"
        },

        {   id:13,
            photo1: JoBrigdenJones,
            photo2: JoBrigdenJones2,
            name: "Jo Brigden-Jones",
            flipped: false,
            title: " Australian kayaker in STEM",
            job: "Full-time job as a Paramedic for NSW Ambulance",
            school: " University of Technology, Sydney (2006-2010), Charles Sturt University (2010)",
            playedFor: "Australia in London 2012 Olympic Games, Australia in Tokyo 2020 Olympic Games​"
        },

        {
            id: 14,
            photo1: JohnWomack,
            photo2: JohnWomack2,
            name: "John Womack III",
            flipped: false,
            title: "Former College Football Player in Technology",
            job: "Director of Industry Engagement, UF College of Engineering",
            school: "University of Virginia",
            position: "Defensive Back",
            playedFor: "Virginia Cavaliers Football Team​"
        }
    ]) 
    const handleToggleComplete = (storyId) => {
        const newList = stories.map((item) => {
            if (item.id === storyId) {
                const updatedItem = {
                    ...item,
                    flipped: !item.flipped,
                };
                return updatedItem;
            }
            return item;
        });
        setStories(newList);
    }
    const [isAdmin, setIsAdmin] = useState();
   
    useEffect(()=>{
        const admin = localStorage.getItem('isAdmin') === 'true';
		const logged = localStorage.getItem('token');
		setIsAdmin(admin);
    },[])

    useEffect(() => {
        fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/stories',{

            headers:{
                'Authorization': 'Bearer ' + loggedInUser1
            }
        })
        .then((response) => response.json())
        .then((data) => {
            const combinedStories = [...defaultStories, ...data];
            setStories(combinedStories);
        });
    },[]);

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
    const [name, setName] = useState()
    const [title, setTitle] = useState()
    const [job, setJob] = useState()
    const [school, setSchool] = useState()
    const [position, setPosition] = useState()
    const [photo1, setPhoto1] = useState()
    const [photo2, setPhoto2] = useState()
    const [played, setPlayed] = useState()

    const [open, setOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [storyToDelete, setStoryToDelete] = useState(null)
    const addStory = () => {
        fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/stories/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + loggedInUser1
            },
            body: JSON.stringify({
                name: name,
                title: title,
                job: job,
                school: school,
                position: position,
                photo1: photo1,
                photo2: photo2,
                playedFor: played
            })
        })
        .then((response) => response.json())
        .then((data) => setStories((prevStories) => [...prevStories, data]));
        handleClose();
    };

    const deleteStory = (id) => {
        if (!id) {
            alert("Please select a story to delete.");
            return;
        }
        fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/stories/' + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser1
            }
        })
        .then(() => {
            setStories((prevStories) => prevStories.filter((story) => story.id !== parseInt(id)));
            handleDeleteClose();
        });
    };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
      setPlayed("")
      setName("")
      setTitle("")
      setPosition("")
      setSchool("")
      setJob("")
      setPhoto1()
      setPhoto2()
	  setOpen(false);
    }
    
    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setStoryToDelete(null);
    };

    const loggedInUser1 = localStorage.getItem("token");

    return(
        <div  className="max-w-4xl mx-auto py-3">
        {loggedInUser1?
        <div>
        <div>
            <h2 class=" text-center text-5xl my-6 py-3 font-semibold">Athlete Stories</h2>
            
            <p class="text-base text-center">These are stories of athletes who played professionally and are now working in various careers.</p>
            <p class="text-base text-center">Click on a card to see the story!</p><br></br>
            <div className={`${isAdmin? 'block':'hidden'}`}>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <Button onClick={handleOpen} variant="outlined">+ Add New Story</Button>
                    <Button onClick={() => setDeleteOpen(true)} variant="outlined" style={{ marginLeft: '10px' }}>- Delete Story</Button>
                </div>
			</div>
			<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
                <Stack spacing={1}>
                    <TextField onChange={ e => setName(e.target.value)} value={name} id="outlined-basic" label="Name" variant="outlined"></TextField>
                    <TextField onChange={ e => setTitle(e.target.value)} value={title} id="outlined-basic" label="Title" variant="outlined"></TextField>
                    <TextField onChange={ e => setJob(e.target.value)} value={job} id="outlined-basic" label="Job" variant="outlined"></TextField>
                    <TextField onChange={ e => setSchool(e.target.value)} value={school} id="outlined-basic" label="School" variant="outlined"></TextField>
                    <TextField onChange={ e => setPosition(e.target.value)} value={position} id="outlined-basic" label="Position" variant="outlined"></TextField>
                    <TextField onChange={ e => setPhoto1(e.target.value)} value={photo1} id="outlined-basic" label="Front Photo Link" variant="outlined"></TextField>
                    <TextField onChange={ e => setPhoto2(e.target.value)} value={photo2} id="outlined-basic" label="Back Photo Link" variant="outlined"></TextField>
                    <TextField onChange={ e => setPlayed(e.target.value)} value={played} id="outlined-basic" label="Add a team" variant="outlined"></TextField>
                    
                    <Button color="success" onClick= {addStory} className="p-3" variant="contained">Add this story</Button>
                </Stack>
                    
                    </Box>
            </Modal>
            <div class="flex justify-center m-3 ">
						{/* <input type="text" class="px-3 py-1 w-80" placeholder="Search..."/> */}
                        <TextField onChange={ e => setQuery(e.target.value)} value={query} id="outlined-basic" label="Search" variant="outlined"></TextField>
						<button class="flex items-center justify-center px-4 border-2 rounded">
							<svg class="w-5 h-5 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24">
								<path
									d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
							</svg>
						</button>
			</div>
        </div>
        <div class="pb-8 grid gap-4 grid-cols-3 grid-rows-3">
    {stories.filter(post => {
    if (query === '') {
      return post;
    } else if (post.school.toLowerCase().includes(query.toLowerCase()) || post.title.toLowerCase().includes(query.toLowerCase())) {
      return post;
    }
  }).map((story, idx) => (
    <ReactCardFlip className="mb-5" isFlipped={story.flipped? true: false} flipDirection="vertical">
            <div className="mb-5">
                <Card sx={{ maxWidth: 400, minHeight: 500, maxHeight: 500   }} key="front">
                    <CardActionArea onClick={() => handleToggleComplete(story.id)}>
                        <CardMedia 
                        component="img"
                        height="200"
                        image={story.photo1}
                        alt="green iguana"
                        />
                        <CardContent>
                        <h2 class=" text-4xl my-2 font-semibold">{story.name}</h2>
                        <p class="text-base">
                            {story.title}
                        </p>
                        </CardContent>
                    </CardActionArea>
                </Card>

            </div>
            <div className="mb-5">
                <Card key="back" sx={{ maxWidth: 400}} style={{overflow: "hidden"}}>
                    <CardActionArea onClick={() =>handleToggleComplete(story.id)}>
                        <CardMedia sx={{ maxHeight: 250  }}
                        component="img"
                        height="200"
                        image={story.photo2}
                        alt="football player"
                        />
                        <CardContent>
                        
                       
                            <p class="text-lg pt-3 font-semibold">Current Job:</p>
                            <p class="text-base">{story.job}</p>
                            <p class="text-lg pt-3 font-semibold">School:</p>
                            <p class="text-base ">{story.school}​​</p>
                            <p class="text-lg pt-3 font-semibold">Position:</p>
                            <p class="text-base">{story.position}</p>
                            <p class="text-lg pt-3 font-semibold">Played for:</p>
                            <p class="text-base">{story.playedFor}</p>
                           
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
            
        </ReactCardFlip>
  ))
  }
   
            
           
        </div>
        </div>
        : 
		<>
		<Navigate to="/" />
		{/* <h1 className="text-center text-4xl my-10">No one is logged in</h1>
		<Link className="flex justify-center" to="/">
			<Button variant="outlined">Back to home</Button>
		</Link> */}
		</> }
        <Modal
            open={deleteOpen}
            onClose={handleDeleteClose}
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
        >
            <Box sx={style}>
                <p>Select a story to delete</p>
                <select onChange={(e) => setStoryToDelete(e.target.value)}>
                    <option value={null}>Select a story to delete</option>
                    {stories.filter(story => story.id >= 15).map(story => (
                        <option key={story.id} value={story.id}>{story.name}</option>
                    ))}
                </select>
                <Button
                    color="error"
                    onClick={() => deleteStory(Number(storyToDelete))}
                    className="p-3 mt-2"
                    variant="contained"
                >
                    Confirm Delete
                </Button>
            </Box>
        </Modal>
    </div> 
    )
      
};