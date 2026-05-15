import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token",
    });

  }
};

export const verifyToken = (
req,
res,
next
) => {

try {

const authHeader =
  req.headers.authorization;

if (!authHeader) {

  return res.status(401).json({
    message:
      "No token provided",
  });
}

const token =
  authHeader.split(" ")[1];

const decoded =
  jwt.verify(
    token,
    process.env.JWT_SECRET
  );

req.user = decoded;

next();

} catch (error) {

res.status(401).json({
  message:
    "Invalid token",
});

}
};




export const verifyAdmin = (
req,
res,
next
) => {

if (
req.user.role !== "admin"
) {

return res.status(403).json({
  message:
    "Access denied",
});

}

next();
};