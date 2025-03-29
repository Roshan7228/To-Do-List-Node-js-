# To-Do-List-Node-js-
To-Do-List Using Node js  and express with front-end and back-end

# Video Link 
<a href="https://drive.google.com/file/d/1NgooUJmH6OC7br1bECAAh8d2KkByF3sw/view?usp=drive_link">Video Link</a>

## Front-End Using React.js
  1)Fetch data code
   import React, { useEffect, useState } from 'react';
import './Style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function DisplayData() {
  let [Userdata, setuserdata] = useState([]);
  let [objectuser, setobjectuser] = useState({
    user: '',
    company_id: '',
    joingDate: '',
    DESIGNATION: '',
    image_url: '',
  });
  const [totalCount, setTotalCount] = useState(0);
  // modal
  let [Overlaymodal, setOverlaymodal] = useState(false);

  console.log(objectuser);

  function Getdata() {
    axios.get("http://localhost:8080/Userdata")
      .then((res) => {
        console.log(res.data);
        setuserdata(res.data.Userdata);
        setobjectuser(res.data.Userdata[0]);
        setTotalCount(res.data.Userdata.length);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleDelete(id) {
    axios.delete(`http://localhost:8080/Deleteuserdata/${id}`)
      .then(() => {
        alert("Data Delete");
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    Getdata();
  }, [Userdata])

  return (
    <div>
      <div className='Container'>
        <div className='AllUSerNuber'>
          <h5>All Users: <span>{totalCount}</span></h5>
          <h5>Projects: <span>884</span></h5>
          <i className="ri-information-2-fill"></i>
        </div>
        <Link to={"/AddData"}>
          <button className='Add'><i className="ri-add-line"></i>&nbsp;&nbsp;Add new user</button>
        </Link>
        <div className='UserDetails'>
          <table>
            <thead>
              <tr>
                <th>USER</th>
                <th>USER ROLE</th>
                <th>SATUS</th>
                <th>DESIGNATION</th>
                <th>RATING</th>
                <th>JOING DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {Userdata.map((Data, index) => {
                return (
                  <tr key={index}>
                    <td><img src={Data.image_url} alt="" srcSet="" /><span>{Data.user}</span></td>
                    <td><h5><i className="ri-draft-line"></i> {Data.userrole}</h5></td>
                    <td><i className="ri-circle-fill"></i>&nbsp;&nbsp;Active</td>
                    <td>{Data.DESIGNATION}</td>
                    <td> <i className={Data.rating > 4.5 ? "ri-arrow-up-line" : "ri-arrow-down-line"} style={{ color: Data.rating > 4.5 ? 'green' : 'red' }} ></i>{Data.rating}</td>
                    <td>{Data.joingDate}</td>
                    <td><Link to={'/Update'} state={{ id: Data.id, image_url: Data.image_url, userrole: Data.userrole, DESIGNATION: Data.DESIGNATION, rating: Data.rating, joinDate: Data.joinDate, user: Data.user, company_id: Data.company_id }}><i className="ri-pencil-line"></i></Link>
                      <i className="ri-delete-bin-6-line" onClick={() => { handleDelete(Data.id) }}></i> <i className="ri-eye-line" onClick={() => { setOverlaymodal(true); setobjectuser(Data); }}></i></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`Overlay ${Overlaymodal ? "showmodal" : ""}`}></div>
      <div className={`Modal ${Overlaymodal ? "showModal" : ""}`}>
        <h5 className='Cross' onClick={() => { setOverlaymodal(!Overlaymodal) }}>X</h5>
        <div className='Image-Section'>
          <img src={objectuser.image_url} alt="" />
        </div>
        <div className='userDetails'>
          <h5>User Details</h5>
          <h6>Name : {objectuser.user}</h6>
          <h6>Company Id: {objectuser.company_id}</h6>
          <h6>Joining Date : {objectuser.joingDate}</h6>
          <h6>Designation: {objectuser.DESIGNATION}</h6>
        </div>
      </div>
    </div>
  )
}

export default DisplayData;

## Add Data
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddData() {
  const Navigate = useNavigate();
  const [userDataAdd, setUserDataAdd] = useState({
    user: "",
    userrole: "",
    rating: "",
    DESIGNATION: "",
    joingDate: "",
    company_id: "",
    image_url: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/AddUserdata", userDataAdd)
      .then((res) => {
        setUserDataAdd(res.data);
        Navigate('/');
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setUserDataAdd({ ...userDataAdd, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  return (
    <div>
      <div className='Form-Container'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Username">User Name <span>*</span></label>
          <input type="text" placeholder='Username...' name='user' value={userDataAdd.user} onChange={handleChange} />

          <label htmlFor="userrole">User Role <span>*</span></label>
          <select name='userrole' value={userDataAdd.userrole} onChange={handleChange} id="">
            <option value="">Select Role</option>
            <option value="Administator">Administator</option>
            <option value="Viewer">Viewer</option>
            <option value="Moderator">Moderator</option>
          </select>

          <label htmlFor="Rating">Rating <span>*</span></label>
          <input type="text" placeholder='Rating...' name='rating' value={userDataAdd.rating} onChange={handleChange} />

          <label htmlFor="DESIGNATION">Designation <span>*</span></label>
          <select name="DESIGNATION" value={userDataAdd.DESIGNATION} onChange={handleChange} id="">
            <option value="">Select Designation</option>
            <option value="Front-End">Front-End</option>
            <option value="Back-End">Back-End</option>
          </select>

          <label htmlFor="JoingDate">Joing Date <span>*</span></label>
          <input type="date" name='joingDate' value={userDataAdd.joingDate} onChange={handleChange} />

          <label htmlFor="Companyid">Company id <span>*</span></label>
          <input type="number" placeholder='Companyid...' name='company_id' value={userDataAdd.company_id} onChange={handleChange} />

          <label htmlFor="UserImage">User Image <span>*</span></label>
          <input type="text" placeholder='UserImage...' name='image_url' value={userDataAdd.image_url} onChange={handleChange} />

          <button type='submit'>Add</button>
        </form>
      </div>
    </div>
  );
}

export default AddData;

## Update Data code

import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Update() {
  let Location = useLocation();
  let Navigate = useNavigate();

  let { user, id, userrole, rating, DESIGNATION, joingDate, company_id, image_url } = Location.state;
  console.log(id);

  let [Updateimage, setUpdateimage] = useState(image_url);
  let [Updateuser, setUpdateuser] = useState(user);
  let [Updateuserrole, setUpdateuserrole] = useState(userrole);
  let [Updaterating, setUpdaterating] = useState(rating);
  let [UpdateDESIGNATION, SetDESIGNATION] = useState(DESIGNATION);
  let [UpdatejoingDate, SetjoingDate] = useState(joingDate);
  let [Updatecompany_id, Setcompany_id] = useState(company_id);

  function handleUpdate(el) {
    el.preventDefault();
    axios.patch(`http://localhost:8080/Updateuser/${id}`, {
      user: Updateuser,
      userrole: Updateuserrole,
      rating: Updaterating,
      DESIGNATION: UpdateDESIGNATION,
      joingDate: UpdatejoingDate,
      company_id: Updatecompany_id,
      image_url: Updateimage
    })
    .then(() => {
      alert("Updated Successfully");
      Navigate('/'); // Navigate after update if needed
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <div className='Form-Container'>
        <form onSubmit={handleUpdate}>
          <label htmlFor="Username">User Name <span>*</span></label>
          <input type="text" placeholder='Username...' value={Updateuser} onChange={(e) => setUpdateuser(e.target.value)} />

          <label htmlFor="userrole">User Role <span>*</span></label>
          <select name='userrole' value={Updateuserrole} onChange={(e) => setUpdateuserrole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Administrator">Administrator</option>
            <option value="Viewer">Viewer</option>
            <option value="Moderator">Moderator</option>
          </select>

          <label htmlFor="Rating">Rating <span>*</span></label>
          <input type="text" placeholder='Rating...' value={Updaterating} onChange={(e) => setUpdaterating(e.target.value)} />

          <label htmlFor="DESIGNATION">Designation <span>*</span></label>
          <select name="DESIGNATION" value={UpdateDESIGNATION} onChange={(e) => SetDESIGNATION(e.target.value)}>
            <option value="">Select Designation</option>
            <option value="Front-End">Front-End</option>
            <option value="Back-End">Back-End</option>
          </select>

          <label htmlFor="JoingDate">Joining Date <span>*</span></label>
          <input type="date" name='joingDate' value={UpdatejoingDate} onChange={(e) => SetjoingDate(e.target.value)} />

          <label htmlFor="Companyid">Company ID <span>*</span></label>
          <input type="number" placeholder='Company ID...' value={Updatecompany_id} onChange={(e) => Setcompany_id(e.target.value)} />

          <label htmlFor="UserImage">User Image <span>*</span></label>
          <input type="text" placeholder='User Image...' value={Updateimage} onChange={(e) => setUpdateimage(e.target.value)} />

          <button type='submit'>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
