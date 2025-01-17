const express = require('express');
const { addDependency, getUserTasks, deleteTask, getTasksAssigned, getTaskByProjectId, getTasksByManagerProject, updateTask, createTask, getTaskById, getAllTasks, getTasksByUser } = require('../controllers/taskController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

router.get('/manager-project-tasks', authMiddleware(['admin', 'manager']), getTasksByManagerProject);
router.get('/assigned', authMiddleware(['admin','manager','user']), getTasksAssigned);
router.get('/user-tasks', authMiddleware(['user']), getUserTasks);
router.get('/', authMiddleware(['admin','manager']), getAllTasks);
router.get('/:id', authMiddleware(['admin','manager','user']), getTaskById);
router.get('/project/:projectId', authMiddleware(['admin']), getTaskByProjectId);
router.post('/', authMiddleware(['admin','manager']),  upload.single('attachment'), createTask);
router.put('/:id', authMiddleware(['admin','manager','user']), updateTask);
router.delete('/:id', authMiddleware(['admin','manager']), deleteTask);
router.put('/:id/addDependency', authMiddleware(['admin','manager']), addDependency);
// router.post('/:id/upload', uploadAttachment);

// router.post('/', authMiddleware(['admin', 'manager']), upload.single('attachment'), async (req, res) => {
//     try {
//       const { title, description, priority, assignedTo, projectId, dueDate, status } = req.body;
  
//       const newTask = new Task({
//         title,
//         description,
//         priority,
//         assignedTo,
//         projectId,
//         dueDate,
//         status,
//         attachment: req.file
//           ? {
//               filename: req.file.originalname,
//               filepath: req.file.path,
//             }
//           : null,
//       });
  
//       await newTask.save();
//       res.status(201).json(newTask);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
module.exports = router;