import React, { useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DealCategoryTable from "./DealCategoryTable";
import DealTable from "./DealTable";
import CreateTableForm from "./CreateTableForm";

const tabs = [
  "Deals",
  "Create Deal",
  "Edit Deal",
];

const Deal = () => {
  const [activeTab, setActiveDeal] = useState("Deals");

  return (
    <div className="p-6">
      {/* Header */}
      <Paper
        elevation={2}
        className="rounded-2xl p-6 mb-6"
      >
        <Typography
          variant="h5"
          fontWeight={700}
          className="mb-5 text-gradient-brand"
        >
          Deal Management
        </Typography>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveDeal(tab)}
              variant={activeTab === tab ? "contained" : "outlined"}
              sx={{
                borderRadius: "30px",
                px: 4,
                py: 1,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "15px",
                transition: ".3s",
                boxShadow:
                  activeTab === tab
                    ? "0 8px 20px rgba(0,113,227,.3)"
                    : "none",
                background:
                  activeTab === tab
                    ? "linear-gradient(90deg,#0071E3,#FF3B30)"
                    : "#fff",
                color:
                  activeTab === tab
                    ? "#fff"
                    : "#0071E3",
                borderColor: "#0071E3",

                "&:hover": {
                  background:
                    activeTab === tab
                      ? "linear-gradient(90deg,#0058B0,#D70015)"
                      : "#F5F3FF",
                },
              }}
            >
              {tab}
            </Button>
          ))}
        </div>
      </Paper>

      {/* Content */}
      <Paper
        elevation={3}
        className="rounded-2xl p-6 min-h-[550px]"
      >
        {activeTab === "Deals" ? (
          <DealTable />
        ) : activeTab === "Create Deal" ? (
          <DealCategoryTable />
        ) : (
          <CreateTableForm />
        )}
      </Paper>
    </div>
  );
};

export default Deal;