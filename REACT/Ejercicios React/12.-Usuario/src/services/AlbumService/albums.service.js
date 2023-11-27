import { getUpdatedToken } from "../../utils";
import { APIRoute } from "../service.config";

export const getAllAlbumsServices = async () => {
    return APIRoute.get("/albums/", {
      headers: {
        Authorization: `Bearer ${getUpdatedToken()}`,
      },
    })
      .then((res) => res)
      .catch((error) => error);
  };
  

export const getAlbumByIdService = async (id) => {
  return APIRoute.get(`/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${getUpdatedToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const deleteAlbumAdminService = async (id) => {
  return APIRoute.delete(`/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${getUpdatedToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const createAlbumService = async (formData) => {
  return APIRoute.post(`/albums/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getUpdatedToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
