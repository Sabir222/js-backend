import passport from "passport";
import { Strategy } from "passport-local";
import { getUserByEmail, getUserById, userData } from "../queries/userQueries";

//this f(x) is responsible for storing the user object in a session
passport.serializeUser((user: any, done) => {
  console.log(user);
  done(null, user.user_id);
});

//
passport.deserializeUser(async (id: number, done) => {
  try {
    const result = await getUserById(id);
    if (result.rows.length === 0) {
      throw new Error("User not found!");
      // return done(null, false, { message: "Invalid credentials" });
    }
    const user = result.rows[0];
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

//implementing the local strategy
export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const result = await getUserByEmail(email);

      if (result.rows.length === 0) {
        throw new Error("User not found!");
        // return done(null, false, { message: "Invalid credentials" });
      }

      const user = result.rows[0];

      if (password !== user.hashed_password) {
        throw new Error("Password incorrect!");
        // return done(null, false, { message: "Invalid credentials" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
