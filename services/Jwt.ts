import Cookies from 'universal-cookie';
import { JWT_TOKEN } from 'lib/constants';

const cookies = new Cookies();

const MAX_AGE = 3600 * 24; // 24 hours

export function setJwtToken(token: string) {
  cookies.set(JWT_TOKEN, token, {
    path: '/',
    domain: window.location.hostname,
    maxAge: MAX_AGE,
  });
}

export function removeJwtToken() {
  cookies.remove(JWT_TOKEN, { path: '/', domain: window.location.hostname });
}

export function getJwtToken() {
  const jwt = cookies.get(JWT_TOKEN);
  return jwt;
}

export default {
  setJwtToken,
  removeJwtToken,
  getJwtToken,
};
