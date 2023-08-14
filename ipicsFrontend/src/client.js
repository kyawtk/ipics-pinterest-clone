import {createClient} from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
const client =  createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKEN,
  apiVersion: '2023-08-12'
});

export default client;


const builder = imageUrlBuilder(client)
export function urlFor(source) {
  return builder.image(source)
}