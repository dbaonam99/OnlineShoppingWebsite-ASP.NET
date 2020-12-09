import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function DashboardUserCreate(props) {

    const createForm = useRef();
    
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userRole, setUserRole] = useState("")

    const onSubmit = (event) => {
        event.preventDefault()  
        axios.post('https://localhost:4000/api/user/register', {
            userAvt: "http://pe.heromc.net:4000/images/16f9bbf512b66a228f7978e34d8fb163",
            userTinh: null,
            userHuyen: null,  
            userPhone: null,
            userAddress: null, 
            userCreateDay: new Date(),
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword,
            userRole: userRole
        }).then(()=>{ 
            props.setCloseCreateFunc(false);
            props.setToastFunc(true);
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div className="DashboardProductInfo">
            <div className="create-box"> 
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        User infomation
                    </div>
                    <div  
                        className="create-box-title-close flex-center"
                        onClick={()=>{
                            props.setCloseCreateFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>
                <form onSubmit={onSubmit} encType="multipart/form-data" ref={createForm}>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Name</div>
                        <div className="dashboard-right">
                            <input 
                                type="text" name="name" 
                                value={userName || ""}
                                onChange={(event)=>{
                                    setUserName(event.target.value)
                                }} required
                                ></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Email</div>
                        <div className="dashboard-right">
                            <input 
                                type="text" name="email" 
                                value={userEmail || ""}
                                onChange={(event)=>{
                                    setUserEmail(event.target.value)
                                }} required
                                ></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Role</div>
                        <div className="dashboard-right">
                            <select 
                                className="input"
                                value={userRole || ""}
                                onChange={(event)=>{
                                    setUserRole(event.target.value)
                                }} required
                            >
                                <option></option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Password</div>
                        <div className="dashboard-right">
                            <input 
                                type="text"
                                className="input"
                                name="password" 
                                value={userPassword}
                                onChange={(event)=>{
                                    setUserPassword(event.target.value)
                                }} 
                            ></input>
                        </div>
                    </div>
                    <div className="flex-center" style={{marginTop: '40px'}}>
                        <button className="create-box-btn btn">
                            Create user
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}