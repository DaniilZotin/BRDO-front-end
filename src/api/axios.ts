import axios from 'axios'

export const api = axios.create({
	baseURL:
		import.meta.env.VITE_API_URL || 'http://16.170.133.209:8080/',
})

api.interceptors.response.use(
	r => r,
	err => {
		return Promise.reject(err)
	}
)
