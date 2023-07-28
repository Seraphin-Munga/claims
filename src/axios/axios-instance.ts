import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { message } from "antd"; // Import the Ant Design message component

// Create a variable to keep track of the number of ongoing requests
let ongoingRequests = 0;

const instance: AxiosInstance = axios.create({
  baseURL: "https://oyster-app-ejs5j.ondigitalocean.app/",
});

// Function to display a global error message using Ant Design's message component
const displayGlobalError = (messageText: string) => {
  message.error(messageText);
};

// Function to display a success message using Ant Design's message component
const displayGlobalSuccess = (messageText: string) => {
  message.success(messageText);
};

// Request interceptor
instance.interceptors.request.use(
  (config: any) => {
    // Show the spinner for the first ongoing request
    if (ongoingRequests === 0) {
      // Add your code here to show the spinner (e.g., using a global loading state)
    }

    ongoingRequests++;

    return config;
  },
  (error: AxiosError) => {
    ongoingRequests--;

    // Hide the spinner if there are no ongoing requests
    if (ongoingRequests === 0) {
      // Add your code here to hide the spinner (e.g., using a global loading state)
    }

    // Handle request error and display the error message
    displayGlobalError("Request Error: " + error.message);

    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    ongoingRequests--;

    // Hide the spinner if there are no ongoing requests
    if (ongoingRequests === 0) {
      // Add your code here to hide the spinner (e.g., using a global loading state)
    }

    // Check if the request method is POST and if the response status is successful (2xx range)
    if (response.config.method?.toUpperCase() === "POST" && response.status >= 200 && response.status < 300) {
      // Display the success message for successful POST requests
      displayGlobalSuccess("POST Request Successful!");
    }

    // Modify the response data if needed
    return response;
  },
  (error: AxiosError) => {
    ongoingRequests--;

    // Hide the spinner if there are no ongoing requests
    if (ongoingRequests === 0) {
      // Add your code here to hide the spinner (e.g., using a global loading state)
    }

    console.log(error.response?.data);
  
    // Handle response error and display the error message
    displayGlobalError("Response Error: " + error.message);

    return Promise.reject(error);
  }
);

export default instance;
