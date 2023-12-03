const MedicationModule = require('../modules/medication.module');

const getMedications = async (req, res) => {
  try {
    const medications = await MedicationModule.getMedicationsByUserId(req.userId);
    res.json(medications);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};

const getMedicationById = async (req, res) => {
  try {
    const medicationId = req.params.id;
    const {userId} = req;
    const medication = await MedicationModule.getMedicationById(medicationId);
    if (medication && medication.user_id !== userId) {
      return res.status(403).send('Access denied: Medication does not belong to the current user');
    }
    res.json(medication);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};

const createMedication = async (req, res) => {
  try {
    const {
      name, description, count, destination_count,
    } = req.body;
    const {userId} = req;

    const newMedication = {
      name,
      description,
      count,
      destination_count,
      user_id: userId,
    };
    const createdMedication = await MedicationModule.createMedication(newMedication);

    res.status(201).json(createdMedication);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};

const updateMedicationById = async (req, res) => {
  try {
    const {
      name, description, count, destinationCount,
    } = req.body;
    const medicationId = req.params.id;
    const {userId} = req;

    const medication = await MedicationModule.getMedicationById(medicationId);

    if (!medication) {
      return res.status(404).send('Medication not found');
    }

    if (medication.user_id !== userId) {
      return res.status(403).send('Access denied: Medication does not belong to the current user');
    }

    const result = await MedicationModule.updateMedicationById(
      medicationId,
      {
        name,
        description,
        count,
        destinationCount,
      },
    );

    if (!result) {
      return res.status(404).send('Medication not found');
    }

    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};

const deleteMedicationById = async (req, res) => {
  try {
    const medicationId = req.params.id;
    const {userId} = req;

    const medication = await MedicationModule.getMedicationById(medicationId);
    if (!medication || medication.user_id !== userId) {
      return res.status(403).send('Access denied: Medication does not belong to the current user');
    }

    const result = await MedicationModule.deleteMedicationById(medicationId);
    if (!result) {
      return res.status(404).send('Medication not found');
    }

    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};

module.exports = {
  getMedications,
  getMedicationById,
  deleteMedicationById,
  updateMedicationById,
  createMedication,
};
