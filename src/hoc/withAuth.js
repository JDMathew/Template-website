import { useAuth } from "../customHooks";
import { withRouter } from "react-router-dom";

const WithAuth = (props) => {
  const { history } = props; //destruct history from props (withRouter props)

  return useAuth(history) && props.children; //we could also pass all props down to useAuth but we don't need to give it that complexity.
};

export default withRouter(WithAuth);
