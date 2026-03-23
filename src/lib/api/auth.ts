import axios from "axios";
import { getApiUrl } from "../env";

const API_URL = getApiUrl();

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/register`, credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axios.post(`${API_URL}/auth/logout`);
  },
};
