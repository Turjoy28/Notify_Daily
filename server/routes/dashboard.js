const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/checkAuth');
const dashboardController = require('../controllers/dashboardController');

// View all notes
router.get('/dashboard', isLoggedIn, dashboardController.dashboard);

// View single note
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewNote);

// Update note
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateNote);

// Delete note
router.post('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeleteNote);

// Add note
router.get('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNote);
router.post('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNoteSubmit);

// Search notes
router.get('/dashboard/search', isLoggedIn, dashboardController.dashboardSearch);
router.post('/dashboard/search', isLoggedIn, dashboardController.dashboardSearchSubmit);

module.exports = router;
