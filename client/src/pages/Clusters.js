import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from 'react-modal';
import ChatbotModal from "../components/chatmodal";
import CareersViaPath from "./CareersViaPath";

import Image1 from './clusterImages/image1.png';
import Image2 from './clusterImages/image2.png';
import Image3 from './clusterImages/image3.png';
import Image4 from './clusterImages/image4.png';
import Image5 from './clusterImages/image5.png';
import Image6 from './clusterImages/image6.png';
import Image7 from './clusterImages/image7.png';
import Image8 from './clusterImages/image8.png';
import Image9 from './clusterImages/image9.png';
import Image10 from './clusterImages/image10.png';
import Image11 from './clusterImages/image11.png';
import Image12 from './clusterImages/image12.png';
import Image13 from './clusterImages/image13.png';
import Image14 from './clusterImages/image14.png';
import Image15 from './clusterImages/image15.png';
import Image16 from './clusterImages/image16.png';
import Image17 from './clusterImages/image17.png';
import Image18 from './clusterImages/image18.png';
import Image19 from './clusterImages/image19.png';
import Image20 from './clusterImages/image20.png';
import Image21 from './clusterImages/image21.png';
import Image22 from './clusterImages/image22.png';
import Image23 from './clusterImages/image23.png';
import Image24 from './clusterImages/image24.png';
import Image25 from './clusterImages/image25.png';
import Image26 from './clusterImages/image26.png';
import Image27 from './clusterImages/image27.png';
import Image28 from './clusterImages/image28.png';
import Image29 from './clusterImages/image29.png';
import Image30 from './clusterImages/image30.png';
import Image31 from './clusterImages/image31.png';
import Image32 from './clusterImages/image32.png';

Modal.setAppElement('#root'); // or any other root element of your app

export default function Profile() {
  const [clusterData, setClusterData] = useState({ name: "You"});
  const [savedQuizzes, setSavedQuizzes] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedChild, setSelectedChild] = useState('');
  const navigate = useNavigate();

  const imgSRC = (image) => {
	switch (image) {
		case './clusterImages/image1.png':
			return Image1;
		case './clusterImages/image2.png':
			return Image2;
		case './clusterImages/image3.png':
			return Image3;
		case './clusterImages/image4.png':
			return Image4;
		case './clusterImages/image5.png':
			return Image5;
		case './clusterImages/image6.png':
			return Image6;
		case './clusterImages/image7.png':
			return Image7;
		case './clusterImages/image8.png':
			return Image8;
		case './clusterImages/image9.png':
			return Image9;
		case './clusterImages/image10.png':
			return Image10;
		case './clusterImages/image11.png':
			return Image11;
		case './clusterImages/image12.png':
			return Image12;
		case './clusterImages/image13.png':
			return Image13;
		case './clusterImages/image14.png':
			return Image14;
		case './clusterImages/image15.png':
			return Image15;
		case './clusterImages/image16.png':
			return Image16;
		case './clusterImages/image17.png':
			return Image17;
		case './clusterImages/image18.png':
			return Image18;
		case './clusterImages/image19.png':
			return Image19;
		case './clusterImages/image20.png':
			return Image20;
		case './clusterImages/image21.png':
			return Image21;
		case './clusterImages/image22.png':
			return Image22;
		case './clusterImages/image23.png':
			return Image23;
		case './clusterImages/image24.png':
			return Image24;
		case './clusterImages/image25.png':
			return Image25;
		case './clusterImages/image26.png':
			return Image26;
		case './clusterImages/image27.png':
			return Image27;
		case './clusterImages/image28.png':
			return Image28;
		case './clusterImages/image29.png':
			return Image29;
		case './clusterImages/image30.png':
			return Image30;
		case './clusterImages/image31.png':
			return Image31;
		case './clusterImages/image32.png':
			return Image32;
		default:
			console.log('Invalid image link!');
			return;	
	}
  };

  const displayImage = (child, goal) => {
	setSelectedGoal(goal);
	setIsModalOpen(true);
	setSelectedChild(child);
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

	const navigateToGoals = () => {
		// 👇️ navigate to /goals
		//navigate('/goals');
		window.open("https://mindmelders.top/", "_self");
	};
	
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
      //setClusterPoints(data.clusterPoints)
		})
		.catch();

		// get user mindmap

		fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/user/get_self_mindmap',{

			headers:{
				'Authorization': 'Bearer ' + loggedInUser
			}
		})
		.then(response =>{
			if (!response.ok) {
				throw new Error('Could not login');
			} else{
				return response.json()
		  }
		})
		.then(data => {
			console.log("user information: ", data);
				if (!data.err) {
					console.log("contains contents: ", clusterData)
					setClusterData(data);
				}
		});

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
		});
	  }, []);


	/*useEffect(() => {

		//Constants for the SVG
		var width = 900, height = 700;

		const root = d3.hierarchy(clusterData);
        //console.log("clusterdata:", clusterData)
		const links = root.links();
		const nodes = root.descendants();//.slice(0, 4);
        console.log("nodes:", nodes)
		var colorArr = [...d3.schemeSet1, ...d3.schemeSet2, ...d3.schemeSet3];
		var color = d3.scaleOrdinal(colorArr);
		//console.log(color.range())

		const simulation = d3.forceSimulation(nodes)
			.force("link", d3.forceLink(links).id(d => d.name).distance(d => d.target.children ? 200 : 77).strength(0.9))
			.force("charge", d3.forceManyBody().strength(-450))
			.force("x", d3.forceX())
			.force("y", d3.forceY())

		// empty svg first
		// https://reactgo.com/d3js-remove-svg/
		d3.select(".mindmap").selectAll('*').remove()

		const svg = d3.select(".mindmap")
			// re-add svg
			.append("svg")
				.attr("viewBox", [-width/2, -height/2, width, height])
		
		const link = svg
			.append("g")
				.attr("stroke", "#999")
				.attr("stroke-opacity", 0.6)
			.selectAll("line")
				.data(links)
				.join("line")

		const node = svg
			.append("g")
				.attr("fill", "#fff")
				//.attr("stroke", "#000")
				//.attr("stroke-width", 1.5)
			.selectAll("g")
				.data(nodes)
				.join("g")
					.call(drag(simulation))
					.on("click", d => {

                        if(nodes[d.target.__data__.index].parent != null) {
                            if(nodes[d.target.__data__.index].parent.index == 0) {
                                window.open(nodes[d.target.__data__.index].data.webURL)
                            }
                            else {
                                window.open(nodes[d.target.__data__.index].parent.data.webURL)
                            }
                        }
                        
					});
					
		node.append("circle")
			.attr("fill", d => color(d.data.color))
			//.attr("stroke", d => d.children ? null : "#fff")
			.attr("r", 10)
		
		node.append("text")
			.text(d => d.data.name)
			.attr("dx", 15)
			.attr("dy", ".20em")
			.attr("font-size", "19.5px")
			//.attr("font-weight", "normal")
			.attr("stroke", "#000")
			
			//.text(d => {console.log(d); return d.data.name})
		
		simulation.on("tick", () => {
			link
				.attr("x1", d => d.source.x)
				.attr("y1", d => d.source.y)
				.attr("x2", d => d.target.x)
				.attr("y2", d => d.target.y);

			d3.selectAll("circle")
				.attr("cx", d => d.x)
				.attr("cy", d => d.y);

			d3.selectAll("text")
				.attr("x", d => d.x)
				.attr("y", d => d.y);
		})

		function drag (simulation) {
            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }
            
            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }
            
            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
            
            return d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended);
        }
    }, [clusterData]);*/
    
    const loggedInUser1 = localStorage.getItem("token");

    const downloadFileDocument = () => {
		const input = document.getElementById("clusts");
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
	  
		  pdf.save("ClusterPage.pdf");
		});
	  };

    return (
        <div className="max-w-4xl mx-auto py-3">
            {loggedInUser1? 
            <div id="clusts">
				<ChatbotModal />
                <h2 class="text-center text-5xl my-6 py-3 font-semibold mb-4">Careers</h2>
				<hr class="my-4"/>
				<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
					<h2 className="font-semibold text-lg">After you finish exploring the careers below click to: </h2>
					<ThemeProvider theme={theme}>
						<Button onClick={navigateToGoals} variant="contained" style={{marginLeft: "10px"}}>
							Navigate to Goals
						</Button>
					</ThemeProvider>
            	</div>
                <br/>
                {(savedQuizzes.length == 0) ?  
                <p>No saved quizzes yet!</p>
                : <></>/*<SitePal embed='8617581,600,800,"",1,1,2754295,0,1,1,"KcaTn2rsQij64WhSN6xYDwLRUfzDkbvW",0,0'/>*/
                }
                {/*{(savedQuizzes.length > 0) ? 
					<div>
						<br/>
						<h2 className="font-semibold text-lg">{clusterData.name}'s Career Compass</h2>
					</div>
					:<></>}
                <svg class="mindmap" width={900} height={500}/>*/}
				<br/>
                {(savedQuizzes.length > 0) ? <h2 className="font-semibold text-lg">Results Explained (Click to Find Out More):</h2> : <></>}
                <br/>
				{clusterData.children?(clusterData.children.map((child) => ( //.slice(0, 3)
				<ul>
					{/*<a href={child.webURL} target="_blank">*/}
						<b>{child.name}</b>
					{/*</a>*/}
					<ul>
						<li style={{ marginLeft: "20px" }}>{child.description}</li>
					</ul>
					<br/>
					<div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
						<ThemeProvider theme={theme}>
							<Button onClick={() => displayImage(child, 'education-roadmap')} variant="contained" style={{marginRight: "10px"}}>
								View Education Roadmap
							</Button>
						</ThemeProvider>
						<ThemeProvider theme={theme}>
							<Button variant="contained" component="a" href={child.webURL} target="_blank" rel="noopener noreferrer">
								View Sample Careers
							</Button>
						</ThemeProvider>
						<Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={{
								overlay: {
								position: 'fixed',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								},
								content: {
								position: 'absolute',
								top: 'auto',
								left: 'auto',
								right: 'auto',
								bottom: 'auto',
								height: '70%',
								width: '70%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-end',
								padding: '10px'
								}
							}}>
							<div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
								<button onClick={() => setIsModalOpen(false)} style={{border: 'none', backgroundColor: 'transparent', fontSize: '20px'}}>X</button>
							</div>
							{selectedGoal === 'education-roadmap' && (
								<img src={imgSRC(selectedChild.imgRoad)} alt="Education Roadmap" style={{
									display: 'block',
									margin: 'auto',
									maxWidth: '100%',
									maxHeight: '100%',
								}}/>
							)}
							{selectedGoal === 'sample-careers' && (
								<img src={imgSRC(selectedChild.imgCareer)} alt="Sample Careers" style={{
									display: 'block',
									margin: 'auto',
									maxWidth: '100%',
									maxHeight: '100%',
								}}/>
							)}
						</Modal>
					</div>
					<br/>
				</ul>
				))):<></>}
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
				{/*<CareersViaPath/>*/}
				<br/>
                {
                (savedQuizzes.length > 0) ?    
					<div className="relative p-3 hover:bg-gray-200 rounded-md bg-gray-100 my-4 space-y-2 p-8">
						<h3 className="text-md font-bold leading-5 pb-2">
							Download Careers Page
						</h3>
						<Button onClick={downloadFileDocument} size="small" variant="outlined" color="error">Download</Button>
					</div>
					: <></>
                }
            </div>
        </div>  
    )
}