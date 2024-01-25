import { MdError } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="container not-found">
      <MdError />
      <h1>Error 404</h1>
      <h3>Page Not Found 😢</h3>
    </div>
  );
};

export default NotFound;
