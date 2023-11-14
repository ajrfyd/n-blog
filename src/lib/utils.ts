export const getPathName = (pathname: string) => {
  const [path] = pathname.split("/").filter(p => p !== '');
  return path;
}