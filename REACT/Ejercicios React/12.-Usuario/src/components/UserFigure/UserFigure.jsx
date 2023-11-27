import "./UserFigure.css";

export const UserFigure = (user) => {
  return (
    <figure className="dataProfile">
      <img src={user.user.image} alt="user image" className="imageUser" />
      <h4 className="emailUser">Email: {user.user.userEmail}</h4>
    </figure>
  );
};
