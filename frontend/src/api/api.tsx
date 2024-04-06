import axios from 'axios';
import { ProfileData } from '../Profile';

export const createCompany =  async (data: ProfileData) => {
    console.log(data)
    try {
        console.log('try')
        const response = await axios.post("http://127.0.0.1:5000/company", data)
        console.log(response)
        return response.data;
    } catch (error) {
        console.log('error')
        console.error(error)
    }
}