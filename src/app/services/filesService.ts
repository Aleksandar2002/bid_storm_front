import api from "../../api/axios";

export const uploadFile = async (files: FileList) => {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });
  const response = await api.post("/files/batchUpload", formData);
  return response.data;
};
