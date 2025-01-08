import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../utilities/AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    const thisModal = document.getElementById("my_modal_4");

    if (thisModal) {
      thisModal.showModal();
      return;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
