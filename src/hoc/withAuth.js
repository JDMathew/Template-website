import { useAuth } from "../customHooks";

const WithAuth = (props) => {
  return useAuth(props) && props.children; //we could also pass all props down to useAuth but we don't need to give it that complexity.
};

export default WithAuth;
