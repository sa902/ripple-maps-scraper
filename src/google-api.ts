import { Data } from "./libs";
import axios from 'axios';
export async function getCafeIDsFromGoogle(data:Data){

let config = {
  method: "post",
  url: "https://places.googleapis.com/v1/places:searchText",
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": Bun.env.GOOGLE_API,
    "X-Goog-FieldMask": "places.id",
  },
  data: data,
};
  const result = await axios.request(config)
  console.log(`inside our function and reslut is ${JSON.stringify(result.data)}`)
return result.data
}
