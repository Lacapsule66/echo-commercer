import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import {
  getHeroBanners,
  getHeroSliders,
  imageBuilder,
} from "@/sanity/sanity-shop-utils";
import Link from "next/link";

const Hero = async () => {
  const data = await getHeroBanners();
  const sliders = await getHeroSliders();

  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden">
              {/* <!-- bg shapes --> */}
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />

              <HeroCarousel sliders={sliders} />
            </div>
          </div>

          <div className="xl:max-w-[393px] w-full flex flex-col justify-between sm:flex-row xl:flex-col gap-5">
            {data.map((bannerItem:any, key:number) => (
              <div
                key={key}
                className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5"
              >
                <div className="flex items-center justify-between gap-5">
                  <div className="max-w-[153px] w-full">
                    <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-20 hover:text-blue">
                      <Link

                        href={`/products/${bannerItem?.product?.slug.current}`}
                      >
                        {" "}
                        {bannerItem.name}{" "}
                      </Link>
                    </h2>

                    <div>
                      <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                        limited time offer
                      </p>
                      <span className="flex items-center gap-3">
                        <span className="font-medium text-heading-5 text-red">
                          ${bannerItem?.product?.discountedPrice}
                        </span>
                        <span className="font-medium text-2xl text-dark-4 line-through">
                          ${bannerItem?.product?.price}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="max-w-[180px] w-full">
                    <Image
                      src={imageBuilder(bannerItem?.image).url()!}
                      alt="mobile image"
                      width={key === 0 ? 175 : 163} 
                      height={key === 0 ? 109 : 191} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <!-- Hero features --> */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
