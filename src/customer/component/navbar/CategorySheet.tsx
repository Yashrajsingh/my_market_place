import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../State/Store";
import { selectCategories } from "../../../State/CategorySlice";
import { Category } from "../../../types/ProductTypes";

interface Props {
  selectedCategory: string;
}

const CategorySheet = ({ selectedCategory }: Props) => {
  const navigate = useNavigate();

  const categories = useAppSelector(selectCategories);

  const levelTwoData = categories.filter(
    (c: Category) => c.parentCategory?.categoryId === selectedCategory
  );

  const [selectedLevelTwoId, setSelectedLevelTwoId] = useState("");

  useEffect(() => {
    setSelectedLevelTwoId(
      levelTwoData.length > 0 ? levelTwoData[0].categoryId : ""
    );
  }, [selectedCategory, categories]);

  const levelThreeData = categories.filter(
    (c: Category) => c.parentCategory?.categoryId === selectedLevelTwoId
  );

  const goToCategory = (categoryId: string) => {
    navigate("/products/" + categoryId);
  };

  return (
    <div className="w-full bg-white shadow-2xl rounded-b-2xl p-6 border-t border-gray-100">
      <div className="grid grid-cols-2 gap-8 min-h-[420px]">
        {/* LEFT */}
        <div className="border-r pr-5">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Categories
          </h2>

          <div className="space-y-3">
            {levelTwoData.map((item: Category) => (
              <div
                key={item.categoryId}
                onMouseEnter={() => setSelectedLevelTwoId(item.categoryId)}
                onClick={() => goToCategory(item.categoryId)}
                className={`p-4 rounded-xl cursor-pointer font-medium transition-all duration-300 ${
                  selectedLevelTwoId === item.categoryId
                    ? "bg-gradient-to-r from-violet-500 to-rose-500 text-white shadow-lg scale-[1.02]"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Sub Categories
          </h2>

          {levelThreeData.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {levelThreeData.map((item: Category) => (
                <div
                  onClick={() => goToCategory(item.categoryId)}
                  key={item.categoryId}
                  className="p-4 rounded-xl bg-gray-50 hover:bg-violet-50 hover:text-violet-600 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {item.name}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-gray-400 text-lg">
              No subcategories found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySheet;
