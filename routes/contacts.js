const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET a single contact by ID
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// POST a new contact
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required" });
    }

    const newContact = new Contact({ name, email, phone, address });
    await newContact.save();
    
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Error creating contact", error });
  }
});

// PUT (Update) a contact by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address },
      { new: true, runValidators: true }
    );

    if (!updatedContact) return res.status(404).json({ message: "Contact not found" });

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: "Error updating contact", error });
  }
});

// DELETE a contact by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: "Contact not found" });

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
});

module.exports = router;



