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
              <div>
                <NavLink to={`/users/${user.id}`}>
                  <div className="inside-div">
                    <span className="icon-span">
                      <i className="fas fa-user-circle" />
                    </span>
                    <span>
                      <div>{user.firstName} {user.lastName}</div>
                      <div className="subtext">View your profile</div>
                    </span>
                  </div>
                </NavLink>
              </div>
              <div>
                <NavLink to='/'>
                  <div className="inside-div">
                    <span className="icon-span">
                      <i className="fa-solid fa-clipboard-list drop-down-icons" />
                    </span>
                    <span>
                      <div>Purchases</div>
                    </span>
                  </div>
                </NavLink>
              </div>
              <div>
                <NavLink to='/'>
                  <div className="inside-div">
                    <span className="icon-span">
                    <i className="fa-solid fa-store drop-down-icons" />
                    </span>
                    <span>
                      <div>Sell on Spacey</div>
                    </span>
                  </div>
                </NavLink>
              </div>
              <div>
                  <div className="inside-div" onClick={logout}>
                    <span className="icon-span">
                      <i className="fa-solid fa-right-from-bracket drop-down-icons" />
                    </span>
                    <span>
                      <div>
                        Sign Out
                      </div>
                    </span>
                  </div>
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
