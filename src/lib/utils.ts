import { ServerTagType } from "../types/postTypes";
export const getPathName = (pathname: string) => {
  const [path] = pathname.split("/").filter(p => p !== '');
  return path;
}

type CType = {
  [key: string]: string;
}

export const setTagsOption = (tags: ServerTagType[]): CType[] => tags.map(tag => ({ value: tag.id, label: tag.label }));