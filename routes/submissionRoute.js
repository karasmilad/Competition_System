import express from 'express'
import * as submissionController from '../controllers/submissionController.js'

const router = express.Router()

router.get('/',submissionController.getAllSubmission)
router.get('/:id',submissionController.getSubmissionById)
router.post('/',submissionController.createSubmission)

export default router