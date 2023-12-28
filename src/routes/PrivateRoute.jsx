import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticated }) => {
    const navigate = useNavigate();
    return isAuthenticated ? element : navigate("/");
};

export default PrivateRoute;
