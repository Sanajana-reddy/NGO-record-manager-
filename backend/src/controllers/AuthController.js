import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {

    const { token } = req.body;

    // verify google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      sub,
      email,
      name,
      picture,
    } = payload;

    // check existing user
    let user = await User.findOne({ email });

    // create new user
    if (!user) {

      user = await User.create({
        name,
        email,
        googleId: sub,
        profilePicture: picture,
      });

    }

    // generate jwt
    const appToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Google login successful",
      token: appToken,
      user,
    });

  } catch (error) {

    console.log("Google login error:", error.message);
    res.status(500).json({
      message: error.message,
    });

  }
};