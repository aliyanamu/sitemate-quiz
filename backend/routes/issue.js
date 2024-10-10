const express = require('express');
const {
  createIssue,
  getIssues,
  getIssue,
  updateIssue,
  deleteIssue
} = require('../controllers/issue.controller');

const router = express.Router();

router.post('/create', createIssue);
router.get('/read', getIssues);
router.get('/read/:id', getIssue);
router.put('/update/:id', updateIssue);
router.delete('/delete/:id', deleteIssue);

module.exports = router;