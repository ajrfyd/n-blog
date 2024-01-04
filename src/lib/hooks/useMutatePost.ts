import { NewPostType } from "../../types/postTypes";
import { useMutation } from "@tanstack/react-query";
import { createPost, editPost } from "../api/api";
import { AxiosError } from "axios";

const useMutatePost = (post: NewPostType, successFn: (data: string) => void, errorFn: (error: AxiosError<{ status: number, message: string; result: null; }>) => void, isEdit: boolean) => {
  return useMutation({
    mutationFn: () => isEdit ? editPost<string>(post) : createPost<string>(post),
    onSuccess: (data) => successFn(data.result),
    onError: (error: AxiosError<{ status: number, message: string; result: null; }>) => errorFn(error)
  });
};

export default useMutatePost;