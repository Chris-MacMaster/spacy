import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

(
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
      <div className='profile-drop-div'>
        <span className="profile-drop-item" >
          <i className="fa-solid fa-clipboard-list drop-down-icons" />
          </span>
        <NavLink to='/purchases'>
        <span className="profile-drop-text">Purchases</span>
        </NavLink>
      </div>
      <div className='profile-drop-div'>
        <NavLink to={`/users/${user.id}`}>
          <span className="profile-drop-item" >
            <i className="fa-solid fa-store drop-down-icons" />
          </span>
          <span className="profile-drop-text">Sell on Spacey</span>
       </NavLink>
      </div>
      <div className='profile-drop-div'>
        <span onClick={logout}>
            <i className="fa-solid fa-right-from-bracket drop-down-icons profile-drop-item" />
            <span className="signout-button">Sign Out</span>
        </span>
      </div>
  )

  (
    <div><NavLink ><div><span>ICON</span><span>TEXT</span></div></NavLink></div>
    <div><NavLink ><div><span>ICON</span><span>TEXT</span></div></NavLink></div>
    <div><NavLink ><div><span>ICON</span><span>TEXT</span></div></NavLink></div>
    <div><NavLink ><div><span>ICON</span><span>TEXT</span></div></NavLink></div>

  )
