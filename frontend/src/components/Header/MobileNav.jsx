import "../../css/Nav.css"
import { Link } from "react-router-dom"

function MobileNav() {
  return (
    <>
      <div className="mobilenav">
        <Link className="mobilenav__link" to="/">Dash</Link>
        <Link to="/ToWatch" className="mobilenav__link">To watch</Link>
        <Link to="/Search" className="mobilenav__link">Find</Link>
        <Link to="/Seen" className="mobilenav__link">Seen</Link>
        <Link to="/deck" className="mobilenav__link">Deck</Link>
      </div>
    </>
  )
}

export default MobileNav