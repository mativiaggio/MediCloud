import path from "path";
export const getPath = (folderName) => {
  return path.join(process.cwd(), "src", folderName);
};
