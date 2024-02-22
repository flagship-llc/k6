import http from "k6/http";
import { sleep } from "k6";

const BASE_URL = "http://localhost:8080";

// https://k6.io/docs/using-k6/k6-options/how-to/
export const options = {
  noConnectionReuse: true,
  insecureSkipTLSVerify: false,
  // https://k6.io/docs/using-k6/scenarios/executors/
  executor: "ramping-arrival-rate",
  stages: [{ duration: "2h", target: 20000 }],
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
