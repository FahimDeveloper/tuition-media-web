import { baseUrl } from "@/config";

const imageUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${baseUrl}/media-upload/single`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const result = await response.json();

  return result.imageUrl;
};

export default imageUpload;
