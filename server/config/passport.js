const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email , password , done){
        User.findOne({email}).then(user => {
            if(user.password){
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err) { return done(err)}
                    if(result) {return done(null , user)}
                });
            }else{
                return done('Пользователь не найден')
            }
        }).catch(e => {
            return done(e)
        })
    }
))

passport.use(new GoogleStrategy({
    clientID: "256647118134-gikcogte2rn8f4qant7msragc0a0os8h.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/api/auth/google",
    scope: ["openid", "email", "profile"],
  },
  async function (accessToken, refreshToken, profile, cb) {
    const user = await User.find({ googleId: profile.id });
    console.log(user);
    console.log(profile);
    const newUser = await new User({
      googleId: profile.id,
      full_name: profile.displayName,
      email: profile.emails[0].value,
    }).save();

    return cb(null, newUser);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
)
);

passport.serializeUser(function(user, done){
    done(null , user._id)
})

passport.deserializeUser(function(id , done){
    User.findById(id).then((user , err) =>{
        done(err , user)
    })
})