const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, company, jobTitle } = req.body;
    const newContact = new Contact({ firstName, lastName, email, phoneNumber, company, jobTitle });

    await newContact.save();
    res.status(201).json({
      success: 'successfully saved' 
    });
  } catch (error) {
    console.error(error);  // Log the error to the console
    res.status(400).json({ error: 'Error saving contact', details: error.message });
  }
});

// Route to get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contacts' });
  }
});

// Route to delete a contact
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting contact' });
  }
});

module.exports = router;
