import * as url from "../url_helper";
import { APIClient } from "./benchmarking_instance";

const api = new APIClient();

// add benchmark
export const zaddBenchmarkApi = (benchmark) =>
  api.create(url.ADD_BENCHMARK, benchmark);
