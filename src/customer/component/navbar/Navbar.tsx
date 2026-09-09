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
  InputBase,
  ClickAwayListener,
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

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* =========================================
     SEARCH
  ========================================= */

  const handleSearchSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const trimmed = searchQuery.trim();

    if (!trimmed) return;

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);

    setSearchOpen(false);
    setSearchQuery("");
  };

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
            "rgba(255,255,255,0.85)",

          backdropFilter:
            "blur(18px)",

          WebkitBackdropFilter:
            "blur(18px)",

          borderBottom:
            "1px solid rgba(0,0,0,.08)",
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
                  color: "#1D1D1F",

                  backgroundColor:
                    "rgba(0,0,0,.04)",

                  transition: ".2s",

                  "&:hover": {
                    backgroundColor:
                      "rgba(0,0,0,.08)",
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
                  "2px solid #D2D2D7",
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
              className="cursor-pointer text-xl md:text-2xl font-semibold tracking-tight text-ink transition duration-200"
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
                        ? "bg-brand-500 text-white"
                        : "text-ink-soft hover:bg-gray-100 hover:text-ink"
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

            <ClickAwayListener
              onClickAway={() =>
                setSearchOpen(false)
              }
            >
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <IconButton
                  onClick={() =>
                    setSearchOpen((prev) => !prev)
                  }
                  sx={{
                    color: "#1D1D1F",

                    bgcolor:
                      "rgba(0,0,0,.04)",

                    transition: ".2s",

                    "&:hover": {
                      bgcolor: "rgba(0,0,0,.08)",
                    },
                  }}
                >
                  <SearchIcon />
                </IconButton>

                {searchOpen && (
                  <Box
                    component="form"
                    onSubmit={handleSearchSubmit}
                    sx={{
                      position: "absolute",
                      top: "calc(100% + 10px)",
                      right: 0,

                      display: "flex",
                      alignItems: "center",

                      width: { xs: 220, sm: 300 },

                      bgcolor: "#FFFFFF",
                      border: "1px solid rgba(0,0,0,.1)",
                      borderRadius: "14px",
                      boxShadow: "0 12px 28px rgba(0,0,0,0.12)",

                      px: 2,
                      py: 0.5,

                      zIndex: 60,
                    }}
                  >
                    <SearchIcon
                      sx={{
                        color: "#6E6E73",
                        mr: 1,
                        fontSize: 20,
                      }}
                    />

                    <InputBase
                      autoFocus
                      fullWidth
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) =>
                        setSearchQuery(e.target.value)
                      }
                      sx={{ fontSize: 15 }}
                    />
                  </Box>
                )}
              </Box>
            </ClickAwayListener>

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

                    color: "#1D1D1F",

                    borderColor:
                      "rgba(0,0,0,.15)",

                    px: 2,

                    py: 0.8,

                    background:
                      "transparent",

                    "&:hover": {
                      borderColor:
                        "#0071E3",

                      background:
                        "rgba(0,113,227,.06)",
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
                color: "#1D1D1F",

                bgcolor:
                  "rgba(0,0,0,.04)",

                transition: ".2s",

                "&:hover": {
                  bgcolor:
                    "rgba(0,0,0,.08)",
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
                color: "#1D1D1F",

                bgcolor:
                  "rgba(0,0,0,.04)",

                transition: ".2s",

                "&:hover": {
                  bgcolor:
                    "rgba(0,0,0,.08)",
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
                  "#1D1D1F",

                boxShadow: "none",

                transition: ".2s",

                "&:hover": {
                  background:
                    "#000000",
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
              className="absolute right-8 top-6 z-50 h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-card hover:bg-gray-100 transition-all duration-200"
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

            background: "#FFFFFF",

            color: "#1D1D1F",
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
                  "2px solid #D2D2D7",
              }}
            >
              {user?.fullName?.charAt(0)}
            </Avatar>

            <Box>
              <h2 className="font-semibold text-lg text-ink">
                {user?.fullName ||
                  "Yash Marketplace"}
              </h2>

              <p className="text-sm text-ink-soft">
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
                        "#F5F5F7",

                      color: "#1D1D1F",
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
                "1px solid rgba(0,0,0,.08)",
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

                  color: "#FF3B30",

                  borderColor:
                    "#FF3B30",

                  textTransform:
                    "none",

                  "&:hover": {
                    background:
                      "#FF3B30",

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

                background: "#1D1D1F",
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