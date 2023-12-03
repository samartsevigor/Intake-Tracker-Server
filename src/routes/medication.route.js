const express = require('express');
const MedicationController = require('../controllers/medication.controller');
const authMiddleware = require('../middleware/authMiddleware');
const MedicationValidator = require('../validators/medication.validator');

const app = express.Router();

app.get('/', authMiddleware, MedicationController.getMedications);
app.get('/:id', authMiddleware, MedicationController.getMedicationById);
app.post('/', authMiddleware, MedicationValidator.medicationValidator, MedicationController.createMedication);
app.put('/:id', authMiddleware, MedicationValidator.medicationValidatorForPut, MedicationController.updateMedicationById);
app.delete('/:id', authMiddleware, MedicationController.deleteMedicationById);

module.exports = app;
