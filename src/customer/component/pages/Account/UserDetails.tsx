import React from "react";
import ProfileFieldCard from "../../../../component/ProfileFieldCard";
import { useAppSelector } from "../../../../State/Store";
import { selectAuth } from "../../../../State/AuthSlice";

const UserDetails = () => {
  const { user } = useAppSelector(selectAuth);

  return (
    <div className="bg-white rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6 text-gradient-brand">
        Personal Details
      </h1>

      <ProfileFieldCard keys="Name" value={user?.fullName || "—"} />
      <ProfileFieldCard keys="Mobile" value={user?.mobile || "—"} />
      <ProfileFieldCard keys="Email" value={user?.email || "—"} />
    </div>
  );
};

export default UserDetails;
