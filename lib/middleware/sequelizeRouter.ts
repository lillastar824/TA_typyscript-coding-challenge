import validateSchema from './validateSchema';
import asyncEndpoint from './asyncEndpoint';
import { create, read, findByPk, update, destroy } from './sequelize';

export const sequelizeRouterIndex = async (props) => {
  const { req, res, model, schemas, afterCreate = () => {} } = props;
  if (req.method === 'GET') {
    await asyncEndpoint(req, res, async () => read({ req, res, model }));
  } else if (req.method === 'POST') {
    await validateSchema(req.body, schemas.create);
    await asyncEndpoint(req, res, async () =>
      create({ req, res, model, afterCreate })
    );
  } else {
    res.status(404).json({ error: { message: 'Not found' } });
  }
};

export const sequelizeRouterResource = async (props) => {
  const { req, res, model, key = 'id', schemas } = props;
  if (req.method === 'GET') {
    await asyncEndpoint(req, res, async () =>
      findByPk({ req, res, model, id: `id` })
    );
  } else if (req.method === 'PUT') {
    await validateSchema(req.body, schemas.update);
    await asyncEndpoint(req, res, async () =>
      update({
        req,
        res,
        model,
        key,
        path: `query.id`,
      })
    );
  } else if (req.method === 'DELETE') {
    await asyncEndpoint(req, res, async () =>
      destroy({
        req,
        res,
        model,
        key,
        path: `query.id`,
      })
    );
  } else {
    res.status(404).json({ error: { message: 'Not found' } });
  }
};
