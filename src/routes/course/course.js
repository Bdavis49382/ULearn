import { Router } from 'express';

const router = Router();
 
router.get('/view/:id', async (req, res) => {
    res.render('course/view', {title: `Course ${req.params.id}`, id:req.params.id});
})

router.get('/add', async (req, res) => {
    res.render('course/add', {title: "Add Courses"});
})

router.get('/dashboard/:id', async (req, res) => {
    res.render('course/dashboard', {title: "Couse Dashboard"});
})

export default router;