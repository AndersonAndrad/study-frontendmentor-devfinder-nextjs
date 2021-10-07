import axios from "axios"

export const ApiGitHub = axios.create( {
  baseURL: 'https://api.github.com'
} )