import React, { useEffect, useState } from "react";

import {
  IconButton,
  Box,
  Button,
  Avatar,
  Badge,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import {
  AddShoppingCart,
  FavoriteBorder,
  AccountCircle,
  Logout,
} from "@mui/icons-material";

import CategorySheet from "../navbar/CategorySheet";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../State/Store";

import {
  logout,
  selectAuth,
} from "../../../State/AuthSlice";

import {
  fetchWishlist,
  selectWishlist,
} from "../../../State/customer/WishlistSlice";

import {
  fetchUserCart,
  selectCart,
} from "../../../State/customer/CartSlice";

import {
  selectTopLevelCategories,
} from "../../../State/CategorySlice";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const theme = useTheme();

  const isLarge = useMediaQuery(
    theme.breakpoints.up("lg")
  );

  /* =========================================
     AUTH STATE
  ========================================= */

  const {
    user,
    isLoggedIn,
  } = useAppSelector(selectAuth);

  const wishlist = useAppSelector(selectWishlist);

  const cart = useAppSelector(selectCart);

  const navbarCategories = useAppSelector(selectTopLevelCategories);

  useEffect(() => {
    if (!isLoggedIn) return;

    const jwt = localStorage.getItem("jwt");

    dispatch(fetchWishlist());

    if (jwt) {
      dispatch(fetchUserCart(jwt));
    }
  }, [isLoggedIn, dispatch]);

  /* =========================================
     LOCAL STATE
  ========================================= */

  const [openMenu, setOpenMenu] =
    useState(false);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<string>("");

  const [
    showCategorySheet,
    setShowCategorySheet,
  ] = useState(false);

  const [
    profileMenuAnchor,
    setProfileMenuAnchor,
  ] = useState<null | HTMLElement>(null);

  /* =========================================
     PROFILE MENU
  ========================================= */

  const handleProfileClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileMenuAnchor(null);
  };

  /* =========================================
     LOGOUT
  ========================================= */

  const handleLogout = async () => {
    handleProfileClose();

    await dispatch(
      logout("Logout Successful")
    );

    navigate("/");

    window.location.reload();
  };

  return (
    <>
      {/* =====================================
          NAVBAR
      ===================================== */}

      <Box
        className="fixed top-0 left-0 right-0 z-50"
        sx={{
          background:
            "rgba(21,11,32,0.94)",

          backdropFilter:
            "blur(18px)",

          WebkitBackdropFilter:
            "blur(18px)",

          boxShadow:
            "0 10px 30px rgba(124,58,237,.18)",

          borderBottom:
            "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-20">

          {/* =================================
              LEFT
          ================================= */}

          <div className="flex items-center gap-4">

            {!isLarge && (
              <IconButton
                onClick={() =>
                  setOpenMenu(true)
                }
                sx={{
                  color: "white",

                  backgroundColor:
                    "rgba(255,255,255,.08)",

                  transition: ".3s",

                  "&:hover": {
                    backgroundColor:
                      "#F43F5E",

                    transform:
                      "scale(1.08)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Avatar
              sx={{
                width: 44,
                height: 44,

                border:
                  "2px solid #A78BFA",

                boxShadow:
                  "0 0 18px rgba(124,58,237,.45)",
              }}
              src={
                user?.image ||
                "https://i.pravatar.cc/300"
              }
            >
              {user?.fullName?.charAt(0) ||
                "Y"}
            </Avatar>

            <h1
              onClick={() =>
                navigate("/")
              }
              className="cursor-pointer text-xl md:text-2xl font-extrabold tracking-wide bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent transition duration-300 hover:scale-105"
            >
              My Marketplace
            </h1>

          </div>

          {/* =================================
              DESKTOP CATEGORIES
          ================================= */}

          <ul className="hidden lg:flex items-center gap-2">

            {navbarCategories.map(
              (item) => (
                <li
                  key={item.categoryId}
                  onMouseEnter={() => {
                    setSelectedCategory(
                      item.categoryId
                    );

                    setShowCategorySheet(
                      true
                    );
                  }}
                  onClick={() => {
                    setShowCategorySheet(
                      false
                    );

                    navigate(
                      "/products/" +
                        item.categoryId
                    );
                  }}
                  className={`
                    px-5 py-2
                    rounded-full
                    font-medium
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:-translate-y-1

                    ${
                      selectedCategory ===
                        item.categoryId &&
                      showCategorySheet
                        ? "bg-gradient-to-r from-violet-500 to-rose-500 text-white shadow-lg"
                        : "text-gray-300 hover:bg-white/10 hover:text-fuchsia-300"
                    }
                  `}
                >
                  {item.name}
                </li>
              )
            )}

          </ul>

          {/* =================================
              RIGHT
          ================================= */}

          <div className="flex items-center gap-3">

            {/* SEARCH */}

            <IconButton
              sx={{
                color: "white",

                bgcolor:
                  "rgba(255,255,255,.08)",

                transition: ".3s",

                "&:hover": {
                  bgcolor: "#F43F5E",

                  transform:
                    "translateY(-2px)",
                },
              }}
            >
              <SearchIcon />
            </IconButton>

            {/* =================================
                PROFILE
            ================================= */}

            {isLoggedIn ? (

              <>
                <Button
                  onClick={
                    handleProfileClick
                  }
                  variant="outlined"
                  startIcon={
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                      }}
                      src={
                        user?.image ||
                        "https://i.pravatar.cc/301"
                      }
                    >
                      {user?.fullName?.charAt(
                        0
                      )}
                    </Avatar>
                  }
                  sx={{
                    borderRadius: "30px",

                    textTransform:
                      "none",

                    color: "white",

                    borderColor:
                      "rgba(255,255,255,.2)",

                    px: 2,

                    py: 0.8,

                    background:
                      "rgba(255,255,255,.05)",

                    "&:hover": {
                      borderColor:
                        "#A78BFA",

                      background:
                        "rgba(124,58,237,.15)",
                    },
                  }}
                >
                  {user?.fullName ||
                    "My Account"}
                </Button>

                {/* PROFILE MENU */}

                <Menu
                  anchorEl={
                    profileMenuAnchor
                  }
                  open={
                    Boolean(
                      profileMenuAnchor
                    )
                  }
                  onClose={
                    handleProfileClose
                  }
                  PaperProps={{
                    sx: {
                      mt: 1,

                      minWidth: 200,

                      borderRadius:
                        "14px",
                    },
                  }}
                >

                  <MenuItem
                    onClick={() => {
                      handleProfileClose();

                      navigate(
                        "/account"
                      );
                    }}
                  >
                    <AccountCircle
                      sx={{
                        mr: 1,
                      }}
                    />

                    Profile
                  </MenuItem>

                  <MenuItem
                    onClick={
                      handleLogout
                    }
                  >
                    <Logout
                      sx={{
                        mr: 1,
                      }}
                    />

                    Logout
                  </MenuItem>

                </Menu>
              </>

            ) : (

              /* LOGIN */

              <Button
                variant="contained"
                onClick={() =>
                  navigate("/login")
                }
                sx={{
                  borderRadius:
                    "30px",

                  textTransform:
                    "none",
                }}
              >
                Login
              </Button>

            )}

            {/* =================================
                WISHLIST
            ================================= */}

            <IconButton
              onClick={() =>
                navigate("/wishlist")
              }
              sx={{
                color: "white",

                bgcolor:
                  "rgba(255,255,255,.08)",

                transition: ".3s",

                "&:hover": {
                  bgcolor:
                    "#F43F5E",

                  transform:
                    "scale(1.08)",
                },
              }}
            >
              <Badge
                badgeContent={wishlist?.products?.length || 0}
                color="error"
              >
                <FavoriteBorder />
              </Badge>
            </IconButton>

            {/* =================================
                CART
            ================================= */}

            <IconButton
              onClick={() =>
                navigate("/cart")
              }
              sx={{
                color: "white",

                bgcolor:
                  "rgba(255,255,255,.08)",

                transition: ".3s",

                "&:hover": {
                  bgcolor:
                    "#F43F5E",

                  transform:
                    "scale(1.08)",
                },
              }}
            >
              <Badge
                badgeContent={cart?.totalItem || 0}
                color="primary"
              >
                <AddShoppingCart />
              </Badge>
            </IconButton>

            {/* =================================
                BECOME SELLER
            ================================= */}

            <Button
              onClick={() =>
                navigate(
                  "/become-seller"
                )
              }
              variant="contained"
              sx={{
                ml: 1,

                display: { xs: "none", md: "inline-flex" },

                borderRadius:
                  "30px",

                px: 3,

                py: 1,

                textTransform:
                  "none",

                fontWeight: 700,

                letterSpacing: ".3px",

                whiteSpace:
                  "nowrap",

                background:
                  "linear-gradient(135deg,#7C3AED,#F43F5E)",

                boxShadow:
                  "0 10px 20px rgba(124,58,237,.35)",

                transition: ".3s",

                "&:hover": {
                  transform:
                    "translateY(-2px)",

                  boxShadow:
                    "0 15px 30px rgba(244,63,94,.45)",

                  background:
                    "linear-gradient(135deg,#6D28D9,#BE123C)",
                },
              }}
            >
              Become Seller
            </Button>

          </div>

        </div>
      </Box>

      {/* =====================================
          CATEGORY SHEET
      ===================================== */}

      {showCategorySheet && (
        <>
          <div
            onClick={() =>
              setShowCategorySheet(
                false
              )
            }
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          <div className="fixed top-20 left-0 w-full z-50">
            <button
              onClick={() =>
                setShowCategorySheet(
                  false
                )
              }
              className="absolute right-8 top-6 z-50 h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              <CloseIcon fontSize="small" />
            </button>

            <CategorySheet
              selectedCategory={
                selectedCategory
              }
            />
          </div>
        </>
      )}

      {/* =====================================
          MOBILE DRAWER
      ===================================== */}

      <Drawer
        anchor="left"
        open={openMenu}
        onClose={() =>
          setOpenMenu(false)
        }
        PaperProps={{
          sx: {
            width: 290,

            background:
              "linear-gradient(165deg,#150F27 0%,#241736 55%,#3B0F35 100%)",

            color: "white",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >

          {/* HEADER */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",

              gap: 2,

              p: 3,

              borderBottom:
                "1px solid rgba(255,255,255,.08)",
            }}
          >

            <Avatar
              src={
                user?.image ||
                "https://i.pravatar.cc/300"
              }
              sx={{
                width: 52,
                height: 52,

                border:
                  "2px solid #A78BFA",
              }}
            >
              {user?.fullName?.charAt(0)}
            </Avatar>

            <Box>
              <h2 className="font-bold text-lg text-white">
                {user?.fullName ||
                  "Yash Marketplace"}
              </h2>

              <p className="text-sm text-gray-400">
                {isLoggedIn
                  ? "Welcome Back 👋"
                  : "Welcome"}
              </p>
            </Box>

          </Box>

          {/* CATEGORIES */}

          <List sx={{ mt: 1 }}>

            {navbarCategories.map(
              (item) => (
                <ListItem
                  key={item.categoryId}
                  onClick={() => {
                    setSelectedCategory(
                      item.categoryId
                    );

                    setShowCategorySheet(
                      true
                    );

                    setOpenMenu(false);
                  }}
                  sx={{
                    cursor: "pointer",

                    mx: 1.5,

                    my: 1,

                    borderRadius:
                      "14px",

                    "&:hover": {
                      background:
                        "linear-gradient(90deg,#7C3AED,#F43F5E)",

                      color: "white",

                      transform:
                        "translateX(8px)",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      item.name
                    }
                    primaryTypographyProps={{
                      fontWeight: 600,
                    }}
                  />
                </ListItem>
              )
            )}

          </List>

          {/* BOTTOM */}

          <Box
            sx={{
              mt: "auto",

              p: 2,

              borderTop:
                "1px solid rgba(255,255,255,.08)",
            }}
          >

            {isLoggedIn && (
              <Button
                fullWidth
                variant="outlined"
                onClick={
                  handleLogout
                }
                sx={{
                  mb: 2,

                  borderRadius:
                    "30px",

                  py: 1.2,

                  color: "white",

                  borderColor:
                    "#ef4444",

                  textTransform:
                    "none",

                  "&:hover": {
                    background:
                      "#ef4444",

                    color: "white",
                  },
                }}
              >
                Logout
              </Button>
            )}

            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                navigate(
                  "/become-seller"
                );

                setOpenMenu(false);
              }}
              sx={{
                borderRadius:
                  "30px",

                py: 1.2,

                fontWeight: 700,

                textTransform:
                  "none",

                background:
                  "linear-gradient(135deg,#7C3AED,#F43F5E)",
              }}
            >
              Become Seller
            </Button>

          </Box>

        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;