import http from "k6/http";
import { sleep, check } from "k6";
export const options = {
  stages: [
    { duration: "30s", target: 3000 },
    { duration: "30s", target: 3000 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests must complete below 500ms
  },
};
export default function () {
  const res = http.get("http://test.k6.io");
  check(res, {
    "response code was 200": (res) => res.status == 200,
  });
  sleep(1);
}
