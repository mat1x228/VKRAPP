import axios from 'axios';

//add your url
const url = 'http://your_url.com/api'

export const login = async (login, password, doRegister) => {
  try {
    const response = await axios.post(`${url}/login`, { login, password, do_register: doRegister });
    return response.data.access_token;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};

export const generateToken = async () => {
  try {
    const response = await axios.post(`${url}/login`);
    return response.data.token;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};

export const getStats = async (conferenceId) => {
  try {
    const response = await axios.get(`${url}/message/${conferenceId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
};

