import React, { useState } from "react";
import { Container, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Login from "./components/Login";
import UserRegistration from "./components/UserRegistration";
import FileUpload from "./components/FileUpload";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ p: 4, textAlign: "center", boxShadow: 5 }}>
          <CardContent>
            <Typography variant="h4" color="primary" gutterBottom>
              Secure File Upload with Blockchain & ZKP
            </Typography>

            {!token ? (
              <Login setToken={setToken} setRole={setRole} />
            ) : (
              <div>
                {role === "admin" && <UserRegistration token={token} />}
                <FileUpload token={token} />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}

export default App;
