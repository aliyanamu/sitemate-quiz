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
router.get('/', getIssues);
router.get('/:id', getIssue);
router.put('/update/:id', updateIssue);
router.delete('/delete/:id', deleteIssue);

module.exports = router;