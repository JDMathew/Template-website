import { useSelector } from "react-redux";
import { checkUserIsAdmin } from "../Utils";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAdminAuth = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) {
      history.push("/login");
    }
    return () => {
      //cleanup
    };
  }, [currentUser]);
  return currentUser; //will evaluate to true
};

export default useAdminAuth;
