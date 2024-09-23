import axiosInstance from "./axios";

export const createComment = async (postId: string, comment: any) => {
  try {
    const response = await axiosInstance.post(
      `/posts/${postId}/comments`,
      comment
    );
    return response.data;
  } catch (error:any) {
    console.error("An error occurred:", error.message);
  }
};
