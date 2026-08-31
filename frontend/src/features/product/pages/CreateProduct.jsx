import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router";
import { useProduct } from "../hook/useProduct";

const CURRENCIES = [
  { code: "INR", symbol: "₹", label: "INR (₹) - Indian Rupee" },
  { code: "USD", symbol: "$", label: "USD ($) - US Dollar" },
  { code: "EUR", symbol: "€", label: "EUR (€) - Euro" },
  { code: "GBP", symbol: "£", label: "GBP (£) - British Pound" },
  { code: "PKR", symbol: "₨", label: "PKR (₨) - Pakistani Rupee" },
  { code: "JPY", symbol: "¥", label: "JPY (¥) - Japanese Yen" },
];

const MAX_IMAGES = 7;

const CreateProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { handleCreateproduct, handleCreateProduct } = useProduct();
  const createProductAction = handleCreateProduct || handleCreateproduct;

  const [formData, setFormData] = useState({
    tittle: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFilesAdded = (files) => {
    const newFiles = Array.from(files);
    if (!newFiles.length) return;

    // Filter only image files
    const validImageFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validImageFiles.length === 0) {
      setErrors((prev) => ({
        ...prev,
        images: "Please upload valid image files (PNG, JPG, WEBP).",
      }));
      return;
    }

    const totalAllowed = MAX_IMAGES - selectedFiles.length;
    if (totalAllowed <= 0) {
      setErrors((prev) => ({
        ...prev,
        images: `Maximum ${MAX_IMAGES} images allowed.`,
      }));
      return;
    }

    const filesToAdd = validImageFiles.slice(0, totalAllowed);
    const updatedFiles = [...selectedFiles, ...filesToAdd];
    setSelectedFiles(updatedFiles);

    // Create object URLs for previews
    const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);

    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAdded(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesAdded(e.target.files);
    }
    e.target.value = "";
  };

  const handleRemoveImage = (indexToRemove) => {
    URL.revokeObjectURL(previewUrls[indexToRemove]);
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setPreviewUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleClearAllImages = () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
  };

  const validate = () => {
    const errs = {};
    if (!formData.tittle.trim()) {
      errs.tittle = "Product title is required.";
    } else if (formData.tittle.trim().length < 3) {
      errs.tittle = "Product title must be at least 3 characters.";
    }

    if (!formData.description.trim()) {
      errs.description = "Product description is required.";
    } else if (formData.description.trim().length < 10) {
      errs.description = "Description should be at least 10 characters.";
    }

    if (!formData.priceAmount) {
      errs.priceAmount = "Price amount is required.";
    } else if (isNaN(Number(formData.priceAmount)) || Number(formData.priceAmount) <= 0) {
      errs.priceAmount = "Please enter a valid positive price.";
    }

    if (!formData.priceCurrency) {
      errs.priceCurrency = "Please select a currency.";
    }

    if (selectedFiles.length === 0) {
      errs.images = "At least one product image is required (up to 7).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {   
    if (e) e.preventDefault();
    setApiError("");
    setSuccessMessage("");

    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      setIsSubmitting(true);

      const data = new FormData();
      data.append("tittle", formData.tittle.trim());
      data.append("description", formData.description.trim());
      data.append("priceAmount", formData.priceAmount);
      data.append("priceCurrency", formData.priceCurrency);

      selectedFiles.forEach((file) => {
        data.append("images", file);
      });

      await createProductAction(data);

      setSuccessMessage("Product successfully published to the SNITCH collection!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Error creating product:", err);
      const errMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to create product. Please try again.";
      setApiError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCurrency =
    CURRENCIES.find((c) => c.code === formData.priceCurrency) || CURRENCIES[0];


  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E2E1] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-xl px-4 sm:px-8 lg:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] hover:text-[#D4AF37] transition duration-200 group"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Store</span>
            </Link>

            <span className="hidden sm:inline-block h-4 w-px bg-white/10" />

            <div className="hidden sm:flex items-center gap-2.5">
              <span className="text-sm font-serif tracking-widest text-white uppercase font-bold">
                SNITCH
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 font-semibold">
                Atelier Creator
              </span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  tittle: "Bespoke Obsidian Silk Blazer",
                  description:
                    "Expertly tailored from pure mulberry silk with structured shoulders, gold horn buttons, and handcrafted interior piping. Designed for modern luxury soirées.",
                  priceAmount: "1250",
                  priceCurrency: "USD",
                });
              }}
              className="text-xs text-[#9CA3AF] hover:text-[#D4AF37] transition duration-200 hidden md:inline-block cursor-pointer"
            >
              Auto-Fill Sample
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#F2CA50] text-[#0A0A0A] font-semibold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.25)] transition duration-200 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Publishing..." : "Publish Product"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Responsive Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
        {/* Editorial Heading Section */}
        <div className="mb-8 lg:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                Product Management & Atelier
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-medium tracking-tight text-white">
              Create New Product
            </h1>
            <p className="mt-2 text-sm text-[#9CA3AF] font-light max-w-xl">
              Showcase a new piece in the SNITCH collection with high-resolution imagery, editorial storytelling, and global currency pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <span className="block text-[10px] uppercase tracking-wider text-[#6B7280]">
                Status
              </span>
              <span className="text-xs font-medium text-[#D4AF37]">
                {selectedFiles.length > 0 && formData.tittle
                  ? "Draft Ready"
                  : "Editing Details"}
              </span>
            </div>
          </div>
        </div>

        {/* Global Alerts */}
        {apiError && (
          <div className="mb-8 p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-sm flex items-start gap-3 shadow-lg">
            <svg
              className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <p className="font-semibold text-red-200">Creation Failed</p>
              <p className="text-xs mt-0.5 text-red-300/80">{apiError}</p>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-8 p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-sm flex items-center gap-3 shadow-lg">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-medium">{successMessage}</p>
          </div>
        )}

        {/* Responsive Horizontal 2-Column Grid on Desktop */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN: Product Story, Narrative & Pricing Matrix (7 Columns on Desktop) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Card 1: Product Narrative & Title */}
              <div className="rounded-xl bg-[#121212] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-base sm:text-lg font-serif font-medium text-white">
                      General Information
                    </h2>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      Specify the identity, title, and craftsmanship narrative.
                    </p>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20">
                    Step 1
                  </span>
                </div>

                {/* Product Title */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="tittle"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#D0C5AF]"
                    >
                      Product Title <span className="text-[#D4AF37]">*</span>
                    </label>
                    <span className="text-[11px] text-[#6B7280]">
                      {formData.tittle.length}/100
                    </span>
                  </div>
                  <input
                    id="tittle"
                    name="tittle"
                    type="text"
                    maxLength={100}
                    value={formData.tittle}
                    onChange={handleInputChange}
                    placeholder="e.g. Silk Blend Bespoke Blazer"
                    className={`w-full rounded-lg bg-[#0A0A0A] px-4 py-3.5 text-sm text-white placeholder-[#525252] border transition duration-200 focus:outline-none ${
                      errors.tittle
                        ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                        : "border-white/10 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30"
                    }`}
                  />
                  {errors.tittle && (
                    <p className="text-xs text-red-400 mt-1">{errors.tittle}</p>
                  )}
                </div>

                {/* Description & Narrative */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="description"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#D0C5AF]"
                    >
                      Description & Tailoring Story <span className="text-[#D4AF37]">*</span>
                    </label>
                    <span className="text-[11px] text-[#6B7280]">
                      {formData.description.length} chars
                    </span>
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detail the luxury materials, silhouette, lining details, artisan craftsmanship, and care instructions..."
                    className={`w-full rounded-lg bg-[#0A0A0A] p-4 text-sm text-white placeholder-[#525252] border leading-relaxed transition duration-200 focus:outline-none resize-y ${
                      errors.description
                        ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                        : "border-white/10 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-400 mt-1">{errors.description}</p>
                  )}
                </div>
              </div>

              {/* Card 2: Valuation & Pricing */}
              <div className="rounded-xl bg-[#121212] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-base sm:text-lg font-serif font-medium text-white">
                      Pricing & Valuation
                    </h2>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      Configure base retail price and global currency.
                    </p>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20">
                    Step 2
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Price Amount */}
                  <div className="space-y-2">
                    <label
                      htmlFor="priceAmount"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#D0C5AF]"
                    >
                      Price Amount <span className="text-[#D4AF37]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-sm font-medium text-[#D4AF37] pointer-events-none">
                        {currentCurrency.symbol}
                      </span>
                      <input
                        id="priceAmount"
                        name="priceAmount"
                        type="number"
                        min="0"
                        step="any"
                        value={formData.priceAmount}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        className={`w-full rounded-lg bg-[#0A0A0A] pl-9 pr-4 py-3.5 text-sm text-white placeholder-[#525252] border transition duration-200 focus:outline-none ${
                          errors.priceAmount
                            ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
                            : "border-white/10 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30"
                        }`}
                      />
                    </div>
                    {errors.priceAmount && (
                      <p className="text-xs text-red-400 mt-1">{errors.priceAmount}</p>
                    )}
                  </div>

                  {/* Price Currency */}
                  <div className="space-y-2">
                    <label
                      htmlFor="priceCurrency"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#D0C5AF]"
                    >
                      Currency <span className="text-[#D4AF37]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="priceCurrency"
                        name="priceCurrency"
                        value={formData.priceCurrency}
                        onChange={handleInputChange}
                        className={`w-full rounded-lg bg-[#0A0A0A] px-4 py-3.5 text-sm text-white border transition duration-200 focus:outline-none appearance-none cursor-pointer ${
                          errors.priceCurrency
                            ? "border-red-500/80 focus:border-red-500"
                            : "border-white/10 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30"
                        }`}
                      >
                        {CURRENCIES.map((curr) => (
                          <option key={curr.code} value={curr.code} className="bg-[#121212] text-white py-1">
                            {curr.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#9CA3AF]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.priceCurrency && (
                      <p className="text-xs text-red-400 mt-1">{errors.priceCurrency}</p>
                    )}
                  </div>
                </div>

                {/* Price Display Summary Pill */}
                {formData.priceAmount && !isNaN(Number(formData.priceAmount)) && (
                  <div className="p-3 rounded-lg bg-[#0A0A0A] border border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[#9CA3AF]">Listed Price Summary:</span>
                    <span className="font-semibold text-[#D4AF37] tracking-wider text-sm">
                      {currentCurrency.symbol} {Number(formData.priceAmount).toLocaleString()} {formData.priceCurrency}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Visual Atelier & Image Gallery (5 Columns on Desktop, Sticky) */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-20">
              {/* Card 3: Media & Gallery */}
              <div className="rounded-xl bg-[#121212] border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-serif font-medium text-white flex items-center gap-2">
                      Product Gallery
                      <span className="text-xs font-sans px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[#D4AF37]">
                        {selectedFiles.length} / {MAX_IMAGES}
                      </span>
                    </h2>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      Upload up to {MAX_IMAGES} editorial photos.
                    </p>
                  </div>

                  {selectedFiles.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearAllImages}
                      className="text-xs text-red-400/80 hover:text-red-300 tracking-wider uppercase transition cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInputChange}
                />

                {/* Dropzone */}
                {selectedFiles.length < MAX_IMAGES && (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer group ${
                      isDragging
                        ? "border-[#D4AF37] bg-[#D4AF37]/5 scale-[1.01]"
                        : "border-white/15 bg-[#0A0A0A] hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/[0.02]"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1A1A1A] group-hover:bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-2.5 transition duration-200 border border-white/10 group-hover:border-[#D4AF37]/30">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-white text-center">
                      Drag & drop images, or{" "}
                      <span className="text-[#D4AF37] underline decoration-[#D4AF37]/50 underline-offset-4">
                        browse
                      </span>
                    </p>
                    <p className="text-[11px] text-[#6B7280] mt-1 text-center">
                      PNG, JPG, WEBP (up to 5MB) • {MAX_IMAGES - selectedFiles.length} slots left
                    </p>
                  </div>
                )}

                {errors.images && (
                  <p className="text-xs text-red-400 mt-1">{errors.images}</p>
                )}

                {/* 7-Slot Visual Gallery Grid */}
                {selectedFiles.length > 0 && (
                  <div className="pt-2">
                    <div className="grid grid-cols-3 gap-3">
                      {previewUrls.map((url, idx) => (
                        <div
                          key={idx}
                          className={`relative group rounded-lg overflow-hidden border bg-[#0A0A0A] aspect-square flex flex-col justify-between ${
                            idx === 0
                              ? "col-span-3 aspect-[16/10] border-[#D4AF37]/60 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                              : "border-white/10 hover:border-white/30"
                          }`}
                        >
                          <img
                            src={url}
                            alt={`Product preview ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* Hover Overlay with Action */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2.5">
                            <div className="flex justify-between items-center">
                              {idx === 0 ? (
                                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#D4AF37] text-black px-2 py-0.5 rounded shadow">
                                  Cover Image
                                </span>
                              ) : (
                                <span className="text-[10px] uppercase font-medium tracking-wider bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded border border-white/10">
                                  #{idx + 1}
                                </span>
                              )}

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveImage(idx);
                                }}
                                className="p-1.5 rounded-full bg-red-600/80 hover:bg-red-600 text-white transition cursor-pointer"
                                title="Remove image"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>

                            <div className="text-[10px] text-[#D0C5AF] truncate font-light">
                              {selectedFiles[idx]?.name}
                            </div>
                          </div>

                          {/* Cover badge on slot 0 */}
                          {idx === 0 && (
                            <div className="absolute top-2 left-2 pointer-events-none group-hover:opacity-0 transition-opacity">
                              <span className="text-[10px] uppercase font-bold tracking-widest bg-[#D4AF37] text-black px-2 py-0.5 rounded shadow">
                                Primary Cover
                              </span>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Add More Slot Placeholder */}
                      {selectedFiles.length < MAX_IMAGES && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="border border-dashed border-white/15 rounded-lg aspect-square flex flex-col items-center justify-center text-[#6B7280] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-white/[0.02] transition cursor-pointer group"
                        >
                          <svg className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                          </svg>
                          <span className="text-[10px] tracking-wider uppercase font-medium">
                            Add
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Card 4: Publishing Summary & Submission Card */}
              <div className="rounded-xl bg-[#121212] border border-white/10 p-6 shadow-2xl space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D0C5AF]">
                  Catalog Readiness Checklist
                </h3>

                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2">
                    <span
                      className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        formData.tittle.trim().length >= 3
                          ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40"
                          : "bg-white/5 text-[#6B7280] border border-white/10"
                      }`}
                    >
                      ✓
                    </span>
                    <span className={formData.tittle.trim().length >= 3 ? "text-white" : "text-[#6B7280]"}>
                      Product title provided
                    </span>
                  </li>

                  <li className="flex items-center gap-2">
                    <span
                      className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        formData.description.trim().length >= 10
                          ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40"
                          : "bg-white/5 text-[#6B7280] border border-white/10"
                      }`}
                    >
                      ✓
                    </span>
                    <span className={formData.description.trim().length >= 10 ? "text-white" : "text-[#6B7280]"}>
                      Tailoring description added
                    </span>
                  </li>

                  <li className="flex items-center gap-2">
                    <span
                      className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        formData.priceAmount && Number(formData.priceAmount) > 0
                          ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40"
                          : "bg-white/5 text-[#6B7280] border border-white/10"
                      }`}
                    >
                      ✓
                    </span>
                    <span
                      className={
                        formData.priceAmount && Number(formData.priceAmount) > 0 ? "text-white" : "text-[#6B7280]"
                      }
                    >
                      Price & currency configured
                    </span>
                  </li>

                  <li className="flex items-center gap-2">
                    <span
                      className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        selectedFiles.length > 0
                          ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40"
                          : "bg-white/5 text-[#6B7280] border border-white/10"
                      }`}
                    >
                      ✓
                    </span>
                    <span className={selectedFiles.length > 0 ? "text-white" : "text-[#6B7280]"}>
                      Gallery images attached ({selectedFiles.length}/{MAX_IMAGES})
                    </span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-white/10 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#F2CA50] text-[#0A0A0A] font-semibold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Publishing to Catalog...</span>
                      </>
                    ) : (
                      <>
                        <span>Publish Product</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <Link
                    to="/"
                    className="block w-full py-3 rounded-lg text-center text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] hover:text-white border border-white/10 hover:border-white/20 transition duration-200"
                  >
                    Cancel & Return
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateProduct;