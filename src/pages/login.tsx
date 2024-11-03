import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCalendar, FaGenderless } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { MessageResponse } from "../types/api-types";
import "./../styles/_loginSignUp.scss";

const Login = () => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  // const navigate = useNavigate();
  const [login] = useLoginMutation();

  const loginTab = useRef<HTMLDivElement | HTMLButtonElement>(null);
  const registerTab = useRef<HTMLDivElement | HTMLButtonElement>(null);
  const switcherTab = useRef<HTMLDivElement | HTMLButtonElement>(null);

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const res = await login({
        name: user.displayName!,
        email: user.email!,
        gender,
        role: "user",
        photo: user.photoURL!,
        dob: date,
        _id: user.uid,
      });
      if ("data" in res) {
        toast.success(res.data.message);
        const data = await getUser(user.uid);
        <Navigate to="/" />;
        dispatch(userExist(data?.user!));
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        <Navigate to="/" />;
        dispatch(userNotExist());
      }
    } catch (error) {
      toast.error("Sign-in Failed!");
    }
  };

  const switchTabs = (tab: string) => {
    if (tab === "login") {
      switcherTab.current?.classList.add("shiftToNeutral");
      switcherTab.current?.classList.remove("shiftToRight");

      registerTab.current?.classList.remove("shiftToNeutralForm");
      loginTab.current?.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current?.classList.add("shiftToRight");
      switcherTab.current?.classList.remove("shiftToNeutral");

      registerTab.current?.classList.add("shiftToNeutralForm");
      loginTab.current?.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={() => switchTabs("login")}>LOGIN</p>
              <p onClick={() => switchTabs("register")}>REGISTER</p>
            </div>
            <button
              ref={switcherTab as React.RefObject<HTMLButtonElement>}
              className="isThisSectionActive"
            ></button>
          </div>
          <div
            className="loginForm"
            ref={loginTab as React.RefObject<HTMLDivElement>}
          >
            <div>
              <button onClick={loginHandler} className="loginBtn">
                <FcGoogle /> <span>Continue With Google</span>
              </button>
            </div>
          </div>

          <div
            className="signUpForm"
            ref={registerTab as React.RefObject<HTMLDivElement>}
          >
            <div className="signUpEmail">
              <FaCalendar />
              <input
                type="date"
                placeholder="Date of birth"
                required
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="signUpEmail">
              <FaGenderless />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <button onClick={loginHandler} className="loginBtn">
                <FcGoogle /> <span>Continue With Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*   
    <div className="login">
    <main>
    <div>
    <h1 className="heading">Login</h1>
    <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <p>Already a User?</p>
          <button onClick={loginHandler}>
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div> */}
    </>
  );
};
export default Login;
