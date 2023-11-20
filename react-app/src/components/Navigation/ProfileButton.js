import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
// import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";
import "./ProfileButton.css";
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

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  return (
    <>
        <button onClick={openMenu} className=" hover:text-slate-800 transition ease-in-out ">
          <i className="fas fa-user-circle" />
        </button>
      <div
        className={`absolute right-0 top-16 bg-white rounded-xl drop-shadow-2xl p-4 transition ease-in-out duration-400 w-64 z-20 border-solid border-[1px] border-gray-200 ${
          showMenu ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
        ref={ulRef}
      >
        {user ? (
          <>
            <div>
              <NavLink to={`/users/${user.id}`}>
                <div className="inside-div">
                  <span className="icon-span">
                    <i className="fas fa-user-circle" />
                  </span>
                  <span>
                    <div>
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="subtext">View your profile</div>
                  </span>
                </div>
              </NavLink>
            </div>
            <div>
              <NavLink to="/purchases">
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
              <NavLink to={`/users/${user.id}`}>
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
                  <div>Sign Out</div>
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            <OpenModalButton
              className="modal-button"
              buttonText={
                <button className="hover:bg-slate-300 p-2 rounded-xl w-full font-bold transition ease-in-out duration-200 uppercase">
                  Log In
                </button>
              }
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText={
                <button className="hover:bg-slate-300 p-2 rounded-xl w-full font-bold transition ease-in-out duration-200 uppercase">
                  Sign In
                </button>
              }
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
