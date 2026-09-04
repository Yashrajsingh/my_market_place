import { Divider } from "@mui/material";
import React from "react";

const ProfileFieldCard = ({
  keys,
  value,
}: {
  keys: string;
  value: string;
}) => {
  return (
    <div className="bg-violet-50/50 px-5 py-4 rounded-xl mb-3 hover:bg-violet-50 transition-colors duration-300">
      <div className="grid grid-cols-2 items-center">
        {/* Left Side */}
        <div className="text-violet-700 text-sm font-semibold border-r border-violet-200 pr-4">
          {keys}
        </div>

        {/* Right Side */}
        <div className="pl-4 text-gray-900 font-semibold">
          {value}
        </div>
      </div>
    </div>
  );
};

export default ProfileFieldCard;