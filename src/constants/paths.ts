const API_BASE_URL = import.meta.env.VITE_API_URL;

export const PATHS = {
  GET_FILE: (fileName: string) =>
    `${API_BASE_URL}/files/getFile?filePath=${fileName}`,
  GET_TEMP_FILE: (fileName: string) =>
    `${API_BASE_URL}/files/getTempFile?filePath=${fileName}`,
  PLACEHOLDER_IMAGE: "/assets/images/no-image.png",
};

export const BACK_BASE_URL = import.meta.env.VITE_BACK_BASE_URL;
