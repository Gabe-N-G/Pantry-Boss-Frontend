// A utility function to handle and extract error messages from an Axios error response
export default function handleAxiosError(error) {
    const errorMessages = [];

    // Check if the error has a response object
    if (error.response && error.response.data && error.response.data) {
        const errorData = error.response.data;

        // Loop through the error data and extract messages
        for (const field in errorData) {
            if (Array.isArray(errorData[field])) {
                errorData[field].forEach((msg) => {
                    errorMessages.push(`${field}: ${msg}`);
                });
            } else {
                errorMessages.push(`${field}: ${errorData[field]}`);
            }
        }
    } else {
        // Handle network or unexpected errors
        errorMessages.push("An unexpected error occurred. Please try again.");
    }

    return errorMessages;
}
