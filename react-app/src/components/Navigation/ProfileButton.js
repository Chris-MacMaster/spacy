import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
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
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
    </div>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <p>Hello, {user.firstName}.</p>
            <p>{user.username}</p>
            
            <p>{user.firstName} {user.lastName}</p>
            <hr></hr>
            <p>{user.email}</p>
            <p><NavLink exact to={`/currentuser`}>User Details</NavLink></p>
            <hr></hr>
            <p>
              <button onClick={logout}>Log Out</button>
            </p>
          </>
        ) : (
          <>
            <OpenModalButton
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              itemText="Sign Up"
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
