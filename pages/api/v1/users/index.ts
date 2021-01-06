import db from 'db/models';

const usersRoute = async(req, res) => {
  if(req.method === 'GET') {
    const users = await db.Users.findAll();
    res.status(200).send(users);
  } else {
    res.status(404).json({error: {message: 'Not found'}});
  }
}

export default usersRoute;