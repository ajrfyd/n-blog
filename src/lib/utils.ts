import { Tags } from "../ types/postTypes";
export const getPathName = (pathname: string) => {
  const [path] = pathname.split("/").filter(p => p !== '');
  return path;
}

type CType = {
  [key: string]: string;
}

export const setTagsOption = (tags: Tags[]): CType[] => tags.map(tag => ({ value: tag.id, label: tag.label }));