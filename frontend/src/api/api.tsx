import axios from 'axios';
import { ProfileData } from '../Profile';
import { EmailData } from '../components/AssignDepartmentModal';

export const createCompany =  async (data: ProfileData) => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/company", data)
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

export const sendEmail = async (data:  EmailData) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/email", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCompany = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const findIndustry = async (company) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000//findIndustry/${company}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};