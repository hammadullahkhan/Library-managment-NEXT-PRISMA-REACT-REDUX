import axios, { AxiosInstance, AxiosError } from 'axios'

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:3001/api'  // Use full URL in production
  : '/api'  // Use proxy in development

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`)
        return config
      },
      (error) => {
        console.error('Request error:', error)
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        return response
      },
      (error: AxiosError) => {
        console.error('Response error:', error.response?.data || error.message)
        
        // Handle CORS errors specifically
        if (error.message.includes('CORS') || error.code === 'ERR_NETWORK') {
          console.error('CORS Error: Make sure your backend has CORS enabled')
        }
        
        return Promise.reject(error)
      }
    )
  }

  // Rest of your API methods remain the same...
  async get<T>(url: string, params?: any): Promise<{ data: T }> {
    return this.api.get<T>(url, { params })
  }

  async post<T>(url: string, data?: any): Promise<{ data: T }> {
    return this.api.post<T>(url, data)
  }

  async put<T>(url: string, data?: any): Promise<{ data: T }> {
    return this.api.put<T>(url, data)
  }

  async delete<T>(url: string): Promise<{ data: T }> {
    return this.api.delete<T>(url)
  }
}

const apiService = new ApiService()
export default apiService.api
export { apiService }