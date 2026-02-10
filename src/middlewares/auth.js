export default async function authenticateToken(req, res, next) {
  const token = req.header('Auhorization')?.split(' ')[1];

  if (!token) {
    const error = new Error('No token provided');
    error.statusCode = 401;

    throw error;
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
  });

  next();
}