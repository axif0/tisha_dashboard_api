import { API_URL } from '../config/config';

// In your registration function:
const response = await axios.post(`${API_URL}/api/users/register`, userData, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
}); 