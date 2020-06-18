import { useEffect } from "react";

import { useSelector } from "react-redux"; //Redux hook to get information from the store

//All custom hooks should be prefixed with the 'use' keyword

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAuth = (history) => {
  const { currentUser } = useSelector(mapState); //use selector works like the connect function to map state to an object (here currentUser)

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
