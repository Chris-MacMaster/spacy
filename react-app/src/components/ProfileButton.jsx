import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
// import { logout } from "../../store/session";
import OpenModalButton from "./OpenModalButton";
import LoginFormModal from "./LoginFormModal";
import SignupFormModal from "./SignupFormModal";
import * as sessionActions from "../store/session";
import { NavLink, useHistory } from "react-router-dom";
import IconClipboard from "./IconClipboard";
import IconShop from "./IconShop";
import IconSignOut from "./IconSignOut";
import IconUser from "./IconUser";
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
      <button
        onClick={openMenu}
        className=" hover:text-slate-800 transition ease-in-out "
      >
        <i className="fas fa-user-circle text-slate-500 text-[2.5vmin] hover:text-slate-800" />
      </button>
      <div
        className={`absolute right-0 top-16 bg-white rounded-xl drop-shadow-2xl p-4 transition ease-in-out duration-400 w-64 z-10 border-solid border-[1px] border-gray-200 ${
          showMenu ? "scale-100" : "scale-0"
        }`}
        ref={ulRef}
      >
        {user ? (
          <>
            <div>
              <NavLink to={`/users/${user.id}`}>
                <div className="rounded-xl hover:bg-slate-300 flex content-center text-black p-3 transition ease-in-out duration-300">
                  <span className="w-[3vmin] flex justify-center items-center mr-4">
                    <IconUser />{" "}
                  </span>
                  <span>
                    <div className=" font-bold baskerville">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-cyan-700 text-[1.5vmin] ">
                      View your profile
                    </div>
                  </span>
                </div>
              </NavLink>
            </div>
            <div>
              <NavLink to="/purchases">
                <div className="rounded-xl hover:bg-slate-300 flex content-center text-black p-3 transition ease-in-out duration-300">
                  <span className="w-[3vmin] flex justify-center items-center mr-4">
                    <IconClipboard />
                  </span>
                  <span>
                    <div>Purchases</div>
                  </span>
                </div>
              </NavLink>
            </div>
            <div>
              <NavLink to={`/users/${user.id}`}>
                <div className="rounded-xl hover:bg-slate-300 flex content-center text-black p-3 transition ease-in-out duration-300">
                  <span className="w-[3vmin] flex justify-center items-center mr-4">
                    <IconShop />
                  </span>
                  <span>
                    <div>Sell on Spacey</div>
                  </span>
                </div>
              </NavLink>
            </div>
            <div>
              <div
                className="rounded-xl hover:bg-slate-300 flex content-center text-black p-3 transition ease-in-out duration-300"
                onClick={logout}
              >
                <span className="w-[3vmin] flex justify-center items-center mr-4">
                  <IconSignOut />
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
