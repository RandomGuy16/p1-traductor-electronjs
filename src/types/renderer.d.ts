declare global {
  interface Window {
    api: {
      axios: {
        get: typeof axios.get,
        post: typeof axios.post
      }
    }
  }
}