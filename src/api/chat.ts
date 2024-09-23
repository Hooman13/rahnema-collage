import axiosInstance from "./axios";
export const getMessage = async (username: string) => {
  try {
    const response = await axiosInstance.get(
      `/dashboard/messages/${username}?p=1&c=100`
    );
    return response.data;
  } catch (error: any) {
    console.error("An error occurred:", error.message);
  }
};