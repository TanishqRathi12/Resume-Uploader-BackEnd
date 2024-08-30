const {Router} = require('express');
const resumeController = require('../Handler/resume.controller');
const verifyToken = require('../middleware/auth.middle');

const resumeRouter = Router();

resumeRouter.post('/upload',resumeController.uploadResume);

module.exports = resumeRouter;