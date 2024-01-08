import axios from 'axios'

const BASE_URL = 'http://localhost:4000'

export function getRowsMixin({start=0, limit=10, sort='id', order='asc'}) {
  return axios.get(`${BASE_URL}/rows?_start=${start}&_limit=${limit}&_sort=${sort}&_order=${order}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .catch((error) => console.error(error));
}

export function deleteRowMixin(id) {
  return axios.delete(`${BASE_URL}/rows/${id}`)
    .catch((error) => console.error(error));
}

export function addRowMixin(obj) {
  return axios.post(`${BASE_URL}/rows`, obj)
    .catch((error) => console.error(error));
}

export function modifyRowMixin(id, obj) {
  return axios.patch(`${BASE_URL}/rows/${id}`, obj)
    .catch((error) => console.error(error));
}

export function filterItemsMixin(obj) {
  const queryString = String(new URLSearchParams(obj));

  let finalQueryString = queryString.replace('year', 'year_gte').replace('price', 'price_lte')

  finalQueryString = finalQueryString + '&_sort=price&_order=ASC'

  return axios.get(`${BASE_URL}/rows?${finalQueryString}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .catch((error) => console.error(error));
}
