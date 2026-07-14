import express from 'express'
import {
  getAllStudents,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent
} from '../Controller/studentController.js'

const router = express.Router()

router.get('/', getAllStudents)
router.post('/', createStudent)
router.get('/:id', getStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)

export default router