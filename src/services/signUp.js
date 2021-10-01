import axios from "axios";

export const signUp = async (values) => {
  const response = await axios.post("http://localhost:8000/api/auth/signup", {
    email: values.email,
    password: values.password,
    repeatPassword: values.repeatPassword,
  });

  console.log("response ===", response);
  return response;
};
