// config.js

export const IP_LAPTOP =
  "10.1.10.140";

export const BASE_API_URL =
  `http://${IP_LAPTOP}:8080/api`;

export const API_URLS = {

  presensi:
    `${BASE_API_URL}/presensi`,

  locate:
    `${BASE_API_URL}/presensi/locate`,
};