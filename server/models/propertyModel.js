const pool = require('../config/db');

async function addUserProperty(userId, propertyData) {
  const { property_name, deal_price, property_pic_url } = propertyData;

  try {
    const result = await pool.query(
      `INSERT INTO user_property (user_id, property_name, deal_price, property_pic_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, property_name, deal_price, property_pic_url]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error in addUserProperty:', error.message);
    throw error;
  }
}

async function getUserProperties(userId) {
  try {
    const result = await pool.query(
      `SELECT * FROM user_property WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  } catch (error) {
    console.error('Error in getUserProperties:', error.message);
    throw error;
  }
}

async function getAllProperties() {
  try {
  const result = await pool.query(
      `SELECT 
         p.*, 
         pr.name
       FROM user_property p
       JOIN user_profile pr ON p.user_id = pr.user_id
       ORDER BY p.created_at DESC`
    );
    return result.rows;
  } catch (error) {
    console.error('Error in getAllProperties:', error.message);
    throw error;
  }
}

async function deleteUserProperty(userId, propertyId) {
    const result = await pool.query(
      'DELETE FROM user_property WHERE id = $1 AND user_id = $2',
      [propertyId, userId]
    );
      return result.rowCount > 0;
}

module.exports = {
  addUserProperty,
  getUserProperties,
  getAllProperties,
  deleteUserProperty, 
};
