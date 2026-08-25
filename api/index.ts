import app from '../apps/server/src/server';

export default function handler(req: any, res: any) {
  return app(req, res);
}
