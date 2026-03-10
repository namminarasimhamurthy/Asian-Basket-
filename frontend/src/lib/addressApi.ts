import axios from "axios";

const API = "https://api.asianbasket.ie/api/auth/addresses/";

export const getAddresses = async (token: string) => {
  return axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addAddress = async (token: string, data: any) => {
  return axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteAddress = async (token: string, id: number) => {
  return axios.delete(`${API}${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
