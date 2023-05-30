import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
// import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from '../../store/session'
import { NavLink, useHistory } from "react-router-dom";
import './ProfileButton.css'
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  //when user logs out, redirected to homepage
  const history = useHistory();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    //when user logs out, redirected to homepage
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
    <div className="profileburger">
      <button onClick={openMenu} className="profileburger">
        <i className="fas fa-user-circle" />
      </button>
    </div>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div className="popout-profile-header">
          <div>
            <i className="fas fa-user-circle profile-drop-item" />
          </div>

          <NavLink to={`/users/${user.id}`}><div>
            <p className="drop-down-user-name">{user.firstName} {user.lastName}</p>
            <div className="subtext">View your profile</div>
          </div>
          </NavLink>
          </div>
            <div>
              <span className="profile-drop-item" >
                <i className="fa-solid fa-clipboard-list drop-down-icons"></i>
                </span>
              <NavLink to='/purchases'>
              <span className="profile-drop-text">Purchases</span>
              </NavLink>
            </div>
            {/* <div>
              <span className="profile-drop-item" >
                <i className="fa-solid fa-gift drop-down-icons"></i>
              </span>
              <span className="profile-drop-text">Gift card balance: $0.00</span>
            </div> */}
            {/* <div>
              <span className="profile-drop-item" >
                <i className="fa-solid fa-message drop-down-icons"></i>
              </span>
              <span className="profile-drop-text">Messages</span>
            </div> */}
            {/* <div>
              <span className="profile-drop-item" >
                <i className="fa-solid fa-tag drop-down-icons"></i>
              </span>
              <span className="profile-drop-text">Your offers</span>
            </div> */}
            {/* <div>
              <span className="profile-drop-item" >
                <i className="fa-solid fa-leaf drop-down-icons"></i>
              </span>
              <span className="profile-drop-text">Your impact</span>
            </div> */}
            {/* <div>
              <span className="profile-drop-item" >
                <i className="fa-solid fa-gear drop-down-icons"></i>
              </span>
              <span className="profile-drop-text">Account Settings</span>
            </div> */}
            <NavLink to={`/users/${user.id}`}>
            <div>
              <span className="profile-drop-item" >
                <i className="fa-solid fa-store drop-down-icons"></i>
              </span>
          <span className="profile-drop-text">Sell on Spacey</span>
            </div>
            </NavLink>
            <div>
              <button onClick={logout}><i className="fa-solid fa-right-from-bracket drop-down-icons profile-drop-item" /><span className="signout-button" >Sign Out</span></button>
            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
