import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

function Login({ setToken, setRole }) {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    setRole(username === "admin" ? "admin" : "user");
    setToken("dummy-token");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Enter Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ textTransform: "none" }}
        >
          Login
        </Button>
      </Box>
    </motion.div>
  );
}

export default Login;
