import React, { useState } from "react";
import { Button, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

function FileUpload({ token }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card sx={{ mt: 2, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary">
            Upload a File
          </Typography>
          <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
            Choose File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {file && <Typography sx={{ mt: 2 }}>Selected: {file.name}</Typography>}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default FileUpload;
