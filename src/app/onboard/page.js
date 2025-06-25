"use client";

import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import MultiSelectDropdown from "@/components/MultiSelectDropdown";
import FilterDropdown from "@/components/Filters";
import Header from "@/components/Header";

const categories = ["Singer", "Dancer", "Stand-up", "DJ"];
const languages = ["Hindi", "English", "Punjabi", "Tamil"];
const feeRanges = [
  "₹0 - ₹20,000",
  "₹20,000 - ₹40,000",
  "₹40,000 - ₹60,000",
  "₹60,000 - ₹80,000",
];

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  bio: Yup.string().required("Bio is required"),
  location: Yup.string().required("Location is required"),
  category: Yup.array().min(1, "Select at least one category"),
  languages: Yup.array().min(1, "Select at least one language"),
  feeRange: Yup.string().required("Fee range is required"),
  profileImage: Yup.mixed().notRequired(), // not storing this
});

export default function ArtistOnboardingForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      bio: "",
      category: [],
      languages: [],
      feeRange: "",
      location: "",
      profileImage: null,
    },
  });

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    const existing =
      JSON.parse(localStorage.getItem("artistSubmissions")) || [];

    // Remove the image file from what is saved to localStorage
    const { profileImage, ...rest } = data;

    const newEntry = {
      id: Date.now(),
      ...rest,
    };

    localStorage.setItem(
      "artistSubmissions",
      JSON.stringify([...existing, newEntry])
    );

    console.log("Submitted Artist Data (excluding image):", newEntry);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Artist Onboarding Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              {...register("name")}
              className="w-full p-2 border rounded border-white text-white"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          {/* Bio */}
          <div>
            <label className="block font-medium mb-1">Bio</label>
            <textarea
              {...register("bio")}
              className="w-full p-2 border rounded border-white text-white"
            />
            <p className="text-red-500 text-sm">{errors.bio?.message}</p>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <MultiSelectDropdown
                  label="Category"
                  options={categories}
                  selected={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <p className="text-red-500 text-sm">{errors.category?.message}</p>
          </div>

          {/* Languages */}
          <div>
            <label className="block font-medium mb-1">Languages Spoken</label>
            <Controller
              control={control}
              name="languages"
              render={({ field }) => (
                <MultiSelectDropdown
                  label="Languages"
                  options={languages}
                  selected={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <p className="text-red-500 text-sm">{errors.languages?.message}</p>
          </div>

          {/* Fee Range */}
          <div>
            <label className="block font-medium mb-1">Fee Range</label>
            <Controller
              control={control}
              name="feeRange"
              render={({ field }) => (
                <FilterDropdown
                  label="Fee Range"
                  name="feeRange"
                  value={field.value}
                  onChange={(_, val) => field.onChange(val)}
                  options={feeRanges}
                />
              )}
            />
            <p className="text-red-500 text-sm">{errors.feeRange?.message}</p>
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              {...register("location")}
              className="w-full p-2 border rounded border-white text-white"
            />
            <p className="text-red-500 text-sm">{errors.location?.message}</p>
          </div>

          {/* Profile Image */}
          <div className="mb-6 bg-black p-4 rounded border border-white">
            <label className="block font-medium mb-1 text-white">
              Profile Image (optional)
            </label>
            <div className="w-1/3 text-sm text-black bg-gray-400 mb-2">
              <input
                type="file"
                accept="image/*"
                {...register("profileImage")}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition"
          >
            Submit
          </button>

          {submitted && (
            <div className="text-center mt-4 space-y-2">
              <p className="text-green-400">Artist submitted successfully!</p>
              <Link
                href="/manager-dashboard"
                className="inline-block bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                View Submissions on manager dashboard
              </Link>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
