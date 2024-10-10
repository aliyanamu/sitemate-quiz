const fs = require('fs').promises; // Use the promises API from 'fs'
const path = require('path');
const DATA_FILE = path.join(__dirname, '../data.json');

// Helper function to read from file using async/await
const readDataFromFile = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);
    return []; // Return empty array in case of error
  }
};

// Helper function to write data to file using async/await
const writeDataToFile = async (data) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log('Data written successfully');
  } catch (err) {
    console.error('Error writing file:', err);
  }
};


module.exports = {
  readDataFromFile,
  writeDataToFile,
};