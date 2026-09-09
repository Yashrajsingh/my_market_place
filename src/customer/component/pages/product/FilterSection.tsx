import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { colors } from "../../../../data/filter/color";
import { priceFilters } from "../../../../data/filter/price";
import { discounts } from "../../../../data/filter/discount";
import { brands } from "../../../../data/filter/brand";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSection = () => {
  const [expandColor, setExpandColor] = useState(false);
  const [expandPrice, setExpandPrice] = useState(false);
  const [expandDiscount, setExpandDiscount] = useState(false);
  const [expandBrand, setExpandBrand] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilterParams = (e: any) => {
    const { value, name } = e.target;
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }

    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="space-y-5 bg-white">
      {/* HEADER */}
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
        <p className="text-lg font-semibold text-gradient-brand">Filters</p>

        <Button
          onClick={clearAllFilters}
          className="text-rose-600 cursor-pointer font-semibold"
          size="small"
        >
          clear All
        </Button>
      </div>

      <Divider />

      <div className="px-9 space-y-6">
        {/* COLOR FILTER */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#0071E3",
                pb: "14px",
              }}
            >
              color
            </FormLabel>

            <RadioGroup
              aria-labelledby="color"
              name="color"
              value={searchParams.get("color") || ""}
              onChange={updateFilterParams}
            >
              {colors
                .slice(0, expandColor ? colors.length : 5)
                .map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.name}
                    control={<Radio />}
                    label={
                      <div className="flex items-center gap-3">
                        <p>{item.name}</p>

                        <span
                          style={{ backgroundColor: item.value }}
                          className={`h-5 w-5 rounded-full ${
                            item.name === "White" ? "border" : ""
                          }`}
                        ></span>
                      </div>
                    }
                  />
                ))}
            </RadioGroup>

            <Button onClick={() => setExpandColor(!expandColor)}>
              {expandColor ? "Show Less" : "Show More"}
            </Button>
          </FormControl>
        </section>

        <Divider />

        {/* PRICE FILTER */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#0071E3",
                pb: "14px",
              }}
            >
              price
            </FormLabel>

            <RadioGroup
              name="price"
              value={searchParams.get("price") || ""}
              onChange={updateFilterParams}
            >
              {priceFilters
                .slice(0, expandPrice ? priceFilters.length : 2)
                .map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <p className="font-semibold text-sm mt-2 mb-1">
                      {group.label}
                    </p>

                    {group.ranges.map((range, index) => (
                      <FormControlLabel
                        key={index}
                        value={range.name}
                        control={<Radio />}
                        label={range.name}
                      />
                    ))}
                  </div>
                ))}
            </RadioGroup>

            <Button onClick={() => setExpandPrice(!expandPrice)}>
              {expandPrice ? "Show Less" : "Show More"}
            </Button>
          </FormControl>
        </section>

        <Divider />

        {/* DISCOUNT FILTER */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#0071E3",
                pb: "14px",
              }}
            >
              discount
            </FormLabel>

            <RadioGroup
              name="discount"
              value={searchParams.get("discount") || ""}
              onChange={updateFilterParams}
            >
              {discounts
                .slice(0, expandDiscount ? discounts.length : 4)
                .map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={<Radio />}
                    label={item.name}
                  />
                ))}
            </RadioGroup>

            <Button onClick={() => setExpandDiscount(!expandDiscount)}>
              {expandDiscount ? "Show Less" : "Show More"}
            </Button>
          </FormControl>
        </section>

        <Divider />

        {/* BRAND FILTER */}
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#0071E3",
                pb: "14px",
              }}
            >
              brand
            </FormLabel>

            <RadioGroup
              name="brand"
              value={searchParams.get("brand") || ""}
              onChange={updateFilterParams}
            >
              {brands
                .slice(0, expandBrand ? brands.length : 5)
                .map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={<Radio />}
                    label={item.name}
                  />
                ))}
            </RadioGroup>

            <Button onClick={() => setExpandBrand(!expandBrand)}>
              {expandBrand ? "Show Less" : "Show More"}
            </Button>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;