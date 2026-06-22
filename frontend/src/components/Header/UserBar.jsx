function UserBar({ user }) {

  return (
    <div>
      {user
        ? `Logged in as ${user.email}`
        : "Please log in or sign up"}
    </div>
  );
}

export default UserBar