const { readDataFromFile, writeDataToFile } = require('../helpers/fs');

const createIssue = async (newIssue) => {
  const data = await readDataFromFile();
  // Assign a new ID (increment the highest id by 1)
  const newId = data.length ? Math.max(...data.map(obj => obj.id)) + 1 : 1;
  newIssue.id = newId;
  data.push(newIssue);

  await writeDataToFile(data);
  return newIssue;
};

const getIssues = () => {
  return readDataFromFile();
};

const getIssue = async (id) => {
  const data = await readDataFromFile();
  return data.find(obj => parseInt(obj.id) === id);
};

const updateIssue = async (id, updatedData) => {
  console.log(id, updatedData)
  const data = await readDataFromFile();
  const index = data.findIndex(obj => parseInt(obj.id) === id);

  if (index !== -1) {
    data[index] = { ...data[index], ...updatedData };
    await writeDataToFile(data);
    return updatedData;
  }

  return;
};

const deleteIssue = async (id) => {
  const data = await readDataFromFile();
  const deletedData = data.find(obj => parseInt(obj.id) === id);
  const newData = data.filter(obj => parseInt(obj.id) !== id);

  if (newData.length !== data.length) {
    await writeDataToFile(newData);
    return deletedData;
  }

  return;
};

module.exports = {
  createIssue,
  getIssues,
  getIssue,
  updateIssue,
  deleteIssue,
};