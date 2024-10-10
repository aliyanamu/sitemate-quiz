const {
  createIssue,
  getIssues,
  getIssue,
  updateIssue,
  deleteIssue
} = require('../services/issue.service');

module.exports = {
  createIssue: async (req, res) => {
    try {
      const newIssue = req.body;
      await createIssue(newIssue);
  
      res.status(201).json({ message: 'Issue created', issue: newIssue });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getIssues: async (req, res) => {
    try {
      const data = await getIssues();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  getIssue: async (req, res) => {
    const issueId = parseInt(req.params.id); // Parse the ID as a number
  
    try {
      const issue = await getIssue(issueId);
      res.status(200).json({ issue });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  updateIssue: async (req, res) => {
    const issueId = parseInt(req.params.id); // Parse the ID as a number
    const updatedIssue = req.body;
  
    try {
      const updatedData = await updateIssue(issueId, updatedIssue);
  
      if (updatedData) {
        res.status(200).json({ message: 'Issue updated', issue: updatedIssue });
      } else {
        res.status(404).json({ message: 'Issue not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  deleteIssue: async (req, res) => {
    const issueId = parseInt(req.params.id); // Parse the ID as a number
  
    try {
      const deletedData = await deleteIssue(issueId);

      if (deletedData) {
        res.status(200).json({ message: `Issue with ID ${issueId} deleted` });
      } else {
        res.status(404).json({ message: 'Issue not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};