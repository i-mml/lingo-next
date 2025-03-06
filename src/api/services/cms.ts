import axios from "axios";

export const GetCmsByContentType = async (contentType: number) => {
  let url = `https://api.zabano.com/api/cms/catalog?content_type=${contentType}`;

  const response = await axios.get(url);
  return response.data;
};
