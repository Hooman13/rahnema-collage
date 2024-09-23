import axiosInstance from "./axios";

export const createPost = async (postData: any) => {
  try {
    const response = await axiosInstance.post("posts", postData);
    return response;
  } catch (error: any) {
    console.error("An error occurred:", error.message);
  }
};

export const updatePost = async (postId: string, post: any) => {
  try {
    const response = await axiosInstance.patch(`posts/${postId}`, post);
  } catch (error: any) {
    console.error("An error occurred:", error.message);
  }
};
