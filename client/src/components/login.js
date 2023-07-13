import React, { useState, Fragment, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default function Login(props) {
	const [isOpen, setIsOpen] = useState(false);

	function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState("");
	const [password, setPassword] =  useState("");
  const [success, setSuccess] = useState();
  const [loggedIn, setLoggedIn] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(()=>{
    const logged = localStorage.getItem('token');
    if(logged){
      setLoggedIn(logged);
    }
    
  }, [])

  const handleSubmit = (event) => {
		
    setIsLoading(true);

    fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/user/login', 

    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(/*async*/ response => {
        //await sleep(2000);
        if (!response.ok) {
          setIsLoading(false);
          setSuccess(false);
          throw new Error('Could not login');
        }
        else {
          setSuccess(true);
          return response.json()
        }
      })
      .then(data => {
        console.log(data.token)
        localStorage.setItem('token', data.token)
        localStorage.setItem('id', data.id)
        localStorage.setItem('isAdmin', data.isAdmin)

        window.location.reload(false);

      })
      .catch((error) => {
        console.error('Error:', error);
    });
      event.preventDefault();
  }
  const handleClick=()=>{
    setClicked(true);

  }
  const handleLogout=()=>{
    
    //if(loggedIn){
      localStorage.clear();
      window.location.reload(false);
    //}
    
  }
	return (
		<>
			<button type="button" onClick={ loggedIn? handleLogout : openModal} className={props.btnstyle}>
				{loggedIn? "Logout" : "Login"}
			</button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Login
                </Dialog.Title>

                {/*onSubmit={(e)=> handleSubmit(e)} sx={{width: '50ch',}} spacing={2} noValidate autoComplete="off"*/}
                <Stack component="form" onSubmit={(e)=> handleSubmit(e)} sx={{width: '50ch',}} spacing={2} noValidate autoComplete="off">

                  <div className="mt-2 text-sm text-gray-500">
                  
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '55ch' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField fullWidth onChange={e => setEmail(e.target.value)} id="outlined-basic" label="E-mail" variant="outlined" />
                      <TextField type="password" fullWidth onChange={e => setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" />
                    </Box>
                    <p className="text-sm my-2.5">
                      Don't have an account?
                      <Link to="/register" class="text-blue-800"> Register here!</Link>
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={()=> handleClick()}
                    >
                      Login
                    </button>
                    <p className={`text-lg ${clicked ? "" : "hidden"}`}>{success ? "Congrats! You are logged in" : isLoading ? "" : "Could not log you in :("}</p>
                  </div>
                </Stack>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
	)
}