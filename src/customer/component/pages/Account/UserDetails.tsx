import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileFieldCard from "../../../../component/ProfileFieldCard";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { logout, selectAuth } from "../../../../State/AuthSlice";

const UserDetails = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleConfirmLogout = async () => {
    setLogoutDialogOpen(false);

    await dispatch(logout(undefined));

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-6 text-gradient-brand">
        Personal Details
      </h1>

      <ProfileFieldCard keys="Name" value={user?.fullName || "—"} />
      <ProfileFieldCard keys="Mobile" value={user?.mobile || "—"} />
      <ProfileFieldCard keys="Email" value={user?.email || "—"} />

      <div className="mt-6 pt-6 border-t border-gray-100">
        <Button
          variant="outlined"
          onClick={() => setLogoutDialogOpen(true)}
          sx={{
            color: "#FF3B30",
            borderColor: "#FF3B30",
            "&:hover": {
              backgroundColor: "#FF3B30",
              color: "#fff",
              borderColor: "#FF3B30",
            },
          }}
        >
          Log Out
        </Button>
      </div>

      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Log out?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out of your account?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setLogoutDialogOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleConfirmLogout}
            sx={{
              backgroundColor: "#FF3B30",
              "&:hover": { backgroundColor: "#D70015" },
            }}
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserDetails;
