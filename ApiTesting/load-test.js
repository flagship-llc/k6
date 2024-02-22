import http from "k6/http";
import { sleep } from "k6";

const BASE_URL = "https://dev.umj-back-office.ecom.umgapps.com";

// https://k6.io/docs/using-k6/k6-options/how-to/
export const options = {
  noConnectionReuse: true,
  insecureSkipTLSVerify: false,
  // this stage will ramp up from 1 to 10 VUs over 10 seconds, then stay at 10 VUs for 20 seconds, and finally ramp down to 0 VUs over 10 seconds.
  stages: [
    { duration: "10s", target: 10 },
    { duration: "20s", target: 20 },
    { duration: "10s", target: 0 },
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
}
