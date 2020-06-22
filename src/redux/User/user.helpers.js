import {
  auth,
  handleUserProfile,
  GoogleProvider,
  getCurrentUser,
} from "./../../firebase/utils";

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: "http://localhost:3000/login", // This is the retrun url given to firebase and it is the url we want to send the user once they have reset their password from the reset link they were emailed
  };

  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        //What to do when the promis is successful
        resolve();
      })
      .catch((error) => {
        //What to do when the promis is fails
        const err = ["Email not found. Please try again"];
        reject(err);
      });
  });
};
