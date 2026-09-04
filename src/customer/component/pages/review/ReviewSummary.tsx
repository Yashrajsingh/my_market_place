import React from "react";
import { Review } from "../../../../types/ReviewTypes";

const buckets = [
  { label: "Excellent", min: 4.5, color: "bg-gradient-to-r from-violet-600 to-rose-500" },
  { label: "Very Good", min: 3.5, color: "bg-gradient-to-r from-violet-500 to-rose-400" },
  { label: "Good", min: 2.5, color: "bg-violet-400" },
  { label: "Average", min: 1.5, color: "bg-violet-300" },
  { label: "Poor", min: 0, color: "bg-violet-200" },
];

const ReviewSummary = ({ reviews }: { reviews: Review[] }) => {
  const total = reviews.length;

  const average =
    total > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / total
      : 0;

  const bucketCounts = buckets.map((bucket, index) => {
    const max = index === 0 ? Infinity : buckets[index - 1].min;

    const count = reviews.filter(
      (r) => r.rating >= bucket.min && r.rating < max
    ).length;

    return {
      ...bucket,
      count,
      percent: total > 0 ? Math.round((count / total) * 100) : 0,
    };
  });

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-xl font-bold text-gradient-brand mb-6">Review & Ratings</h2>

      {/* Stars */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-amber-400 text-xl">
          {"★".repeat(Math.round(average)) + "☆".repeat(5 - Math.round(average))}
        </div>
        <span className="text-gray-400 text-sm">
          {average.toFixed(1)} · {total} Rating{total !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Progress bars */}
      <div className="space-y-4">
        {bucketCounts.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="w-[90px] text-sm text-gray-600">
              {item.label}
            </span>

            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className={`${item.color} h-full`} style={{ width: `${item.percent}%` }} />
            </div>

            <span className="text-sm text-gray-400 w-[60px]">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSummary;
