import studentModel from '../models/studentModel.js'

// GET All Students
export const getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.find()
    res.status(200).json({ success: true, students })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// POST Create Student
export const createStudent = async (req, res) => {
  try {
    const student = new studentModel(req.body)
    await student.save()
    res.status(201).json({ success: true, student })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// GET Single Student
export const getStudent = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id)
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student Not Found' })
    }
    res.status(200).json({ success: true, student })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// PUT Update Student
export const updateStudent = async (req, res) => {
  try {
    const student = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student Not Found' })
    }
    res.status(200).json({ success: true, student })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// DELETE Student
export const deleteStudent = async (req, res) => {
  try {
    const student = await studentModel.findByIdAndDelete(req.params.id)
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student Not Found' })
    }
    res.status(200).json({ success: true, message: 'Student Deleted!' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}