import axios from "axios";

const API = "http://127.0.0.1:8000/api/auth/addresses/";

export function authHeaders() {
  const token = localStorage.getItem("access");
  return { Authorization: `Bearer ${token}` };
}

export async function listAddresses() {
  const res = await axios.get(API, { headers: authHeaders() });
  return res.data;
}

export async function createAddress(payload: any) {
  const res = await axios.post(API, payload, { headers: authHeaders() });
  return res.data;
}

export async function updateAddress(id: string, payload: any) {
  const res = await axios.patch(`${API}${id}/`, payload, { headers: authHeaders() });
  return res.data;
}

export async function deleteAddress(id: string) {
  await axios.delete(`${API}${id}/`, { headers: authHeaders() });
}

export async function setDefaultAddress(id: string) {
  await axios.post(`${API}${id}/set_default/`, {}, { headers: authHeaders() });
}
