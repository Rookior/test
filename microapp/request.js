import axios from 'axios'
import { getSeventyToken } from './token'

// const VUE_APP_BASE_API = 'https://192.168.88.98:12000/gateway'
// const DEFAULT_SEVENTY_BASE_URL = 'https://192.168.88.158:9600/gateway'

const DEFAULT_SEVENTY_BASE_URL = '/gateway'

let seventyBaseURL = ''

const trimTrailingSlash = (value) => String(value || '').replace(/\/+$/, '')

const getMicroAppData = () => {
  try {
    return typeof window !== 'undefined' ? window.microApp?.getData?.() : undefined
  } catch {
    return undefined
  }
}

const getReferrerOrigin = () => {
  try {
    if (typeof document === 'undefined' || !document.referrer) return ''
    return new URL(document.referrer).origin
  } catch {
    return ''
  }
}

const resolveDefaultSeventyBaseURL = () => {
  const data = getMicroAppData()

  if (data?.gatewayBaseURL) {
    return trimTrailingSlash(data.gatewayBaseURL)
  }

  if (data?.baseOrigin) {
    return `${trimTrailingSlash(data.baseOrigin)}${DEFAULT_SEVENTY_BASE_URL}`
  }

  if (typeof window !== 'undefined' && window.__MICRO_APP_ENVIRONMENT__) {
    const referrerOrigin = getReferrerOrigin()
    if (referrerOrigin) {
      return `${referrerOrigin}${DEFAULT_SEVENTY_BASE_URL}`
    }
  }

  return DEFAULT_SEVENTY_BASE_URL
}

export const setSeventyBaseURL = (baseURL) => {
  seventyBaseURL = baseURL ? trimTrailingSlash(baseURL) : ''
}

export const getSeventyBaseURL = () => seventyBaseURL || resolveDefaultSeventyBaseURL()

export const createSeventyRequest = (options = {}) => {
  const service = axios.create({
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    ...options
  })

  service.interceptors.request.use((config) => {
    if (!config.skipAuthorization) {
      const token = getSeventyToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  })

  service.interceptors.response.use(
    (response) => {
      if (response.config?.skipBusinessCodeCheck) {
        return response.data
      }

      if (response.data instanceof ArrayBuffer || response.data instanceof Blob) {
        return response.data
      }

      const { code } = response.data || {}
      if (Number(code) === 200) {
        return response.data
      }

      return Promise.reject(response.data)
    },
    (error) => Promise.reject(error)
  )

  return service
}

const service = createSeventyRequest()

export default function request70(config) {
  return service({
    baseURL: getSeventyBaseURL(),
    method: 'post',
    ...config
  })
}
