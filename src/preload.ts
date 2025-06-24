// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from 'electron'
import axios from 'axios'

const axiosInstance = axios.create()

contextBridge.exposeInMainWorld('api', {
    axios: {
      get: axiosInstance.get.bind(axiosInstance),
      post: axiosInstance.post.bind(axiosInstance)
    }
  }
)

