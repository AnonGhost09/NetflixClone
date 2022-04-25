import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../firebase";

import "./SigninScreen.css";

const SigninScreen = props => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const register = e => {
    e.preventDefault();
    setLoading(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(authUser => {
        history.replace("/profile");
      })
      .catch(error => {
        alert("GAGAL MENDAFTAR COBA LAGI");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const login = e => {
    e.preventDefault();
    setLoading(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signInWithEmailAndPassword(auth, email, password)
      .then(authUser => {
        history.replace("/profile");
      })
      .catch(error => {
        alert("GAGAL LOGIN, EMAIL ANDA TIDAK TERDAFTAR");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="signin__screen">
      <h1>Sign In</h1>
      <form className="signin__form" onSubmit={login}>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" disabled={loading}>
          {loading ? `Process` : `Sign up now`}
        </button>
      </form>

      <p>
        <span className="signin__gray">New to Netflix?</span>
        <strong onClick={register}>
          {loading ? `Process` : `Sign up now`}
        </strong>
      </p>
    </div>
  );
};

export default React.memo(SigninScreen);
