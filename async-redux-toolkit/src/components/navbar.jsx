import { Link, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { searchUser } from "../store/slices/userSlice"

const Navbar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const LINKS = [
    {
      title: "Home",
      to: "/",
    },
    {
      title: "Create",
      to: "/create",
    },
  ]
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
        >
          ReduxToolkit
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {LINKS.map((props,index) => (
              <li className="nav-item" key={index}>
                <Link
                  {...props}
                  className={`nav-link ${
                    location.pathname === props.to && "active"
                  }`}
                >
                  {props.title}
                </Link>
              </li>
            ))}
          </ul>
          <form className="d-flex">
            <input
              className="form-control"
              type="Search user..."
              placeholder="Search"
              onChange={(e) => dispatch(searchUser(e.target.value))}
            />
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
