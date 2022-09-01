import User from "../models/User.js";
import { generateToken } from "../Utils/getToken.js";

export const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const newUser = new User({ name, email, password, isAdmin: false });
    const userFromDb = await newUser.save();
    return res.status(200).json({ userFromDb, error: false });
  } catch (err) {
    return res.status(401).json({ error: true, message: err });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({ user, token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

//here we are sending user details by his/her _id
export const getUserDetailsById = async (req, res) => {
  try {
    const user = await User.findById(req.query.id);
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    return res.status(200).json({ error: false, user });
  } catch (err) {
    return res.status(401).json({ error: true, message: err });
  }
};

//update user profile
export const updateUserProfile = async (req, res) => {
  const userIdFromJwt = req.user._id; //user id we get after decoding JWT token
  const userIdToUpdate = req.query.id; // user id for which update request made

  //checking whether the request is authentic or not
  if (userIdFromJwt != userIdToUpdate) {
    return res.status(403).json({
      error: true,
      message: "Access Denied",
    });
  }

  let user = await User.findById(userIdToUpdate);

  const { name, skills } = req.body;

  user.name = name ? name : user.name;
  user.skills = skills ? skills : user.skills;
  const updatedUser = await user.save();

  return res.status(200).json({ error: false, updatedUser });
};
