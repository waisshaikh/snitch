import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { useProduct } from "../hook/useProduct";

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */

function getImageUrl(raw) {
  if (!raw) return "";
  const value = String(raw);
  // Handles URLs accidentally stored like:
  // [https://example.com/image.jpg](https://example.com/image.jpg)
  const match = value.match(/\((https?:\/\/[^)]+)\)/);
  return match ? match[1] : value;
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: price?.currency || "INR",
    maximumFractionDigits: 0,
  }).format(Number(price?.amount || 0));
}

/* ─────────────────────────────────────────────
   Product Detail
───────────────────────────────────────────── */

export default function ProductDetail() {
  const { productId } = useParams();
  const { handleGetProductByid } = useProduct();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        setError("");
        const data = await handleGetProductByid(productId);
        setProduct(data);
        setSelectedImage(getImageUrl(data?.images?.[0]));
      } catch (err) {
        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to load product details."
        );
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  const images = useMemo(() => {
    if (!product?.images?.length) return [];
    return product.images.map(getImageUrl).filter(Boolean);
  }, [product]);

  const selectedImageIndex = images.findIndex((image) => image === selectedImage);
  const canSlideImages = images.length > 1;

  const showPreviousImage = () => {
    if (!canSlideImages) return;
    const currentIndex = selectedImageIndex === -1 ? 0 : selectedImageIndex;
    const previousIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setSelectedImage(images[previousIndex]);
  };

  const showNextImage = () => {
    if (!canSlideImages) return;
    const currentIndex = selectedImageIndex === -1 ? 0 : selectedImageIndex;
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(images[nextIndex]);
  };

  /* ─────────────────────────────────────────────
     Loading
  ───────────────────────────────────────────── */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <div className="mb-10 h-3 w-24 animate-pulse rounded-full bg-[#EFEBE1]" />
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[88px_1fr_1fr]">
            <div className="hidden md:block" />
            <div className="aspect-[4/5] w-full animate-pulse rounded-sm bg-[#EFEBE1]" />
            <div className="space-y-6 pt-2">
              <div className="h-3 w-28 animate-pulse rounded-full bg-[#EFEBE1]" />
              <div className="h-9 w-72 animate-pulse rounded-sm bg-[#EFEBE1]" />
              <div className="h-6 w-28 animate-pulse rounded-sm bg-[#EFEBE1]" />
              <div className="h-28 w-full animate-pulse rounded-sm bg-[#EFEBE1]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ─────────────────────────────────────────────
     Error
  ───────────────────────────────────────────── */

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF8] px-4">
        <div className="w-full max-w-sm text-center">
          <h1 className="font-serif text-2xl text-[#17140F]">
            We couldn't find this piece
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#8A8175]">
            {error || "This product may have sold out or been removed."}
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex h-12 items-center rounded-sm bg-[#17140F] px-7 text-sm font-medium text-[#FAFAF8] transition hover:bg-[#2B2620]"
          >
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  /* ─────────────────────────────────────────────
     Main UI
  ───────────────────────────────────────────── */

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">

        {/* Back */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#8A8175] transition hover:text-[#17140F]"
        >
          <span aria-hidden="true">←</span> Back to shop
        </Link>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[88px_1fr_1fr] md:gap-8 lg:gap-12">

          {/* ==================================================
              THUMBNAIL RAIL — desktop only, sits left of hero
          ================================================== */}

          {images.length > 1 && (
            <div className="order-2 hidden flex-col gap-3 md:order-1 md:flex md:sticky md:top-8 md:self-start">
              {images.map((image, index) => {
                const isSelected = selectedImage === image;
                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    aria-label={`View image ${index + 1}`}
                    className={`aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#EFEBE1] transition ${
                      isSelected
                        ? "ring-1 ring-[#17140F] ring-offset-2 ring-offset-[#FAFAF8]"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* ==================================================
              HERO IMAGE
          ================================================== */}

          <section className="order-1 w-full md:order-2 md:sticky md:top-8 md:self-start">
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#EFEBE1]">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.tittle || "Product image"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-[#8A8175]">
                  No image available
                </div>
              )}

              {canSlideImages && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    aria-label="Show previous image"
                    className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-[#17140F] opacity-0 shadow-sm transition hover:bg-white active:scale-95 group-hover:flex group-hover:opacity-100 group-focus-within:flex group-focus-within:opacity-100"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    onClick={showNextImage}
                    aria-label="Show next image"
                    className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-[#17140F] opacity-0 shadow-sm transition hover:bg-white active:scale-95 group-hover:flex group-hover:opacity-100 group-focus-within:flex group-focus-within:opacity-100"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails — mobile only */}
            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1 md:hidden">
                {images.map((image, index) => {
                  const isSelected = selectedImage === image;
                  return (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      className={`h-20 w-16 flex-none overflow-hidden rounded-sm bg-[#EFEBE1] transition ${
                        isSelected ? "ring-1 ring-[#17140F]" : "opacity-60"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.tittle || "Product"} thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* ==================================================
              PRODUCT INFO
          ================================================== */}

          <section className="order-3 flex w-full flex-col md:pt-1">

            <p className="text-sm text-[#8A8175]">Snitch collection</p>

            <h1 className="mt-3 font-serif text-3xl leading-tight text-[#17140F] sm:text-[2.35rem]">
              {product.tittle || "Untitled product"}
            </h1>

            <p className="mt-5 font-serif text-2xl text-[#17140F]">
              {formatPrice(product.price)}
            </p>
            <p className="mt-1 text-xs text-[#8A8175]">
              Inclusive of all applicable taxes
            </p>

            <div className="my-8 h-px bg-[#E8E3D9]" />

            <div>
              <h2 className="text-sm font-medium text-[#17140F]">Description</h2>
              <p className="mt-3 max-w-[46ch] text-sm leading-7 text-[#5C564A]">
                {product.description || "No description available."}
              </p>
            </div>

            <div className="mt-7 border-t border-[#E8E3D9] pt-6">
              <h2 className="text-sm font-medium text-[#17140F]">Sold by</h2>
              <p className="mt-2 break-all text-sm text-[#8A8175]">
                {product.seller || "Snitch seller"}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="h-13 rounded-sm bg-[#17140F] px-6 py-4 text-sm font-medium text-[#FAFAF8] transition hover:bg-[#2B2620] active:scale-[0.99]"
              >
                Add to cart
              </button>
              <button
                type="button"
                className="h-13 rounded-sm border border-[#17140F] px-6 py-4 text-sm font-medium text-[#17140F] transition hover:bg-[#17140F] hover:text-[#FAFAF8] active:scale-[0.99]"
              >
                Buy now
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
