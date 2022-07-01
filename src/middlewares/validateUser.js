import db from '../databases/db.js';

async function validateUser(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const session = await db.collection('sessions').findOne({ token });
  // console.log(session)
  // console.log(token)
  
  if (!session) {
    return res.sendStatus(471);
  }

  res.locals.session = session;

  next();
}

export default validateUser;