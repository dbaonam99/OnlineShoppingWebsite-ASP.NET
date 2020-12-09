import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function DashboardUserCreate(props) {

    const createForm = useRef();
    
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userRole, setUserRole] = useState("")
    const [userAvt, setUserAvt] = useState("") 
    const [userTinh, setUserTinh] = useState("")
    const [userHuyen, setUserHuyen] = useState("") 
    const [userPhone, setUserPhone] = useState("")
    const [userAddress, setUserAddress] = useState("")
    const [userCreateDay, setUserCreateDay] = useState("")

    const user = props.user; 

    useEffect(()=> {
        if (user) {    
            setUserName(user.userName)
            setUserRole(user.userRole)
            setUserEmail(user.userEmail)
            setUserAvt(user.userAvt)
            setUserTinh(user.userTinh)
            setUserHuyen(user.userHuyen)
            setUserPhone(user.userPhone)
            setUserAddress(user.userAddress)
            setUserCreateDay(user.userCreateDay)
            setUserPassword(user.userPassword)
        }
    },[user])

    const onSubmit = (event) => {
        event.preventDefault()  
        axios.put(`https://localhost:4000/api/user/${user.id}`, { 
            id: user.id,
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword,
            userRole: userRole,
            fromAdmin: true,
            userAvt: userAvt,
            userTinh: userTinh,
            userHuyen: userHuyen, 
            userPhone: userPhone,
            userAddress: userAddress, 
            userCreateDay: userCreateDay
        }).then(()=>{
            props.setCloseEditFunc(false);
            props.setToastFunc(true);
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
                            props.setCloseEditFunc(false);
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
                                type="password"
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
                            Update user
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}