import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import emailjs from 'emailjs-com';
//import PaymentForm from "../components/paymentform";

export default function Register() {
	// ... your other useState declarations
	const loggedInUser = localStorage.getItem("token");
	const [username, setName] = useState("");
  	const [email, setEmail] = useState("");
  	const [school, setSchool] = useState("");
  	const [grade, setGrade] = useState("");
	const [password, setPassword] =  useState("");
	const [success, setSuccess] = useState(false);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isStudent, setIsStudent] = useState(true);
	const [schoolId, setSchoolId] = useState("");
	const [validSchoolID, setValidSchoolID] = useState(false);

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

	// Add these two functions to handle button clicks
	const handleStudentButtonClick = () => {
		setIsStudent(true);
	};

	const handleCustomerButtonClick = () => {
		setIsStudent(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsLoading(true);
		
		if(validSchoolID || !isStudent){
		  fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/user/register', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  name: username,
			  email: email,
			  school: school,
			  grade: grade,
			  password: password,
			  signature: isStudent
			})
		  })
			.then(response => {
			  if (response.ok) {
				setSuccess(true);
				return response.json()
			  }else {
				setIsLoading(false);
				setSuccess(false);
				throw new Error('Could not register');
			  }
			})
			.then(data => {
			  // Send email with account information (sanethia@yoursecondshot.com)
			  const serviceId = 'service_vxwo8t4';
			  const templateId = 'template_c4fc73p';
			  const publicKey = 'Ak_wlu-nZjVMoQtG8';
		
			  const templateParams = {
				username: username,
				email: email,
				school: school,
				grade: grade,
				password: password
			  };
		
			  emailjs.send(serviceId, templateId, templateParams, publicKey)
				.then((result) => {
				  console.log(result.text);
				}, (error) => {
				  console.log(error.text);
				});
		
			  console.log(data)
			})
			.catch((error) => {
			  console.error('Error:', error);
			});
		}else{
		  setIsLoading(false);
		  setSuccess(false);
		  console.error('Invalid School ID');
		}
	}

	const handleEmail = (e)=>{
		setEmail(e.target.value);
	}

	const handlePassword = (e)=>{
		setPassword(e.target.value);
	}

	// Add this function to validate the school ID
	const validateSchoolId = async (id) => {
		const response = await fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/access_code/get_school_id/' + id);
		const data = await response.json();

		return data.valid;
	}

	const handleSchoolIdChange = async (e) => {
		const id = e.target.value;
		setSchoolId(id);

		const isValid = await validateSchoolId(id);

		if (isValid) {
			setValidSchoolID(true);
		} else {
			setValidSchoolID(false);
		}
	}
  
	return (
		<div className="max-w-4xl mx-auto justify-middle py-3 block">
		  {!loggedInUser ? (
			<>
			  <h2 className="text-center my-6 py-3 text-5xl font-semibold">
				Registration
			  </h2>
			  <div className="flex justify-center space-x-2 mb-6">
				<Button
				  onClick={handleStudentButtonClick}
				  style={{
					backgroundColor: isStudent ? "navy" : "white",
					color: isStudent ? "white" : "navy",
					borderColor: "navy",
					borderStyle: "solid",
					borderWidth: "1px",
				  }}
				>
				  I Have an Access Code
				</Button>
				<Button
				  onClick={handleCustomerButtonClick}
				  style={{
					backgroundColor: !isStudent ? "navy" : "white",
					color: !isStudent ? "white" : "navy",
					borderColor: "navy",
					borderStyle: "solid",
					borderWidth: "1px",
				  }}
				>
				  Purchase Assessment
				</Button>
			  </div>
			  <Stack
				component="form"
				onSubmit={(e) => handleSubmit(e)}
				sx={{ width: "30ch" }}
				spacing={2}
				noValidate
				autoComplete="off"
			  >
				<TextField onChange={e => setName(e.target.value)} value={username} id="outlined-basic" label="Name" variant="outlined" />
				<TextField onChange={e => handleEmail(e)} value={email} id="outlined-basic" label="E-Mail" variant="outlined" />
				<TextField onChange={e => setSchool(e.target.value)} value={school} id="outlined-basic" label="School" variant="outlined" />
				<TextField onChange={e => setGrade(e.target.value)} value={grade} id="outlined-basic" label="Grade" variant="outlined" />
				<TextField onChange={e => handlePassword(e)} value={password} id="outlined-basic" label="Password" variant="outlined" />
				{isStudent && (
				  <>
					<TextField onChange={e => handleSchoolIdChange(e)} value={schoolId} id="outlined-basic" label="School ID" variant="outlined" />
				  </>
				)}
				<Button onClick={handleOpen} variant="outlined" type="submit">Register</Button>
			  </Stack>
			  <Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			  >
				{isStudent?
				<Box sx={style}>
				  <h2 className="text-xl">
					{success ? "Success! You are now registered" : isLoading ? "" : "Oops, We had trouble registering you"}
				  </h2>
				  <p className="text-lg" id="modal-modal-description" sx={{ mt: 2 }}>
					{success ? "Click on login to sign in to your account" : isLoading ? "" : "Check if the school ID is valid and try again"}
				  </p>
				</Box>:
				<Box sx={style}>
				  <h2 className="text-xl">
					Payment Feature Coming Soon!
				  </h2>
				  <p className="text-lg" id="modal-modal-description" sx={{ mt: 2 }}>
				  	{success ? "(Registration was SUCCESSFUL, but future versions will require payment)" : isLoading ? "" : "(Registration was UNSUCCESSFUL...future versions will require payment)"}
				  </p>
				</Box>}
			  </Modal>
			</>
			) : (
			<Navigate to="/" />
			)}
		</div>
	);
}