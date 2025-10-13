import express from "express";
import { Contact } from "../models/contact.model";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: "All fields are required" });

    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ message: "Inquiry sent successfully", contact });
  } catch (err) {
    res.status(500).json({ message: "Error submitting contact form", error: err });
  }
});

export default router;
