import { NewPostType } from "../../ types/postTypes";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../api/api";
import { AxiosError } from "axios";

const useMutatePost = (post: NewPostType, successFn: (data: string) => void, errorFn: (error: AxiosError<{ status: number, message: string; result: null; }>) => void) => {
  return useMutation({
    mutationFn: () => createPost<string>(post),
    onSuccess: (data) => successFn(data.result),
    onError: (error: AxiosError<{ status: number, message: string; result: null; }>) => errorFn(error)
  });
};

export default useMutatePost;