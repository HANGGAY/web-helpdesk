// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];

//   if (!authHeader) {
//     return res.status(403).json({ message: 'No token provided!' });
//   }

//   // Split format "Bearer <token>"
//   const parts = authHeader.split(' ');

//   if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
//     return res.status(401).json({ message: 'Invalid token format!' });
//   }

//   const token = parts[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Unauthorized!' });
//   }
// };

// export const checkRole = (allowedRoles) => {
//   return (req, res, next) => {
//     const userRole = req.user?.role_name;

//     if (!userRole || !allowedRoles.includes(userRole)) {
//       return res
//         .status(403)
//         .json({ error: 'Akses ditolak: role tidak sesuai' });
//     }

//     next();
//   };
// };

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided!' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return res.status(401).json({ message: 'Invalid token format!' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecretkey');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }
};

export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role_name;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ error: 'Akses ditolak: role tidak sesuai' });
    }

    next();
  };
};
