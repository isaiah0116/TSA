import React, { useState } from "react";
import { Navigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

export default function CreateCodes() {
  const loggedInUser = localStorage.getItem("token");
  const [schoolId, setSchoolId] = useState("");
  const [numCodes, setNumCodes] = useState(1);
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);
	
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

	const generatePDF = () => {
		const pdf = new jsPDF();
		const headers = [["School ID", "Access Code"]];
		const data = generatedCodes.map((codeObj) => {
		  return [schoolId, codeObj.code];
		});
	  
		pdf.autoTable({
		  head: headers,
		  body: data,
		  margin: { top: 30 },
		  tableWidth: 'wrap',
		});
	  
		pdf.save("AccessCodes.pdf");
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsLoading(true);
	
		const generateCode = () => {
			const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			let result = '';
			for (let i = 0; i < 8; i++) {
				result += characters.charAt(Math.floor(Math.random() * characters.length));
			}
			return result;
		};
	
		const newGeneratedCodes = [];
	
		for (let i = 0; i < numCodes; i++) {
			const code = generateCode();
			const codeObj = {
				code: code,
				createdAt: new Date(),
			};
			newGeneratedCodes.push(codeObj);
		}
	
		setGeneratedCodes(newGeneratedCodes);
	
		const loggedInUser = localStorage.getItem("token");
	
		fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/access_code/create_access_code', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + loggedInUser
			},
			body: JSON.stringify({
				school_id: schoolId,
				access_codes: newGeneratedCodes.map(code => ({ code: code.code }))
			})
		})
		.then(async (response) => {
			if (!response.ok) {
				console.log('Response status:', response.status);
				console.log('Response text:', await response.text());
				setIsLoading(false);
				setSuccess(false);
				throw new Error('Could not create access codes');
			} else {
				setSuccess(true);
				return response.json();
			}
		})
		.then(data => {
			console.log(data)
		})
		.catch((error) => {
			console.error('Error:', error);
		})
		.finally(() => {
			setIsLoading(false);
		});
	};

	return (
		<div className="max-w-4xl mx-auto justify-middle py-3 block">
			{loggedInUser? 
			<>
					<h2 class="text-center my-6 py-3 text-5xl font-semibold">Generate Access Codes</h2>
					<Stack component="form" onSubmit={(e)=> handleSubmit(e)} sx={{width: '30ch',}} spacing={2} noValidate autoComplete="off">
						
						<TextField onChange={ e => setSchoolId(e.target.value)} value={schoolId} id="outlined-basic" label="School ID" variant="outlined" />
						<TextField onChange={ e => setNumCodes(e.target.value)} value={numCodes} id="outlined-basic" label="Number of Codes" variant="outlined" />
						<Button onClick={handleOpen} variant="outlined" type="submit">Create</Button>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={style}>
								<h2 className="text-xl">
									{success? "Access codes created successfully!" : isLoading ? "" : "Oops, We had trouble creating the access codes"}
								</h2>
								<p className="text-lg" id="modal-modal-description" sx={{ mt: 2 }}>
								{success? "View them in the database or print below:" : isLoading ? "" : "Try again"}
								
								</p>
								<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
									<button
										type="submit"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										disabled={!success}
										onClick={generatePDF}
										>
										Download Access Codes
									</button>
								</div>
							</Box>
						</Modal>
						
					</Stack>
				</>
			:
			<>
			<Navigate to="/" />

			</>

			}
    	</div>
	)
}