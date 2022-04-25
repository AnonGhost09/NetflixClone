import React, { useCallback, useState } from "react";
import "./LoginScreen.css";
import SigninScreen from "./SigninScreen";

function LoginScreen(props) {
  const [signIn, setSignIn] = useState(false);

  const memberHanlder = useCallback(() => setSignIn(!signIn), [signIn]);

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          className="loginScreen__logo"
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
      </div>
      <div className="loginScreen__gradient" />

      <div className="loginScreen__body">
        {signIn ? (
          <SigninScreen signinMember={memberHanlder} />
        ) : (
          <>
            <h1> Unlimited films, TV programmes and more </h1>
            <h2> Watch Anywhere.Cancel at any time </h2>
            <div className="loginScreen__form">
              <p>
                Ready to watch ? Enter your email to create or restart your
                membership
              </p>
              <form onSubmit={memberHanlder}>
                <input type="email" name="email" placeholder="Email address" />
                <button type="submit" className="loginScreen__formButton">
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(LoginScreen);
