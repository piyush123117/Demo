import './EPAdmin.css';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { _userapiurl } from '../../Api.url';
import { useNavigate } from 'react-router-dom';

function EPAdmin() {

  const navigate = useNavigate();
  const [ name , setName ] = useState(); 
  const [ email , setEmail ] = useState();
  const [ mobile , setMobile ] = useState();
  const [ address , setAddress ] = useState();
  const [ city , setCity ] = useState();
  const [ gender , setGender ] = useState();
  const [ M , setM ] = useState();
  const [ F , setF ] = useState();
  const [ output , setOutput ] = useState();


  useEffect(()=>{
    axios.get(_userapiurl+"fetch?email="+localStorage.getItem("email")).then((response)=>{
      var userDetails=response.data[0];
      setName(userDetails.name);
      setEmail(userDetails.email);  
      setMobile(userDetails.mobile);
      setAddress(userDetails.address);
      setCity(userDetails.city);

      if(userDetails.gender=="male")
        setM("checked");
      else
        setF("checked");

    }).catch((error)=>{
      console.log(error);   
    });
  },[]);

  const handleSubmit=()=>{
    let updateDetails={ "condition_obj":{"email":email} , "content_obj":{"name":name,"mobile":mobile,"address":address,"city":city,"gender":gender}};
    axios.patch(_userapiurl+"update",updateDetails).then((response)=>{
      setOutput("Profile edited successfully....");
      navigate("/epadmin");  
    });
  };

  return (
    <>
            {/* About Start */}
            <div class="container-xxl py-5">
            <div class="container">
                <div class="row g-5 align-items-center">
<div class="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
<h1 class="mb-4">Edit Profile Here!!!</h1>
<font color="blue">{output}</font>
<form>
 <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" class="form-control" value={name} onChange={ e => setName(e.target.value) } />
  </div>
  <br/>
  <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" class="form-control" value={email} onChange={ e => setEmail(e.target.value) } />
  </div>
  <br/>
  <div class="form-group">
    <label for="mobile">Mobile:</label>
    <input type="text" class="form-control" value={mobile} onChange={ e => setMobile(e.target.value) } />
  </div>
  <br/>
  <div class="form-group">
    <label for="add">Address:</label>
    <textarea class="form-control" rows="5" value={address} onChange={ e => setAddress(e.target.value) } ></textarea>
  </div>
  <br/>
  <div class="form-group">
    <label for="city">City:</label>
    <select class="form-control" value={city} onChange={ e => setCity(e.target.value) } >
        <option>Select City</option>
        <optgroup label="MP">
        <option>Indore</option>
        <option>Ujjain</option>
        <option>Bhopal</option>
        </optgroup>
        <optgroup label="MH">
        <option>Mumbai</option>
        <option>Pune</option>
        <option>Nasik</option>
        </optgroup>
    </select>
  </div>
  <br/>
  <div class="form-group">
    <label for="gender">Gender:</label>
    &nbsp;&nbsp;
    Male <input type="radio" value="male" checked={ M } name="gender" onChange={ e => setGender(e.target.value) } />
    &nbsp;&nbsp;
    Female <input type="radio" value="female" checked={ F } name="gender" onChange={ e => setGender(e.target.value) } />
  </div>
  <br/>
  <button type="button" class="btn btn-success" onClick={handleSubmit}>Submit</button>
</form>
</div>
                </div>
            </div>
        </div>
        {/* About End */}
    </>
  );
}

export default EPAdmin;
