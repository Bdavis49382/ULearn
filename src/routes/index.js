import { Router } from 'express';

const router = Router();
 
// The home page route
router.get('/', async (req, res) => {
    res.render('home', { title: 'Home Page' });
});

router.get('/student', async (req, res) => {
    res.render('student/home', { title: 'Student Home'})
})

router.get('/teacher', async (req, res) => {
    res.render('teacher/home', { title: 'Teacher Home'})
})

router.get('/admin', async (req, res) => {
    res.render('admin/home', { title: 'Admin Home'})
})

export default router;