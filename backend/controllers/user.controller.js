import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * @desc Generate new access token and refresh token
 * @param {string} userId - userId of the user
 * @returns {Object} The newly generated access token and refresh token
 * @access Public
 */
const generateAccessAndRefreshToken = async (userId) => {
  try {
    // fetch user from database
    const user = await User.findOne(userId);

    // generate access token
    const accessToken = user.generateAccessToken();

    // generate refresh token
    const refreshToken = user.generateRefreshToken();

    // save refresh token in the database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // return access token and refresh token
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating token");
  }
};

/**
 * @route POST /api/v1/users/register
 * @desc Create a new user
 * @param {string} name - Name of the user
 * @param {string} email - Email of the user
 * @param {string} password - Password of the user
 * @returns {Object} The created user
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  // destructure name,email and password from the request body
  const { name, email, password } = req.body;

  // check if all the fields are present
  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // check if the user already exist with the same email
  const existingUser = await User.findOne({ email });

  // if the user already exist throw a new error with status code 409
  if (existingUser) {
    throw new ApiError(409, "User with email already exists");
  }

  // craete new user
  let user = {};
  try {
    user = await User.create({
      name,
      email,
      password,
    });
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal error"));
  }

  // fetch the newly created user
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // check if the user is created or not if not then return new error with status code 500
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // return the newly created user
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

/**
 * @route POST /api/v1/users/login
 * @desc Login user
 * @param {string} email - Email of the user
 * @param {string} password - Password of the user
 * @returns {Object} The logged in user and set the cookies
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  // destructure email and password from the request body
  const { email, password } = req.body;

  // return a new error with status code 400 if email or password is not found in the request body
  if (!email || !password) {
    throw new ApiError(400, "Email and password both are required");
  }

  // fetch the user from the database using email
  const existinguser = await User.findOne({ email });

  // if user does not exist return new error with status code 404
  if (!existinguser) {
    throw new ApiError(404, "User does not exits");
    // return next(new ApiError(404, "User does not exist"));
  }

  // verify the emtered password
  const isPasswordCorrect = await existinguser.isPasswordCorrect(password);

  // if password is not correct return a new error with status code 401
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // destructure access and refresh token from the function
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existinguser._id
  );

  // define options for cookie
  const options = {
    httpOnly: true,
    secure: true,
  };

  // set the cookies and return email and name with the response object
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            email: existinguser.email,
            name: existinguser.name,
            profilePic: existinguser.profilePic,
            userFileFolder: existinguser.userFileFolder,
          },
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

/**
 * @route POST /api/v1/users/logout
 * @desc Logout user
 * @returns {Object} The empty object and clear the cookies
 * @access Private
 */
const logoutUser = asyncHandler(async (req, res) => {
  // find the user and remove the refresh token field from the document
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  // define options for the cookie
  const options = {
    httpOnly: true,
    secure: true,
  };

  // clear cookies and return the empty object with status code 200
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

/**
 * @route GET /api/v1/user/currentUser
 * @desc Login user
 * @param {string} email - Email of the user
 * @param {string} password - Password of the user
 * @returns {Object} The logged in user and set the cookies
 * @access Public
 */
const getUser = asyncHandler(async (req, res) => {
  // destructure email and password from the request body

  const userId = req.user._id;
  // return a new error with status code 400 if email or password is not found in the request body
  if (userId) {
    throw new ApiError(400, "Unauthorized access");
  }

  // fetch the user from the database using email
  const existinguser = await User.findOne({ _id: userId });

  // if user does not exist return new error with status code 404
  if (!existinguser) {
    throw new ApiError(404, "User does not exits");
  }

  // set the cookies and return email and name with the response object
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          email: existinguser.email,
          name: existinguser.name,
          profilePic: existinguser.profilePic,
        },
        accessToken,
        refreshToken,
      },
      "User logged In Successfully"
    )
  );
});

const updateFolder = asyncHandler(async (req, res) => {
  try {
    const email = req.user.email;
    const { data } = req.body;

    if (!email) {
      throw new ApiError(400, "Unauthorized access");
    }

    if (!data) {
      throw new ApiError(400, "Data not provided");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    user.userFileFolder = data;
    await user.save();

    const updatedUserData = await User.findOne({ email });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          userFileFolder: updatedUserData.userFileFolder,
        },
        "Successfully updated"
      )
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, "Internal Error"));
  }
});

export { registerUser, loginUser, logoutUser, getUser, updateFolder };
