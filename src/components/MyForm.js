import React, { useState } from "react";
import { Container, Input, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUserSlice } from "../containers/usersSlice";
import { CREATE_USER, UPDATE_USER_BY_ID } from "./sagas/types";
// import { nanoid } from "nanoid";

const MyForm = () => {
  const user = useSelector((store) => store.users);
  const userList = useSelector((store) => store.user); // Assuming userList is an array of students
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const isUpdateMode = user.id !== 0;

  const validateForm = () => {
    if (
      user.name.trim() === "" ||
      user.lname.trim() === "" ||
      user.stuId.trim() === "" ||
      user.email.trim() === "" ||
      user.phno.trim() === "" ||
      user.address.trim() === ""
    ) {
      setErrorMessage("Please fill in all the fields");
      return false;
    }

    if (user.name.length < 3 || user.lname.length < 3) {
      setErrorMessage("First name and last name must have a minimum of 3 characters");
      return false;
    }

    const stuIdRegex = /^\d+$/;
    if (!stuIdRegex.test(user.stuId)) {
      setErrorMessage("Student ID should contain only numbers");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(user.phno)) {
      setErrorMessage("Please enter a valid 10-digit phone number");
      return false;
    }

    if (user.address.length < 5) {
      setErrorMessage("Address must have a minimum of 5 characters");
      return false;
    }

    return true;
 

    if (isUpdateMode) {
      // If in update mode, disable stuId validation
      return true;
    }

    if (isStuIdDuplicate(user.stuId)) {
      setErrorMessage("Student ID already exists");
      return false;
    }

    return true;
  };

  const isStuIdDuplicate = (stuId) => {
    return userList.some((existingUser) => existingUser.stuId === stuId);
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    if (!isUpdateMode && isStuIdDuplicate(user.stuId)) {
      setErrorMessage("Student ID already exists");
      return;
    }

    if (user.id === 0) {
      dispatch({ type: CREATE_USER, user: { ...user, id: Date.now() } });
    } else {
      dispatch({ type: UPDATE_USER_BY_ID, user });
    }

    dispatch(
      setUserSlice({
        id: 0,
        name: "",
        lname: "",
        stuId: "",
        email: "",
        phno: "",
        address: "",
      })
    );

    setErrorMessage("");
  };

  return (
    <>
      <h1>{isUpdateMode ? "Update Student" : "Add Student"}</h1>
      <Container
        className="container"
        style={{
          display: "grid",
          auto: 0,
          border: "1px solid black",
          width: "fit-content",
          alignItems: "center",
        }}
      >
        <Input
          style={{ height: "30px", width: "400px", marginTop: "20px" }}
          onChange={(event) => dispatch(setUserSlice({ ...user, name: event.target.value }))}
          placeholder="First Name"
          value={user.name}
          fullWidth
        />
        <Input
          style={{ height: "30px", width: "400px", marginTop: "20px" }}
          onChange={(event) => dispatch(setUserSlice({ ...user, lname: event.target.value }))}
          placeholder="Last Name"
          value={user.lname}
          fullWidth
        />
        <Input
          style={{ height: "30px", width: "400px", marginTop: "20px" }}
          onChange={(event) => dispatch(setUserSlice({ ...user, stuId: event.target.value }))}
          placeholder="Student Id"
          value={user.stuId}
          fullWidth
          disabled={isUpdateMode} // Disable stuId input in update mode
        />
	      <Input
          style={{ height: "30px", width: "400px", marginTop: "20px" }}
          onChange={(event) => dispatch(setUserSlice({ ...user, email: event.target.value }))}
          placeholder="E-mail Id"
          value={user.email}
          fullWidth
        />

        <Input
          style={{ height: "30px", width: "400px", marginTop: "20px" }}
          onChange={(event) => dispatch(setUserSlice({ ...user, phno: event.target.value }))}
          placeholder="Phone no"
          value={user.phno}
          fullWidth
        />

        <Input
          style={{ height: "30px", width: "400px", marginTop: "20px" }}
          onChange={(event) => dispatch(setUserSlice({ ...user, address: event.target.value }))}
          placeholder="Address"
          value={user.address}
          fullWidth
        />
        {errorMessage && (
          <Typography variant="body2" color="error" style={{ marginTop: "10px" }}>
            {errorMessage}
          </Typography>
        )}
        <Button
          style={{ height: "30px", width: "80px", margin: "20px 0px 20px 150px" }}
          className="btn"
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Container>
    </>
  );
};

export default MyForm;
