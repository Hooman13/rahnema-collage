import axiosInstance from "./axios";

export const signup = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      `auth/signup`,
      data
    )
    return response;
  } catch (error:any) {
    console.error("An error occurred:", error.message);
    // Here, you might handle errors coming from the backend
  }
};
