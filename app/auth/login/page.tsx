"use client";
import React, { useState } from 'react';
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

const Page = () => {
    // State to hold the input values
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e : any) => {
        e.preventDefault(); // Prevent default form submission

        const result = await signIn("credentials", {
            username,
            password,
            redirect: false, // Set redirect to false to get the result back
            callbackUrl: "/"
        });

        if (result?.error) {
            console.error("Authentication error:", result.error);
        } else {
            // Redirect or do something else on success
            window.location.href = result?.url || "/";
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={onSubmit}> {/* Attach onSubmit handler here */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        type="text"
                        label="Username"
                        name="username" // Change this to match the key used in signIn
                        autoFocus
                        value={username} // Bind state to the input
                        onChange={(e) => setUsername(e.target.value)} // Update state on change
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password} // Bind state to the input
                        onChange={(e) => setPassword(e.target.value)} // Update state on change
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit" // This should trigger form submission
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid>
                        <Link href="">Forgot password?</Link>
                    </Grid>
                    <Grid className="footer">
                        <Typography component="h5">
                            Dont have an account? <Link href="">Sign Up</Link>
                        </Typography>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Page; // Updated component name
