import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { createProduct } from "../../../State/seller/SellerProductSlice";

const AddProducts = () => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector(
    (state) => state.sellerProduct
  );

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    category2: "",
    category3: "",
    color: "",
    mrpPrice: "",
    sellingPrice: "",
    quantity: "",
    size: "",
    images: [""],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (
    index: number,
    value: string
  ) => {
    const imgs = [...product.images];
    imgs[index] = value;

    setProduct({
      ...product,
      images: imgs,
    });
  };

  const addImageField = () => {
    setProduct({
      ...product,
      images: [...product.images, ""],
    });
  };

  const removeImageField = (index: number) => {
    setProduct({
      ...product,
      images: product.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const request = {
      title: product.title,
      description: product.description,
      category: product.category,
      category2: product.category2,
      category3: product.category3,
      color: product.color,
      mrpPrice: Number(product.mrpPrice),
      sellingPrice: Number(product.sellingPrice),
      quantity: Number(product.quantity),
      size: product.size,
      images: product.images.filter(
        (img) => img.trim() !== ""
      ),
    };

    console.log(request);

    const result = await dispatch(createProduct(request));

    if (createProduct.fulfilled.match(result)) {
      alert("Product Added Successfully");

      setProduct({
        title: "",
        description: "",
        category: "",
        category2: "",
        category3: "",
        color: "",
        mrpPrice: "",
        sellingPrice: "",
        quantity: "",
        size: "",
        images: [""],
      });
    } else {
      alert("Unable to add product");
      console.log(result.payload);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Paper className="max-w-5xl mx-auto p-8 rounded-2xl shadow-card">

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 800, background: "linear-gradient(135deg,#0071E3,#FF3B30)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Add Product
        </Typography>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <TextField
              label="Product Title"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />

            <TextField
              label="Color"
              name="color"
              value={product.color}
              onChange={handleChange}
              required
            />

            <TextField
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />

            <TextField
              label="Sub Category"
              name="category2"
              value={product.category2}
              onChange={handleChange}
              required
            />

            <TextField
              label="Third Category"
              name="category3"
              value={product.category3}
              onChange={handleChange}
              required
            />

            <TextField
              select
              label="Size"
              name="size"
              value={product.size}
              onChange={handleChange}
              required
            >
              <MenuItem value="XS">XS</MenuItem>
              <MenuItem value="S">S</MenuItem>
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="L">L</MenuItem>
              <MenuItem value="XL">XL</MenuItem>
              <MenuItem value="XXL">XXL</MenuItem>
            </TextField>

            <TextField
              label="MRP Price"
              name="mrpPrice"
              type="number"
              value={product.mrpPrice}
              onChange={handleChange}
              required
            />

            <TextField
              label="Selling Price"
              name="sellingPrice"
              type="number"
              value={product.sellingPrice}
              onChange={handleChange}
              required
            />

            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-5">

            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
              fullWidth
              value={product.description}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mt-8">

            <Typography variant="h6">
              Product Images
            </Typography>

            {product.images.map((img, index) => (

              <div
                key={index}
                className="flex items-center gap-3 mt-3"
              >

                <TextField
                  fullWidth
                  label={`Image URL ${index + 1}`}
                  value={img}
                  onChange={(e) =>
                    handleImageChange(index, e.target.value)
                  }
                />

                {product.images.length > 1 && (
                  <IconButton
                    color="error"
                    onClick={() =>
                      removeImageField(index)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                )}

              </div>

            ))}

            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addImageField}
            >
              Add Image
            </Button>

          </div>

          <Button
            sx={{ mt: 5 }}
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </Button>

        </form>

      </Paper>
    </div>
  );
};

export default AddProducts;