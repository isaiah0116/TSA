import React, {useState, Fragment, useEffect} from "react";
import { CogIcon, PencilAltIcon, ChevronDownIcon } from "@heroicons/react/outline";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Stack } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import {Link, Navigate} from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import { Scrollbars } from 'react-custom-scrollbars';
import { Dialog, Transition } from "@headlessui/react";

//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default function Settings(props) {
    const [profileData, setProfileData] = useState({});
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [school, setSchool] = React.useState();
    const [grade, setGrade] = React.useState();
	const [signature, setSignature] = React.useState();
    const [pfp, setPfp] = React.useState();
    const [sport, setSport] = React.useState();
    //const [clusterPoints, setClusterPoints] = React.useState();

    const [clicked, setClicked] = useState(false);
	const [password, setPassword] =  useState("");
    const [success, setSuccess] = useState();
    const [loggedIn, setLoggedIn] = useState();

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
      //setClusterPoints(data.clusterPoints)
		})
		.catch();
    }, []);
    //--------------------

	const [isOpen, setIsOpen] = useState(false);

	function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleClick=()=>{
        setClicked(true);
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
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

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
    const handleEmailChange = (event) => {
    setEmail(event.target.value);
    };
    const handleSchoolChange = (event) => {
      setSchool(event.target.value);
    };
    const handleGradeChange = (event) => {
      setGrade(event.target.value);
    };
    const handleSubmit = (event) => {
        const loggedInUser = localStorage.getItem("token");

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
            event.preventDefault();
    }
    const [successDelete, setSuccessDelete] = useState(false);
    const loggedInUser1 = localStorage.getItem("token");
    const handleDelete= ()=>{
        const loggedInUser = localStorage.getItem("token");

        fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/user/delete_self', 

            {
                method: 'DELETE',
                headers:{
                    'Authorization': 'Bearer ' + loggedInUser
                },
                
            })
                .then(response => {
                    if (!response.ok) {
                        setSuccessDelete(false);
                        throw new Error('Could not delete profile');
                        
                      }else{
                        setSuccessDelete(true);
                        return response.json()}
                      }
                )
                .then(data => {
                    console.log(data)
                    localStorage.clear();
                    
                    
                    // localStorage.setItem('token', data)
                })
                .catch((error) => {
                    console.error('Error:', error);
            });
            handleOpen1();
            //window.location.reload(false);
    }

	return (
		<>
			<button type="button" onClick={handleOpen} className={props.btnstyle}>
				Settings
			</button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Scrollbars style={{ width: 320, height: 400 }}> 
                    <div className="flex">
                        <CogIcon className="h-6 w-6 my-2 mr-1"/>
                        <p className="text-md">Settings</p>
                    </div>
                    
                    <div className="my-3">
    
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ChevronDownIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <p className="text-base">Your Name</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2} component="form" onSubmit={(e)=> handleSubmit(e)}>
                                <div className=" mb-2 pb-3">
                                    <p className="text-base font-semibold">Current name:</p>
                                    <p className="text-sm">{profileData.name}</p>
                                </div>
                                <TextField onChange={handleNameChange} fullWidth id="outlined-basic" label="New name" variant="outlined" />
                                <Button type="submit" variant="outlined">Save Changes</Button>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
    
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ChevronDownIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <p className="text-base">Your E-mail Address</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2} component="form" onSubmit={(e)=> handleSubmit(e)}>
                                <div className=" ">
                                    <p className="text-base font-semibold">Current email:</p>
                                    <p className="text-sm">{profileData.email}</p>
                                </div>
                                <TextField onChange= { e => setEmail(e.target.value)} fullWidth id="outlined-basic" label="New email" variant="outlined" />
                                <TextField fullWidth id="outlined-basic" label="Re-enter New email" variant="outlined" />
                                <Button type="submit" variant="outlined">Save Changes</Button>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
    
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ChevronDownIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <p className="text-base">Your School/Grade</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2} component="form" onSubmit={(e)=> handleSubmit(e)}>
                                <TextField onChange={handleSchoolChange} value={school} fullWidth id="outlined-basic" label="School name" variant="outlined" />
                                                <TextField onChange={handleGradeChange} value={grade} fullWidth id="outlined-basic" label="Grade" variant="outlined" />
                                <Button type="submit" variant="outlined">Save Changes</Button>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
    
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ChevronDownIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <p className="text-base">Change Your Password</p>
                        </AccordionSummary>
                        
                        <AccordionDetails>
                            <Stack spacing={2} component="form" onSubmit={(e)=> handleSubmit(e)}>
                                <TextField className= "my-2" fullWidth id="outlined-basic" label="Current Password" variant="outlined" />
                                <TextField fullWidth id="outlined-basic" label="New Password" variant="outlined" />
                                <TextField fullWidth id="outlined-basic" label="Re-enter New Password" variant="outlined" />
                                <Button type="submit" variant="outlined">Save Changes</Button>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
    
                    </div>
                    <div className="my-3">
                        <Button onClick={handleDelete} variant="outlined" color="error">
                            Delete Account
                            <Link to="/home"></Link>
                        </Button>
                        {/* <div>{successDelete? "Deleted successfully" : " "}</div> */}
                        
                    </div>
                    </Scrollbars>
                    </Box>
                </Modal>
    </>
	)
}