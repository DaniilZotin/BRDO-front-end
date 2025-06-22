import axios from 'axios'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8087',
})

api.interceptors.response.use(
	r => r,
	err => {
		return Promise.reject(err)
	}
)
