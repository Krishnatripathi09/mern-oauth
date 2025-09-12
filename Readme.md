Installed All the Dependencies( "express",
"express-session",
"nodemon",
"passport",
"passport-google-oauth2",) and then created a express server which is listening on PORT 3000:

And then we go passport google strategy to use passport as middleware in our App. (https://www.passportjs.org/packages/passport-google-oauth2/)

As we are using the oauth 2 we will create a file auth.js and paste the below code from above URL in auth.js file.

```JS
const passport = require("passport"); // We have to also import Passport
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://yourdomain:3000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

```

Now go to https://console.cloud.google.com/ and then click on create credentials and select oauth clientID and there we provide the requested information and also provide requested callback URL on successful Authentication.

Now once created we will replace our credentials with the oauth client credentials in our APP.
