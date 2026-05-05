import "../css/Nav.css"
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-homepage">
                <Link to="/">Home Page</Link>
            </div>
            <div className="nav-links">
                <Link to="/Seen" className="nav-link">Seen</Link>
                <Link to="/ToWatch" className="nav-link">To watch</Link>
                <Link to="/Search" className="nav-link">Find</Link>
            </div>
        </nav>
    )
}

export default NavBar