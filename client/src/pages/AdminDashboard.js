import React, {useState, useEffect} from "react";
import {Link, Navigate} from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import careerclusters from "../static/careerclusters.js";



// import Paper from '@material-ui/core/Paper';

import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { cluster } from "d3";
import { keys } from "@material-ui/core/styles/createBreakpoints.js";
  
const data = [
  { x: 1, y: 30 },
  { x: 2, y: 40 },
  { x: 3, y: 5 },
  { x: 4, y: 2 },
  { x: 5, y: 21 },
];

// GRID STUFF //
const columns = [
  { field: 'id', headerName: 'ID', headerClassName: 'super-app-theme--header', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'super-app-theme--header',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    headerClassName: 'super-app-theme--header',
    width: 250,
    editable: true,

  },
  {
    field: 'school',
    headerName: 'School',
    headerClassName: 'super-app-theme--header',
    width: 150,
    editable: true,
  },
  {
    field: 'grade',
    headerName: 'Grade',
    headerClassName: 'super-app-theme--header',
    width: 100,
    editable: true,
  },
  {
    field: 'sport',
    headerName: 'Sport',
    headerClassName: 'super-app-theme--header',
    width: 100,
    editable: true,
  },
  {
    field: 'clusters',
    headerName: 'Career Clusters',
    headerClassName: 'super-app-theme--header',
    width: 200,
    editable: true,
  },
  {
    field: 'signature',
    headerName: 'Accesscode',
    headerClassName: 'super-app-theme--header',
    width: 200,
    editable: true,
  },
];



export default function AdminDashboard() {
  const [profileData, setProfileData] = useState({});
  const loggedInUser = localStorage.getItem('token');
  const admin = localStorage.getItem('isAdmin') === 'true';

  const[users, setUsers] = useState([]);
  const rows = [];


  useEffect(()=> {

    fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/user/get_users')

      .then(res => {
        return res.json();
      })
      .then(data => {
        setUsers(data);
        console.log("Users:", data);
      });
  },[]);

  for (var i = 0; i < users.length; i++) {
    console.log("User: ", users[i]);
    
    let clusterPoints = users[i].clusterPoints.map((element, index) => [careerclusters.clusters[index], element]);
    // sort by number of points this user has in each cluster, in descending order
    clusterPoints.sort((first, second) => second[1] - first[1]);

    console.log("clusterPoints:", clusterPoints);

    // grab top 3 by number (not counting ties)
    let count = 0;
    let cIter = 0;
    let max = clusterPoints[0][1];
    let arr = [];
    let clustersString = "";

    if (max != 0)
    {
      for (let c of clusterPoints) {
      if (c[1] < max) {
        count++;
        max = c[1];
        if (count >= 1)
          break;
      }
      if (c[1] != 0){
        arr.push(c[0].shortName);
      }
      }
    }
    else
      clustersString = "No quiz data";

    for (let a of arr)
    {
      if (cIter != arr.length-1)
        {
          clustersString += a + ", ";
        }
        else
          clustersString += a;

          cIter++;
      console.log("citer:", cIter)
      console.log("clusterp lenght:", clusterPoints.length);
    }
    

    rows.push(
      {id: users[i]._id, name: users[i].name, email: users[i].email, school: users[i].school, grade: users[i].grade, sport: users[i].sport, clusters: clustersString, signature: users[i].signature}
      );
  }
  console.log("rows", rows);
  

  useEffect(()=>{
    if (loggedInUser) {
      console.log("userToken =>", loggedInUser);
    }
    else {
      console.log("No user token");
    }

    // get admin user profile
    fetch(process.env.REACT_APP_S_HOST + ':' + process.env.REACT_APP_S_PORT + '/api/user/get_self_profile', {

        headers:{'Authorization': 'Bearer ' + loggedInUser
        }
    })
      .then(response =>{
        if (!response.ok) {
          throw new Error('Could not login');
        }
        else{
          return response.json();
        }
      })
      .then(data => {
        console.log("profile data: ", data);
        setProfileData(data);
      })
      .catch();
    
    },[])


  return (
    // ADMIN DASHBOARD
    <div class="max-w-4xl mx-auto py-3">
    {/* If user is logged in, continue showing admin dashboard details */}
      {admin?
      <div>
        <h2 class="text-center text-5xl my-6 py-3 font-semibold mb-4">{profileData.name}'s Dashboard</h2>

        {/* USER SUMMARY */}
          <p class="mx-5 mb-5 font-semibold">{profileData.school}'s User Summary</p>
      
        {/* DATA GRID */}
        <Box sx={{ 
          height: 500, 
          width: '100%', 
          // '& .super-app-theme--header': {color: "white"},
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(19,30,71,.8)",
            color: "white",
            }
        }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[20]}
            checkboxSelection
            disableSelectionOnClick
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 }
              },
            }}
            sx={{
              boxShadow: 2,
              // border: 2,
              // borderColor: 'black',
              '& .MuiDataGrid-row:hover': {
                color: 'primary.main',
              },
              p: 2,
            }}
          />
        </Box>

        <hr class="my-4"/>

        {/* USER ANALYTICS */}
        {/* <div class="columns-2">
          <p class="mx-5 font-semibold">User Quiz Analytics</p>
        </div>
        <p class="mx-5">[import user's career cluster node thing]</p>

        <Chart
          data={data}
        >
          <ArgumentAxis />
          <ValueAxis />
      
          <LineSeries valueField="y" argumentField="x" />
        </Chart> */}
        
      </div> :
      // If logged out or user that is not admin logs in, go to home page
      <>
      <Navigate to="/" />
        {/* <h1 className="text-center text-4xl my-10">No one is logged in</h1>
        <Link className="flex justify-center" to="/">
          <Button variant="outlined">Back to home</Button>
        </Link> */}
      </>
      }
  </div>
  )
}
