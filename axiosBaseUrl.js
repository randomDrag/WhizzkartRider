import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { env } from "./env";

var headers = {
  "Access-Control-Allow-Origin": "*"

}

const axiosBaseUrl =  axios.create({
    baseURL: env.baseUrl,
    headers 
})


// Add a request interceptor
axiosBaseUrl.interceptors.request.use(async function (config) {
    // Do something before request is sent
    
    try {
        const user = await AsyncStorage.getItem('userToken');

        console.log("USER IN INTERCEPTOR", user)
        // Object.assign(config.headers, {Authorization: "Bearer " + user})

        if (user !== null) {
          // console.log("HERE IN AXIOS BASE URL: ", user)

            Object.assign(config.headers, {Authorization: "Bearer " + user})
        }
    }
    catch (err) {
        // error reading value
        console.log("Err while fetching: ", err)
    }
    
    // console.log(config.headers)

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosBaseUrl.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


  

export default axiosBaseUrl