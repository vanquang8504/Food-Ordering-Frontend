import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../State/Authentication/Action'


const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: ""
}
export const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        dispatch(registerUser({userData:values, navigate}))
        console.log(values)
    }
    return (
        <div>
            <Typography variant='h5'>
                Register
                <Formik initialValues={initialValues}
                    onSubmit={handleSubmit}>
                    <Form>
                        <Field
                            as={TextField}
                            name="fullName"
                            label="Full Name"
                            fullWidth
                            variant="outlined"
                            margin="normal" />
                        <Field
                            as={TextField}
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal" />
                        <Field
                            as={TextField}
                            name="password"
                            label="Password"
                            fullWidth
                            variant="outlined"
                            margin="normal" 
                            type = "password"/>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="role-simple-select-label">Role</InputLabel>
                            <Field
                            as={Select}
                                labelId="role-simple-select-label"
                                id="role-simple-select"
                                name = "role"
                                // value={age}
                                label="Role"
                                // onChange={handleChange}
                            >
                                <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                                <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                            </Field>
                        </FormControl>

                        <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type='submit' variant='contained'>Register</Button>
                    </Form>

                </Formik>
                <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                    If have an acconut already ?
                    <Button size='small' onClick={() => navigate("/account/login")}>
                        Login
                    </Button>
                </Typography>
            </Typography>
        </div>
    )
}
