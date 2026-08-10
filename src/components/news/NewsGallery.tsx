"use client";

import { useState } from "react";

export function NewsGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="mb-8">
      <img
        src={images[active]}
        alt={title}
        className="h-[420px] w-full rounded-[24px] object-cover shadow-lg"
      />

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-5">
          {images.map((url, index) => (
            <button
              key={url}
              type="button"
              onClick={() => setActive(index)}
              className={`overflow-hidden rounded-xl border ${
                active === index ? "border-blue-700" : "border-transparent"
              }`}
            >
              <img
                src={url}
                alt={title}
                className="h-24 w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}