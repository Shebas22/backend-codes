import dotenv from "dotenv";
dotenv.config();
import passport from 'passport';
import local from 'passport-local';
import GithubStrategy from 'passport-github2';

import UserManager from "../managers/userManager.js";
import SessionManager from "../managers/sessionManager.js";

const { GITHUB_CLIENT_ID, GITHUB_SECRET_ID, GITHUB_CALLBACK_URL } = process.env;
const credentials = {
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_SECRET_ID,
  callbackURL: GITHUB_CALLBACK_URL
};

const github = new GithubStrategy(credentials, async (accessToken, refreshToken, profile, done) => {
  const manager = new SessionManager();
  try {
    // console.log(profile);
    const user = await manager.login({email : profile._json.email, password : 'github'});
    if (user.id) {
      console.log(user);
      return done(null, user)
    }
  } catch (error) {
    try {
      const dto = {
        firstName: profile._json.name,
        lastName: '',
        age: 18,
        email: profile._json.email,
        password: 'github'
      }
      let result = await manager.signup(dto);
      console.log(result);
      return done(null, result);
    } catch (error) {
      return done(error)
    }
  }
});

const LocalStrategy = local.Strategy;

const signup = new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
  try {
    const userManager = new UserManager();
    let user = await userManager.getOneByEmail(req.body.email);
    if (user.id) {
      throw new Error('User already exists.')
    }
    const sessionManager = new SessionManager();
    let result = await sessionManager.signup(req.body);
    console.log(result);
    return done(null, result);
  }
  catch (error) {
    return done(error)
  }
});

const login = new LocalStrategy({ usernameField: 'email' }, async ( username, password, done) => {
  try {
    const manager = new SessionManager();
    let user = await manager.login({email : username, password : password});
    console.log(user);
    return done(null, user);
  }
  catch (error) {
    return done(error)
  }
});

const initializePassport = () => {
  passport.use('register', signup);
  passport.use('login', login);
  passport.use('github', github);
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const manager = new UserManager();
    try {
      const user = await manager.getOne(id);
      return done(null, user);
    } catch (error) {
      return done(error)
    }
  });
}

export default initializePassport;
