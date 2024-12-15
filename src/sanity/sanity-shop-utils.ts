import { Category } from "@/types/category";
import { Countdown } from "@/types/countdown";
import { Order } from "@/types/order";
import { Product } from "@/types/product";
import ImageUrlBuilder from "@sanity/image-url";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import {
  allCategoriesQuery,
  allProductsQuery,
  categoryByIdQuery,
  countdownQuery,
  heroBannerQuery,
  heroSliderQuery,
  orderByIdQuery,
  orderData,
  productData,
} from "./queries/shop-queries";
import { sanityFetch } from "./sanity-utils";

const client = createClient(clientConfig);

export async function getCategories() {
  const data: Category[] = await sanityFetch({
    query: allCategoriesQuery,
    qParams: {},
    tags: ["category"],
  });
  return data;
}

export async function getCategoryBySlug(slug: string) {
  const data: Category = await sanityFetch({
    query: allCategoriesQuery,
    qParams: { slug },
    tags: ["category"],
  });
  return data;
}

export async function getCategoryById(id: string) {
  const data: Category = await sanityFetch({
    query: categoryByIdQuery,
    qParams: { id },
    tags: ["category"],
  });
  return data;
}

export async function getAllProducts() {
  const data: Product[] = await sanityFetch({
    query: allProductsQuery,
    qParams: {},
    tags: ["product", "category"],
  });
  return data;
}

export async function getProductsByFilter(query: string, tags: string[]) {
  const filterQuery = groq`${query} ${productData}`;

  const data: Product[] = await sanityFetch({
    query: filterQuery,
    qParams: {},
    tags,
  });
  return data;
}

export async function getProduct(slug: string) {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug] ${productData}[0]`,
    { slug }
  );
}

export async function getOrders(query: string) {
  const orderQuery = groq`*[_type == "order" ${query}] | order(_createdAt desc)  ${orderData}`;
  const data: Order[] = await sanityFetch({
    query: orderQuery,
    qParams: {},
    tags: ["order"],
  });
  return data;
}

// fetch unique orders by orderId
export async function getOrderById(orderId: string) {
  const data: Order = await sanityFetch({
    query: orderByIdQuery,
    qParams: { orderId },
    tags: ["order"],
  });
  return data;
}

export async function getHeroBanners() {
  const data: any = await sanityFetch({
    query: heroBannerQuery,
    qParams: {},
    tags: ["heroBanner"],
  });
  return data;
}

export async function getHeroSliders() {
  const data: any = await sanityFetch({
    query: heroSliderQuery,
    qParams: {},
    tags: ["heroSlider"],
  });

  return data;
}

export async function getCoupons() {
  return createClient(clientConfig).fetch(
    groq`*[_type == "coupon"] {
      _id,
      name,
      code,
      discount,
      maxRedemptions,
      timesRedemed
    }`
  );
}

export async function getCountdown() {
  const data: Countdown = await sanityFetch({
    query: countdownQuery,
    qParams: {},
    tags: ["countdown"],
  });
  return data;
}

export function imageBuilder(source: any) {
  return ImageUrlBuilder(clientConfig).image(source);
}

export async function getStoreInfo() {
  const query = `*[_type == "storeInfo"][0]`;
  const storeInfo = await client.fetch(query);
  return storeInfo;
}
