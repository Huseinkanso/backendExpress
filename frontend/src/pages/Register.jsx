import { useState,useEffect } from "react"
import {toast} from 'react-toastify'
import { FaUser } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
// useselector is for selecting a state from redux
// useDispatch is to dispatch payload   
import { useDispatch, useSelector } from "react-redux";
import { register,reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
export default function Register() {
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password2:'',
    });
    const navigate=useNavigate()
    const {name,email,password,password2} = formData;
    const dispatch=useDispatch();
    const {user,isLoading,isSuccess,message,isError}=useSelector(state=>state.auth)
    useEffect(()=>{
        if(isError)
        {
            toast.error(message)
        }
        console.log(isSuccess,user);
        if(isSuccess || user)
        {
            navigate('/')   
        }
        dispatch(reset())
    },[isError,isSuccess,user,message,navigate,dispatch])
    const onChange=(e)=>{
        setFormData((prevState)=>({...prevState,[e.target.name]:e.target.value}))
    }
    const onSubmit=(e)=>{
        e.preventDefault();

        if(password!=password2)
        {
            toast.error('password dosent match');
        }else 
        {
            const userData= {
                name,email,password
            }
            dispatch(register(userData))
        }

    }
    if(isLoading) return <Spinner/>
  return (
    <>
        <section className="heading">
            <h1>
                <FaUser/> Register 
            </h1>
            <p>Please Create an Account</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit} >
                <div className="form-group">
                    <input required  type="text" className="form-control" id="name" name="name" value={name} placeholder="Name" onChange={onChange} />
                </div>
                <div className="form-group">
                    <input required type="email" className="form-control" id="email" name="email" value={email} placeholder="Email" onChange={onChange} />
                </div>
                <div className="form-group">
                    <input required type="password" className="form-control" id="password" name="password" value={password} placeholder="Password" onChange={onChange} />
                </div>
                <div className="form-group">
                    <input required type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Confirm Your Password" onChange={onChange} />
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}
