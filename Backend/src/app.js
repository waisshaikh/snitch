import express from "express";
import morgan from "morgan";
import cookieparser from "cookie-parser"
import authRouter from "./router/auth.router.js"
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
// import cors from "cors";

const app = express();

app.use(passport.initialize());


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());



passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Here, you would typically find or create a user in your database
  // For this example, we'll just return the profile
  return done(null, profile);
}));


app.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route that Google will redirect to after authentication
app.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Generate a JWT for the authenticated user
    const token = jwt.sign({ id: req.user.id, displayName: req.user.displayName }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Send the token to the client
    res.json({ token });
  }
);


app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/api/auth", authRouter)

export default app;


