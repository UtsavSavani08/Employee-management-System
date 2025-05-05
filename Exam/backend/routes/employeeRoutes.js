const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getEmployees, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee, 
    getEmployeeById 
} = require('../controllers/employeeController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.use(protect);
router.route('/').get(getEmployees).post(upload.single('profilePic'), createEmployee);
router.route('/:id')
    .get(getEmployeeById)
    .put(upload.single('profilePic'), updateEmployee)
    .delete(deleteEmployee);

module.exports = router;