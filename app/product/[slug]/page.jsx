"use client";
import { client, urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import AddToCartBtn from "@/components/AddToCartBtn";
import Link from "next/link";
import {
  Bike,
  PackageCheck,
  ChevronLeft,
  RefreshCw,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";

const getData = async (slug) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0] {
    _id,
    images,
    price,
    price_id,
    name,
    description,
    "slug": slug.current,
    "category": categories->{name}
  }`;
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
};

const ProductDetails = ({ params }) => {
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(params.slug);
      setBike(data);
      setLoading(false);
    };
    fetchData();
  }, [params.slug]);

  if (loading) {
    return (
      <section className="pt-24 pb-34">
        <div className="container mx-auto">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (!bike) {
    return (
      <section className="pt-24 pb-34">
        <div className="container mx-auto">
          <p>Product not found or an error occurred.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-34">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-14">
          {/* Image */}
          <div className="xl:flex-1 h-[460px] bg-primary/5 xl:w-[700px] xl:h-[540px] flex justify-center items-center">
            {bike.images && bike.images.length > 0 ? (
              <Image
                src={urlFor(bike.images[0]).url()}
                width={473}
                height={290}
                priority
                alt={bike.name}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
          {/* Text */}
          <div className="flex-1 flex flex-col justify-center items-start gap-10">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <ChevronLeft size={20} />
              Back to home
            </Link>
            <div className="flex flex-col gap-6 items-start">
              <div>
                <h3 className="text-2xl font-bold">{bike.name}</h3>
                <p className="text-lg font-semibold">${bike.price}</p>
              </div>
              <p>{bike.description}</p>
              <AddToCartBtn
                price_id={bike.price_id}
                name={bike.name}
                currency="USD"
                description={bike.description}
                images={bike.images}
                price={bike.price}
                text="Add to cart"
                btnStyles="btn btn-accent"
              />
            </div>
            {/* Info */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <PackageCheck size={20} className="text-accent" />
                <p>Free shipping on orders over $130</p>
              </div>
              <div className="flex gap-2">
                <RefreshCw size={20} className="text-accent" />
                <p>Free return for 30 days</p>
              </div>
              <div className="flex gap-2">
                <Bike size={20} className="text-accent" />
                <p>
                  The bicycles are partially assembled and benefit from
                  transport insurance.
                </p>
              </div>
              <div className="flex gap-2">
                <Clock size={20} className="text-accent" />
                <p>Fast delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
