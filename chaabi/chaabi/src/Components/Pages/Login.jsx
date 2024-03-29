
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, json, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "./Spinner";
import styles from "../Styles/Login.css"
import { UserLoginFailed, UserLoginLoading, UserLoginSuccess } from "../Redux/UserAuth/action";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((store) => store.LoginReducer.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [change,setChange]=useState(false)
  const port=`https://puce-gorgeous-bluefish.cyclic.app`

  // click event
  const handleClick = () => {
    let data = {
      email,
      password,
    };
    if (email && password) {
      dispatch(UserLoginLoading());
      axios
        .post(`${port}/login`, data) 
        .then((res) => {
          dispatch(UserLoginSuccess(res.data.user));
          if (res.data.msg == "Login Successfull") {
            localStorage.setItem("token",JSON.stringify(res.data.token))
            localStorage.setItem("user",JSON.stringify(res.data.user))
            toast.success(res.data.msg, {
              position: "top-center",
              theme: "colored",
            });
            setTimeout(()=>{
              navigate("/game")
            },1500)
            
          } else {
            toast.error(res.data.msg, {
              position: "top-center",
              theme: "colored",
            });
          }
        })
        .catch((err) => {
          dispatch(UserLoginFailed(err));
        });
    } else {
      toast.error("Please fill all credentials", {
        position: "top-center",
        theme: "colored",
      });
    }

  };

  useEffect(() => {
    
  }, [change]);

  return (
    <div id='mainLogin' >
      <h1>Login Your Account </h1>
      <div id="inputDiv" >
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={email===""}
          onClick={handleClick}
          
        >
          {/* loadin indicator */}
          {loading ? (
            <Spinner/>
          ) : (
            "Signin"
          )}
        </button>
        <div
        id="foot"
      >
        <p>Don't have account</p>
        <Link to="/signup" style={{ color: "tomato", fontWeight: "600" }}>
          Signup
        </Link>
      </div>
      </div>
      {/* toast message container */}
      <ToastContainer />
    </div>
  );
};
