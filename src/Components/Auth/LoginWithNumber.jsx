import * as React from "react";

import { Link as AuthLink } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from '@mui/icons-material/Google';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginWithNumber({title,link, linkText, signInWithNumber, verifyOTP}) {

    const [number, setNumber] = useState()
    const [userName, setUserName] = useState('')
    const [showOTP, setShowOTP] = useState(false)
    const [otp, setOtp] = useState()

    const getOTP = () => {
      signInWithNumber(number)
      setShowOTP(true)
    }

    const signIn = () => {
        verifyOTP(otp, userName)
    }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
            >
                <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User name"
                name="userName"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
                autoComplete=""
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="number"
                label="Phone number"
                name="number"
                value={number}
                onChange={(e)=>setNumber(e.target.value)}
                autoComplete=""
                autoFocus
              />
              <Button
                type="button"
                onClick={getOTP}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                id="sign-in-button"
              >
                Request OTP
              </Button>
              {
                showOTP ? (
                    <>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="otp"
                            label="OTP"
                            type="number"
                            value={otp}
                            onChange={(e)=>setOtp(e.target.value)}
                            id="otp"
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            onClick={signIn}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                    </>
                ):(<></>)
              }

              <Grid container>
                <Grid item>
                  <AuthLink to={link}>{linkText}</AuthLink>
                </Grid>
              </Grid>
              <Grid container className="google-button" style={{display:"flex", justifyContent:"center", width:"100%"}} >
                <Grid item
                  onClick={signInWithNumber}
                  sx={{
                    display:"flex", 
                    marginTop:'20px', 
                    justifyContent:"center", 
                    background:"#4185ed", 
                    width:"300px",
                    height:'40px',
                    alignItems:"center",
                    cursor:"pointer"
                  }} >
                  <GoogleIcon sx={{color:"white"}}/>
                  <span style={{marginLeft:'20px', color:'white', fontWeight:'600'}}>Sign up with Google</span>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
