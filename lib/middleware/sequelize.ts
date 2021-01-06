import get from 'lodash/get';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import omit from 'lodash/omit';
import qs from 'querystring';
import db from '../../db';
import toJson from './toJson';

interface SequelizeOptions {
  offset: number;
  limit: number;
  order?: Array<any>;
  attributes?: Array<string>;
  include?: Array<any>;
  logging?: any;
}

interface Include {
  model: string;
  as?: string;
  attributes?: string;
  where?: any;
  offset?: number;
  limit?: number;
}

const includeParse = (includeModel: string) => {
  const { model, as, attributes, limit, offset, ...rest }: any = qs.parse(
    includeModel,
    ';',
    '='
  );
  const include: Include = {
    model: db[model],
  };
  if (as) {
    include.as = as;
  }
  if (attributes) {
    include.attributes = attributes.split(',');
  }
  if (limit) {
    include.limit = limit;
  }
  if (offset) {
    include.offset = offset;
  }
  const otherColumns = omit(rest, [
    'page',
    'limit',
    'order',
    'attributes',
    'include',
  ]);
  if (otherColumns) {
    include.where = otherColumns;
  }
  return include;
};

export const withSequelize = (props) => {
  const { req } = props;
  const { Sequelize } = db;
  let {
    page = 0,
    limit = 100,
    order = '',
    attributes = ['id'],
    include,
  }: any = req.query;
  let options: SequelizeOptions = {
    offset: page === 0 ? 0 : parseInt(page) * parseInt(limit),
    limit: parseInt(limit),
  };
  let conditions = {};
  if (order && isString(order)) {
    const [column, direction = 'ASC'] = order.split(',');
    options.order = [[Sequelize.col(column), direction]];
  } else if (order && isArray(order)) {
    options.order = order.map((orderGroup = '') => {
      const [column, direction = 'ASC'] = orderGroup.split(',');
      return [Sequelize.col(column), direction];
    });
  }
  if (attributes && isString(attributes)) {
    options.attributes = attributes.split(',');
  } else if (attributes && isArray(attributes)) {
    options.attributes = attributes;
  }
  if (attributes && isString(attributes)) {
    options.attributes = attributes.split(',');
  } else if (attributes && isArray(attributes)) {
    options.attributes = attributes;
  }
  if (include) {
    if (isArray(include)) {
      options.include = include.map((includeModel) => {
        const include: Include = includeParse(includeModel);
        return include;
      });
    } else {
      options.include = [includeParse(include)];
    }
  }
  const otherColumns = omit(req.query, [
    'page',
    'limit',
    'order',
    'attributes',
    'include',
  ]);
  if (otherColumns) {
    conditions = {
      where: otherColumns,
    };
  }
  req.sequelize = {
    options,
    conditions,
  };
};

export const create = async (props) => {
  const { req, res, model, afterCreate = () => {} } = props;
  const dbModel = db[model];
  if (!dbModel) {
    throw {
      status: 404,
      message: 'Model not found',
    };
  }
  req.results = await dbModel.create(req.body);
  await afterCreate(req.results);
  toJson(req, res);
};

export const bulkCreate = async (props) => {
  const { req, res, model, path } = props;
  const dbModel = db[model];
  if (!dbModel) {
    throw {
      status: 404,
      message: 'Model not found',
    };
  }
  const data = get(req.body, path);
  req.results = await dbModel.bulkCreate(data, { individualHooks: true });
  toJson(req, res);
};

export const read = async (props) => {
  const { req, res, model } = props;
  const dbModel = db[model];
  if (!dbModel) {
    throw {
      status: 404,
      message: 'Model not found',
    };
  }
  withSequelize(props);
  req.results = await dbModel.findAll({
    ...req.sequelize.conditions,
    ...req.sequelize.options,
  });
  toJson(req, res);
};

export const findByPk = async (props) => {
  const { req, res, model, id } = props;
  const dbModel = db[model];
  if (!dbModel) {
    throw {
      status: 404,
      message: 'Model not found',
    };
  }
  withSequelize(props);
  req.results = await dbModel.findByPk(req.query[id], {
    ...req.sequelize.conditions,
    ...req.sequelize.options,
  });
  toJson(req, res);
};

export const findOne = async (props) => {
  const { req, res, model } = props;
  const dbModel = db[model];
  if (!model) {
    throw {
      status: 404,
      message: 'Model not found',
    };
  }
  withSequelize(props);
  req.sequelize.conditions.where = {
    ...req.sequelize.conditions.where,
  };
  req.results = await dbModel.findOne({
    ...req.sequelize.conditions,
    ...req.sequelize.options,
  });
  toJson(req, res);
};

export const update = async (props) => {
  const { req, res, model, key, path, fields } = props;
  const dbModel = db[model];
  if (!dbModel) {
    throw {
      status: 404,
      message: 'Model not found',
    };
  }
  req.results = await dbModel.update(req.body, {
    where: {
      [key]: get(req, path),
    },
    fields,
  });
  toJson(req, res);
};

export const destroy = async (props) => {
  const { req, res, model, key, path } = props;
  const dbModel = db[model];
  if (!dbModel) {
    throw {
      status: 404,
      message: 'Model not found',
    };
  }
  req.results = await dbModel.destroy({
    where: {
      [key]: get(req, path),
    },
  });
  toJson(req, res);
};
