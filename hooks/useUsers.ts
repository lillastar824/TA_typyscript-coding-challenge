import Api from '@services/Api';
import useSWR from 'swr';

export default function useUsers() {
  return Api.get(`/api/v1/users`);
  // return useSWR(`/api/v1/users`, Api.get);
}

export function getUserInfo(id) {
  return Api.get(`/api/v1/users/${id}`);
}