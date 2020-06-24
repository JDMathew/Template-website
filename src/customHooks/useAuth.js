import { useEffect } from "react";

import { useSelector } from "react-redux"; //Redux hook to get information from the store
import { useHistory } from "react-router-dom";

//All custom hooks should be prefixed with the 'use' keyword

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAuth = (props) => {
  const { currentUser } = useSelector(mapState); //use selector works like the connect function to map state to an object (here currentUser)
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
    return () => {
      //cleanup
    };
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
