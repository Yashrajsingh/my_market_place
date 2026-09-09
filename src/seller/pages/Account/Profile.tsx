import React, { useEffect, useState } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import ProfileFieldCard from "../../../component/ProfileFieldCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchSellerProfile,
  selectSellerAuth,
  updateSellerProfile,
} from "../../../State/seller/SellerAuthSlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { seller, loading } = useAppSelector(selectSellerAuth);

  const [editing, setEditing] = useState(false);
  const [sellerName, setSellerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [gstin, setGstin] = useState("");

  useEffect(() => {
    dispatch(fetchSellerProfile());
  }, [dispatch]);

  useEffect(() => {
    if (seller) {
      setSellerName(seller.sellerName || seller.businessDetails?.businessName || "");
      setMobile(seller.mobile || "");
      setGstin(seller.GSTIN || "");
    }
  }, [seller]);

  const handleSave = () => {
    dispatch(
      updateSellerProfile({
        sellerName,
        mobile,
        GSTIN: gstin,
      })
    ).then(() => setEditing(false));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-card border border-violet-100 p-6 flex items-center gap-5">
        <Avatar
          sx={{
            width: 72,
            height: 72,
            bgcolor: "#0071E3",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {seller?.businessDetails?.businessName?.charAt(0) || "S"}
        </Avatar>

        <div>
          <h1 className="text-2xl font-bold text-gradient-brand">
            {seller?.businessDetails?.businessName || "Seller Account"}
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your business profile details
          </p>
        </div>

        <Button
          variant="contained"
          className="ml-auto"
          onClick={() => (editing ? handleSave() : setEditing(true))}
          disabled={loading}
        >
          {editing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-violet-100 p-6">
        <h2 className="text-lg font-bold mb-4">Business Details</h2>

        <ProfileFieldCard
          keys="Business Name"
          value={seller?.businessDetails?.businessName || "—"}
        />
        <ProfileFieldCard keys="Email" value={seller?.email || "—"} />

        {editing ? (
          <>
            <div className="mb-3">
              <TextField
                fullWidth
                size="small"
                label="Seller Name"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                size="small"
                label="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                size="small"
                label="GSTIN"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <ProfileFieldCard keys="Seller Name" value={sellerName || "—"} />
            <ProfileFieldCard keys="Mobile" value={mobile || "—"} />
            <ProfileFieldCard keys="GSTIN" value={gstin || "—"} />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
