import React, {useState} from "react";
export default function Accesscode(props) {
    const [accessCode, setCode] = useState(null);
    const [checked, setCheck] = useState(false);

    const [signature, setSignature] = React.useState();

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
        setSignature(data.signature)
    })
    .catch();

    function getCode(val) {
        setCode(val.target.value)
        console.warn(val.target.value)
    }

    function getCheck(val) {
        if (accessCode == signature) {
            setCheck(true);
        }
    }

    return (
        <div className="accessCode">
            <h1>Inputed access code: </h1>
            <input type="text" onChange={getCode} />
            <button onClick={()=>getCheck(accessCode)} >
                {checked? accessCode : null} Print Value</button>
        </div>
    );
};
//export {checked};
