import "../../css/Nav.css"
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav className="navbar">
            <Link className="nav-link" to="/">Film Deck</Link>
            <div className="nav-links">
                <Link to="/ToWatch" className="nav-link">To watch</Link>
                <Link to="/Seen" className="nav-link">Seen</Link>
            </div>
        </nav>
    )
}

export default NavBar


// import "../../css/Nav.css"
// import { Link } from "react-router-dom"

// function NavBar() {
//     return (
//         <nav className="navbar">
            
//             <Link className="nav-link" to="/">DashBoard</Link>
            
//             <div className="nav-links">
//                 <Link to="/ToWatch" className="nav-link">To watch</Link>
//                 <Link to="/Seen" className="nav-link">Seen</Link>
//                 <Link to="/Search" className="nav-link">Find</Link>
//             </div>
//         </nav>
//     )
// }

// export default NavBar