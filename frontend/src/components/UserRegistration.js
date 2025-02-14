import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

function UserRegistration({ token }) {
  const [username, setUsername] = useState("");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card sx={{ mt: 2, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary">
            Register New User
          </Typography>
          <TextField
            label="New Username"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default UserRegistration;
