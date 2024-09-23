import axiosInstance from "./axios";

export const login = async (data: any) => {
  try {
    const response = await axiosInstance.post(
      `auth/login`,
      data
    )
    return response.data;
  } catch (error:any) {
    console.error("An error occurred:", error.message);
    // Here, you might handle errors coming from the backend
  }
};
