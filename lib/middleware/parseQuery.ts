export default function parseQuery(req) {
  if (!req?.query) {
    return;
  }
  Object.keys(req.query).forEach((key: string) => {
    if (key.includes('[]')) {
      const [newKeyName] = key.split('[]');
      req.query[newKeyName] = req.query[key];
      delete req.query[key];
    } else {
      return;
    }
  });
}
