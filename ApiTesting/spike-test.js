import http from "k6/http";
import { sleep } from "k6";

const BASE_URL = "http://localhost:8080";

export const options = {
  noConnectionReuse: true,
  insecureSkipTLSVerify: false,
  // fast ramp up to 1000 VUs, then go down to 0 VUs over 1 minute
  stages: [
    { duration: "2m", target: 1000 },
    { duration: "1m", target: 0 },
  ],
};

export default function () {
  const params = {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": `Bearer ${__ENV.TOKEN}`,
    },
  };
  http.get(
    `${BASE_URL}/api/products?images=true&trackList=true&&productType=1,2,3,4`,
    params
  );
  sleep(1);
  http.get(`${BASE_URL}/api/products/d/umlocal0219`, params);
  sleep(1);
}
