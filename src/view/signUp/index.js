import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import { TextField, Box, Alert, Typography } from "@mui/material";
import { Button } from "@material-ui/core";
import { validationSchema } from "./validationSchema";
import { signUp } from "./../../services/signUp";

const useStyles = makeStyles(() => ({
  wrap: {
    marginTop: "100px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "600px",
    boxShadow: "5px 5px 15px 5px #A8A8A8",
    padding: "15px",
    borderRadius: "5px",
  },
  textField: {
    // ["& fieldset"]: {
    //   borderRadius: "4px",
    // },
    // ["& input:-internal-autofill-selected"]: {
    //   borderRadius: "30px",
    // },
    width: "400px",
  },
  button: {
    margin: "10px",
    width: "400px",
    background: "linear-gradient(to bottom,hsl(287, 27%, 35%), #9198e5)",
    color: "hsl(291, 30%, 83%)",
    padding: "18px",
    borderRadius: "4px",
    textTransform: "none",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [errorTrue, setErrorTrue] = useState("");
  const initialValues = {
    email: "",
    password: "",
    repeatPassword: "",
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // console.log("bojanaa", values);
          signUp(values)
            .then((response) => {
              console.log("odgovor", response);
            })
            .catch((error) => {
              setErrorTrue(error.response.data.message);
              console.log("error", error.response);
            });
        }}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          errors,
          handleBlur,
          touched,
        }) => {
          return (
            <Form onSubmit={handleSubmit} className={classes.wrap}>
              <Box className={classes.container}>
                <h1
                  style={{
                    fontSize: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "40px",
                    marginBottom: "30px",
                    color: "purple",
                  }}
                >
                  Sign up for your account
                </h1>
                <TextField
                  name="email"
                  type="email"
                  className={classes.textField}
                  label="E-mail"
                  color="secondary"
                  margin="normal"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && <p>{errors.email}</p>}
                <TextField
                  name="password"
                  type="password"
                  className={classes.textField}
                  label="Password"
                  color="secondary"
                  margin="normal"
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <p>{errors.password}</p>
                )}
                <TextField
                  type="password"
                  name="repeatPassword"
                  className={classes.textField}
                  label="Confirm password"
                  color="secondary"
                  margin="normal"
                  onChange={handleChange}
                  value={values.repeatPassword}
                  onBlur={handleBlur}
                />
                {errors.repeatPassword && touched.repeatPassword && (
                  <p>{errors.repeatPassword}</p>
                )}
                <Button type="submit" className={classes.button}>
                  Sign Up
                </Button>
                {errorTrue && <Alert severity="error">{errorTrue}</Alert>}
                <Typography>Already have an account? Log in</Typography>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default SignUp;
