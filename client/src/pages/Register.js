import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import emailjs from "emailjs-com";
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Register() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [payment, setPayment] = useState(searchParams.get("payment"));
  const loggedInUser = localStorage.getItem("token");
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPaySuccess, setPaySuccess] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setPaySuccess(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [schoolId, setSchoolId] = useState("");
  const [validSchoolID, setValidSchoolID] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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

  const openWindowAndListen = () => {
    let user = {
      username: username,
      email: email,
      school: school,
      grade: grade,
      password: password,
      signature: isStudent,
      isStudent: isStudent,
    };

    localStorage.setItem("user", JSON.stringify(user));

    let url =
      process.env.REACT_APP_S_HOST +
      ":" +
      process.env.REACT_APP_S_PORT +
      `/api/payment/create?currency=USD`;

    window.open(url, "_top");
  };

  const handleStudentButtonClick = () => {
    setIsStudent(true);
    setShowForm(true);
  };

  const handleCustomerButtonClick = () => {
    if(localStorage.getItem("paymentCompleted")) {
      setIsStudent(false);
      setShowForm(true);
      setPaySuccess(true);
    }
    else {
      openWindowAndListen();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (isStudent && !validSchoolID) {
      setIsLoading(false);
      setSuccess(false);
      console.error("Invalid School ID");
      return;
    }
    fetch(
      process.env.REACT_APP_S_HOST +
        ":" +
        process.env.REACT_APP_S_PORT +
        "/api/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email: email,
          school: school,
          grade: grade,
          password: password,
          signature: isStudent,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          setSuccess(true);
          localStorage.removeItem("tutorialCompleted");
          localStorage.removeItem("paymentCompleted");
          return response.json();
        } else {
          setIsLoading(false);
          setSuccess(false);
          throw new Error("Could not register");
        }
      })
      .then((data) => {
        const serviceId = "service_vxwo8t4";
        const templateId = "template_c4fc73p";
        const publicKey = "Ak_wlu-nZjVMoQtG8";

        const templateParams = {
          username: username,
          email: email,
          school: school,
          grade: grade,
          password: password,
        };

        emailjs.send(serviceId, templateId, templateParams, publicKey).then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );

        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateSchoolId = async (id) => {
    const response = await fetch(
      process.env.REACT_APP_S_HOST +
        ":" +
        process.env.REACT_APP_S_PORT +
        "/api/access_code/get_school_id/" +
        id
    );
    const data = await response.json();

    return data.valid;
  };

  const handleSchoolIdChange = async (e) => {
    const id = e.target.value;
    setSchoolId(id);

    const isValid = await validateSchoolId(id);

    if (isValid) {
      setValidSchoolID(true);
    } else {
      setValidSchoolID(false);
    }
  };

  const removeErrorParam = () => {
    if (searchParams.has("payment")) {
      searchParams.delete("payment");
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    if (payment === "paid") {
      localStorage.setItem("paymentCompleted", "true");
      setIsStudent(false);
      setShowForm(true);
      setPaySuccess(true);
      removeErrorParam();
    } else if (payment === "unpaid") {
      setIsStudent(false);
      setIsLoading(false);
      setSuccess(false);
      handleOpen();
      removeErrorParam();
    }
  }, [payment]);

  return (
    <div className="max-w-4xl mx-auto justify-middle py-3 block">
      {!loggedInUser ? (
        <>
          {!showForm ? (
            <div>
              <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                  <h2 className="text-center my-6 py-3 text-5xl font-semibold">
                    Registration
                  </h2>
                  <hr class="my-4"/>
                  <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <h2 className="font-semibold text-lg">Select the option that applies to you.</h2>
                  </div>
                  <br/>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <ThemeProvider theme={theme}>
                  <Button variant="contained" component="a" onClick={handleStudentButtonClick} target="_blank" rel="noopener noreferrer" style={{marginLeft: "10px"}}>
                    I Have an Access Code
                  </Button>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Button variant="contained" component="a" onClick={handleCustomerButtonClick} target="_blank" rel="noopener noreferrer" style={{marginLeft: "10px"}}>
                    Purchase Assessment
                  </Button>
                </ThemeProvider>
              </div>
            </div>
          ) : (
            <div>
              {isStudent ?
              (
              <h2 className="text-center my-6 py-3 text-5xl font-semibold">
                    Complete Student Account
              </h2>
              )
              :
              (
              <h2 className="text-center my-6 py-3 text-5xl font-semibold">
                    Complete Standard User Account
              </h2>
              )}
            <Stack
              component="form"
              onSubmit={(e) => handleSubmit(e)}
              sx={{ width: "30ch" }}
              spacing={2}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={(e) => setName(e.target.value)}
                value={username}
                id="outlined-basic"
                label="Name"
                variant="outlined"
              />
              <TextField
                onChange={(e) => handleEmail(e)}
                value={email}
                id="outlined-basic"
                label="E-Mail"
                variant="outlined"
              />
              <TextField
                onChange={(e) => setSchool(e.target.value)}
                value={school}
                id="outlined-basic"
                label="School"
                variant="outlined"
              />
              <TextField
                onChange={(e) => setGrade(e.target.value)}
                value={grade}
                id="outlined-basic"
                label="Grade/Class"
                variant="outlined"
              />
              <TextField
                onChange={(e) => handlePassword(e)}
                value={password}
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
              {isStudent && (
                <>
                  <TextField
                    onChange={(e) => handleSchoolIdChange(e)}
                    value={schoolId}
                    id="outlined-basic"
                    label="School ID"
                    variant="outlined"
                  />
                </>
              )}
              <Button onClick={handleOpen} variant="outlined" type="submit">
                Register
              </Button>
            </Stack>
            </div>
          )}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            {isStudent ? (
              <Box sx={style}>
                <h2 className="text-xl">
                  {success
                    ? "Success! You are now registered."
                    : isLoading
                    ? ""
                    : "Oops, We had trouble registering you."}
                </h2>
                <p
                  className="text-lg"
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                >
                  {success
                    ? "Click on \"login\" to sign in to your account."
                    : isLoading
                    ? "Loading..."
                    : "Check if the school ID is valid and try again."}
                </p>
              </Box>
            ) : (
              <Box sx={style}>
                <h2 className="text-xl">
                  {success
                    ? "Success! You are now registered."
                    : isLoading
                    ? ""
                    : "Oops, We had trouble registering you."}
                </h2>
                <p
                  className="text-lg"
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                >
                  {success
                    ? "Click on \"login\" to sign in to your account."
                    : isLoading
                    ? "Loading..."
                    : "Check that your payment details are correct."}
                </p>
              </Box>
            )}
          </Modal>
          <Modal
            open={showPaySuccess}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <h2 className="text-xl">
                  Payment successful!
                </h2>
                <p
                  className="text-lg"
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                >
                  Fill out the remaining info to complete your account.
                </p>
              </Box>
          </Modal>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}