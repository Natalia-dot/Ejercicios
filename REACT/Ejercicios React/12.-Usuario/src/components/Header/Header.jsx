import { NavLink } from "react-router-dom"
import "./Header.css"
import { Dashboard } from "../../pages"
import { useAuth } from "../../contexts/authContext"

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header>
      <div className="headerFatherContainer">
        <div className="logoContainer">
          <img className="logo" src="https://res.cloudinary.com/drbssyzr7/image/upload/v1700484797/NODE_project/AM___Arctic_Monkeys_e8evww.jpg" alt="The Arctic Monkeys AM album logo." />
          <div className="title">
          <h1>D<span className="AM">AM</span>tabase</h1>
        </div>
        </div>
        <nav>          
          <NavLink to={user==null || user.isVerified == false? "/login" : "/dashboard"}>
            <div className="dashboardIcon">
          <img  src="https://res.cloudinary.com/drbssyzr7/image/upload/v1700684460/NODE_project/arctic_trtpg3.png" alt="Dashboard icon" />
          </div>
          </NavLink>
          {user == null && (<NavLink to={"/login"}>
            <div className="loginIcon">
          <img src="https://res.cloudinary.com/drbssyzr7/image/upload/v1700687236/NODE_project/key_pcri8y.png" alt="Login icon" />
          </div>
          </NavLink>)}
          {user !== null && (
            <NavLink to="/profile/favAlbums">
            <div className="profileIcon">
              <img
                src={user.image}
                alt={user.name}
              />
            </div>
            </NavLink>
          )}
          {user !== null && (
            <div className="logoutIcon">
            <img
              src="https://res.cloudinary.com/dq186ej4c/image/upload/v1685706203/9e3c325bca17c2147d249237c5a0906b_qhqifa.png"
              alt=""
              className="iconNav iconLogout"
              onClick={() => logout()}
            />
            </div>)}

        </nav>
        </div>
      
    </header>
  )
}

//<!--TODO iconos que se renderizan solo con el user loggeado