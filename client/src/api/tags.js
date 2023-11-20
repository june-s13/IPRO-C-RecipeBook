import { axios } from "./constants.js";

export async function getTags() {
  const res = await axios.request({
    method: "GET",
    url: "/tags"
  })
  return res.data
}