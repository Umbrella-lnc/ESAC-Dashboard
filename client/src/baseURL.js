let baseURL = ''

if (process.env.NODE_ENV === 'production') {
  //baseURL = 'https://esac-dashboard.herokuapp.com'
  baseURL = ''
} else {
  baseURL = 'http://localhost:5000'
}

export default baseURL
