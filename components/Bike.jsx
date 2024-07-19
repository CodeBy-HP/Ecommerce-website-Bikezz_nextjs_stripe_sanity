"use client";
import AddToCartBtn from "./AddToCartBtn";
import { urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { CgEye, CgShoppingBag } from "react-icons/cg";

const Bike = ({ bike }) => {
  const popularBikeCat = bike.categories.find(
    (category) => category.name === "popular"
  );

  // Ensure the image URL is properly generated and handle cases where images might be empty
  const imageUrl =
    bike.images && bike.images.length > 0 ? urlFor(bike.images[0]).url() : null;

  return (
    <div className="group relative">
      <div className="border h-[328px] mb-5 p-4 overflow-hidden relative">
        <div className="bg-primary/5 w-full h-full group-hover:bg-primary/10 transition-all duration-300 flex justify-center items-center">
          {/* badge */}
          {popularBikeCat && (
            <div className="absolute top-8 left-8 bg-accent text-white px-3 text-sm uppercase font-medium">
              Popular
            </div>
          )}
          {imageUrl && (
            <Image src={imageUrl} width={240} height={147} alt={bike.name} />
          )}
        </div>
        {/* btn group */}
        <div className="absolute inset-0 flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <AddToCartBtn
            price_id={bike.price_id}
            name={bike.name}
            currency="USD"
            description={bike.description}
            images={bike.images}
            price={bike.price}
            btnStyles="btn btn-accent"
            Icon={() => <CgShoppingBag size={24} />} // Increase the size here
          />
          <Link href={`/product/${bike.slug}`}>
            <button className="btn-icon btn-primary">
              <CgEye size={24} /> {/* Adjust the size here if needed */}
            </button>
          </Link>
        </div>
      </div>

      <h5 className="text-gray-400 font-semibold mb-2">
        {bike.categories[0].name} bike
      </h5>
      <h4 className="mb-1">{bike.name}</h4>
      <div className="text-lg font-bold text-accent">${bike.price}</div>
    </div>
  );
};

export default Bike;
