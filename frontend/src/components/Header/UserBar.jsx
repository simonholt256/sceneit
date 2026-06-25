import { Link } from "react-router-dom"

function UserBar({ user }) {

  return (
    <div>
      {user
        ? (
          <div className="userbar">
            <div className="userbar__text">Logged in as {user.email}</div>
            <Link to="/Entry" className="userbar__text link">Log out</Link>
          </div>
          
          
        ) : (
          <div className="userbar">
            <div className="userbar__text">For a better experience &#8594;</div>
            <Link to="/Entry" className="userbar__text link">Log in or Sign up</Link>
          </div>
        )}
    </div>
  );
}

export default UserBar