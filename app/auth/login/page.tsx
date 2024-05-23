"use client";
import React, { useRef } from 'react'
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { signIn } from 'next-auth/react';

const page = () => {
    const userName = useRef("");
    const pass = useRef("");


    const onSubmit = async () => {
        const result = await signIn("credentials",{
            username: userName.current,
            password: pass.current,
            redirect:true,
            callbackUrl: "/"
        })
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box component="form">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            type="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            onChange={(e)=>{userName.current = e.target.value}}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={(e)=>{pass.current = e.target.value}}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={onSubmit}
                        >
                            Sign In
                        </Button>
                        <Grid>
                            <Link href="">Forgot password?</Link>
                        </Grid>
                        <Grid className="footer">
                            <Typography component="h5">
                                Don't have an account? <Link href="">Sign Up</Link>
                            </Typography>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default page
