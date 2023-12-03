const db = require('../db/db');

const MedicationModule = {
  async getMedicationsByUserId(userId) {
    try {
      const medications = await db.pool.query('SELECT * FROM medication WHERE user_id = $1', [userId]);
      return medications.rows;
    } catch (error) {
      throw new Error('Error retrieving medications');
    }
  },
  async getMedicationById(id) {
    try {
      const medicationQuery = 'SELECT * FROM medication WHERE id = $1';
      const result = await db.pool.query(medicationQuery, [id]);
      if (result.rows.length === 0) {
        console.log('Medication not found');
        return null;
      }
      return result.rows[0];
    } catch (error) {
      throw new Error('Error retrieving medication data');
    }
  },

  async createMedication(newMedication) {
    try {
      const {
        name,
        description,
        count,
        destination_count,
        user_id,
      } = newMedication;
      const insertQuery = 'INSERT INTO medication (name, description, count, destination_count, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [name, description, count, destination_count, user_id];

      const result = await db.pool.query(insertQuery, values);
      if (result.rows.length === 0) {
        console.log('Failed to create medication');
        return null;
      }

      return result.rows[0];
    } catch (error) {
      throw new Error('Error creating medication');
    }
  },

  async updateMedicationById(id, updatedFields) {
    try {
      const {
        name,
        description,
        count,
        destinationCount,
      } = updatedFields;

      let updateQuery = 'UPDATE medication SET ';
      const updateValues = [];
      let countParams = 1;

      if (name) {
        updateQuery += `name = $${countParams}, `;
        updateValues.push(name);
        countParams++;
      }

      if (description) {
        updateQuery += `description = $${countParams}, `;
        updateValues.push(description);
        countParams++;
      }

      if (count !== undefined) {
        updateQuery += `count = $${countParams}, `;
        updateValues.push(count);
        countParams++;
      }

      if (destinationCount !== undefined) {
        updateQuery += `destination_count = $${countParams}, `;
        updateValues.push(destinationCount);
        countParams++;
      }

      updateQuery = updateQuery.slice(0, -2);

      updateQuery += ` WHERE id = $${countParams} RETURNING *`;
      updateValues.push(id);

      const updateResult = await db.pool.query(updateQuery, updateValues);

      if (updateResult.rows.length === 0) {
        return null;
      }

      return updateResult.rows[0];
    } catch (error) {
      throw new Error('Error updating medication');
    }
  },

  async deleteMedicationById(id) {
    try {
      const deleteQuery = 'DELETE FROM medication WHERE id = $1 RETURNING *';
      const result = await db.pool.query(deleteQuery, [id]);

      if (result.rowCount === 0) {
        console.log('Medication not found');
        return null;
      }

      return result.rows[0];
    } catch (error) {
      throw new Error('Error deleting medication');
    }
  },
};

module.exports = MedicationModule;
