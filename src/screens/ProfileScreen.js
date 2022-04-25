import { signOut } from "@firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Nav from "../Nav";
import "./ProfileScreen.css";

function ProfileScreen(props) {
  const user = useSelector(selectUser);
  const history = useHistory();

  const logout = () => {
    signOut(auth)
      .then(() => {
        history.replace("/login");
      })
      .catch(error => {
        alert(error.message);
      });
  };
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__data">
          <img
            className="profileScreen__avatar"
            src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png"
            alt=""
          />
          <div className="profileScreen__list">
            <input
              type="email"
              name="email"
              disabled
              value={user.email || "tidak ada email"}
            />
            <h4>Plans (Current Plan : premium)</h4>
            <div className="gap"></div>
            <h5>
              <span>Renewal Date : 04/03/2021</span>
            </h5>
            <div className="profileScreen__item">
              <div>
                <h5>Netflix Standard</h5>
                <h6>1080p</h6>
              </div>
              <button>Subscribe</button>
            </div>
            <div className="profileScreen__item">
              <div>
                <h5>Netflix Basic</h5>
                <h6>480p</h6>
              </div>
              <button>Subscribe</button>
            </div>
            <div className="profileScreen__item">
              <div>
                <h5>Netflix Premium</h5>
                <h6>4K+HDR</h6>
              </div>
              <button>Current Package</button>
            </div>
            <button onClick={logout}>Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
