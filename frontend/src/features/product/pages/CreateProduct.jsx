import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router";
import { useProduct } from "../hook/useProduct";

const CURRENCIES = [
  { code: "INR", symbol: "₹", label: "INR (₹) - Indian Rupee" },
  { code: "USD", symbol: "$", label: "USD ($) - US Dollar" },
  { code: "EUR", symbol: "€", label: "EUR (€) - Euro" },
  { code: "GBP", symbol: "£", label: "GBP (£) - British Pound" },
];

const MAX_IMAGES = 7;

export default function CreateProduct() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);
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
    if (!files || !files.length) return;
    const newFiles = Array.from(files);

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

    const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);

    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAdded(e.dataTransfer.files);
      e.dataTransfer.clearData();
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

  const validate = () => {
    const errs = {};
    if (!formData.tittle.trim()) {
      errs.tittle = "Product title is required.";
    } else if (formData.tittle.trim().length < 3) {
      errs.tittle = "Must be at least 3 characters.";
    }

    if (!formData.description.trim()) {
      errs.description = "Description is required.";
    } else if (formData.description.trim().length < 10) {
      errs.description = "Must be at least 10 characters.";
    }

    if (!formData.priceAmount) {
      errs.priceAmount = "Price is required.";
    } else if (isNaN(Number(formData.priceAmount)) || Number(formData.priceAmount) <= 0) {
      errs.priceAmount = "Enter a valid positive price.";
    }

    if (!formData.priceCurrency) {
      errs.priceCurrency = "Select a currency.";
    }

    if (selectedFiles.length === 0) {
      errs.images = "At least one image is required.";
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

      setSuccessMessage("Garment successfully published to the catalog!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Error creating product:", err);
      const errMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to publish product.";
      setApiError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCurrency =
    CURRENCIES.find((c) => c.code === formData.priceCurrency) || CURRENCIES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      
      {/* Top Header */}
      <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 sm:px-12 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-teal-600 transition group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </Link>

          <span className="text-xs font-bold font-outfit text-teal-700 px-3 py-1 rounded-full bg-teal-50 border border-teal-200">
            Seller Studio
          </span>
        </div>
      </header>

      {/* Main Studio Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-8">
        
        {/* Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/60 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Product Publishing Studio</span>
          </div>
          <h1 className="text-3xl font-black font-outfit text-slate-900 tracking-tight">
            Create Apparel Piece
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload high-resolution photography, configure tailored specifications, and set your pricing.
          </p>
        </div>

        {/* Feedback Alerts */}
        {apiError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{apiError}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 text-xs flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Area (7 Cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Image Upload Area */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Garment Imagery</h2>
                    <p className="text-xs text-slate-500">Upload clean editorial photos</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    {selectedFiles.length}/{MAX_IMAGES} uploaded
                  </span>
                </div>

                {/* Drag and Drop Zone with pointer-events-none child */}
                <div
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all select-none ${
                    isDragging
                      ? "border-teal-500 bg-teal-50/70 scale-[1.01]"
                      : "border-slate-300 hover:border-teal-400 bg-slate-50/60"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  <div className="pointer-events-none flex flex-col items-center gap-2.5 text-slate-500">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-teal-600">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-xs text-slate-700 font-medium">
                      <span className="text-teal-700 underline font-bold">Click to select</span> or drag and drop images here
                    </p>
                    <span className="text-[11px] text-slate-400">Supports PNG, JPG, WEBP (Max 7 images)</span>
                  </div>
                </div>

                {errors.images && (
                  <p className="text-xs text-red-600">{errors.images}</p>
                )}

                {/* Thumbnails Grid */}
                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 pt-2">
                    {previewUrls.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm group">
                        <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(idx);
                          }}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-slate-900/80 text-white flex items-center justify-center text-xs hover:bg-red-600 transition shadow"
                        >
                          &times;
                        </button>
                        {idx === 0 && (
                          <span className="absolute bottom-1.5 left-1.5 text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-600 text-white">
                            Cover
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Details Area */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                
                {/* Title */}
                <div className="space-y-1.5">
                  <label htmlFor="tittle" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Product Title
                  </label>
                  <input
                    id="tittle"
                    name="tittle"
                    type="text"
                    placeholder="e.g. Heavyweight Boxy 450GSM Hoodie"
                    value={formData.tittle}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl input-luxury text-sm ${
                      errors.tittle ? "border-red-500 focus:border-red-500" : ""
                    }`}
                  />
                  {errors.tittle && (
                    <p className="text-xs text-red-600 mt-0.5">{errors.tittle}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label htmlFor="description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Atelier Description & Composition
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Describe the fabric blend, fit, tailoring details, and sizing instructions..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl input-luxury text-sm resize-none ${
                      errors.description ? "border-red-500 focus:border-red-500" : ""
                    }`}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-600 mt-0.5">{errors.description}</p>
                  )}
                </div>

                {/* Pricing & Currency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="priceCurrency" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Currency
                    </label>
                    <select
                      id="priceCurrency"
                      name="priceCurrency"
                      value={formData.priceCurrency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl input-luxury text-sm cursor-pointer"
                    >
                      {CURRENCIES.map((curr) => (
                        <option key={curr.code} value={curr.code}>
                          {curr.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="priceAmount" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Retail Price ({currentCurrency.symbol})
                    </label>
                    <input
                      id="priceAmount"
                      name="priceAmount"
                      type="number"
                      placeholder="e.g. 2999"
                      value={formData.priceAmount}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl input-luxury text-sm ${
                        errors.priceAmount ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    />
                    {errors.priceAmount && (
                      <p className="text-xs text-red-600 mt-0.5">{errors.priceAmount}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl btn-gradient-primary font-bold text-sm uppercase tracking-wider shadow-md cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Publishing to Catalog...</span>
                  </>
                ) : (
                  "Publish Apparel Piece"
                )}
              </button>

            </form>
          </div>

          {/* Right Live Catalog Preview (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-outfit uppercase tracking-wider text-slate-700">
                Live Catalog Preview
              </span>
              <span className="text-xs text-slate-500">Customer View</span>
            </div>

            <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md">
              <div className="aspect-[4/5] w-full bg-slate-100 relative flex items-center justify-center overflow-hidden">
                {previewUrls.length > 0 ? (
                  <img
                    src={previewUrls[0]}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6 text-slate-400">
                    <svg className="w-12 h-12 mx-auto text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs font-medium">Garment preview will appear here</p>
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-teal-600 text-white shadow">
                    NEW DROP
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold font-outfit text-slate-900 uppercase truncate">
                    {formData.tittle || "Garment Title"}
                  </h3>
                  <span className="text-sm font-black font-outfit text-teal-700 shrink-0">
                    {formData.priceAmount
                      ? `${currentCurrency.symbol}${Number(formData.priceAmount).toLocaleString()}`
                      : `${currentCurrency.symbol}0.00`}
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-light">
                  {formData.description || "Fabric composition and styling specifications will appear here..."}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-teal-700">SNITCH VERIFIED</span>
                  <span>Ready for Dispatch</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-400 border-t border-slate-200 mt-12">
        &copy; {new Date().getFullYear()} SNITCH Seller Studio.
      </footer>

    </div>
  );
}