import { asyncEndpoint } from 'lib/middleware';
import db from 'db/models';

const userRouter = async (req, res) => {
  console.log(req);
  if (req.method === 'GET') {
    const user = await db.Users.findByPk(req.query.id);

    if (!user) {
      throw {
        status: 404,
        message: 'User not found',
      };
    }
    res.status(200).send(user);
  } else {
    res.status(404).json({ error: { message: 'Not found' } });
  }
};

export default userRouter;
