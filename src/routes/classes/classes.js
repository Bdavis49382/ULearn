import { Router } from 'express';
import { createClass, createCourse, enrollStudent, getAllClasses, getClassesForStudent, getCourses, getStudentsInClass, unenrollStudent } from '../../models/classes/classes.js';

const router = Router();
 
router.get('/view/:id', async (req, res) => {
    res.locals.requiredPermissions = ['1'];
    res.render('classes/view', {title: `Course ${req.params.id}`, id:req.params.id});
})

router.get('/add', async (req, res) => {
    res.locals.requiredPermissions = ['1'];
    const classes = await getAllClasses(res.locals.userInfo.organization_id);
    const studentClasses = await getClassesForStudent(res.locals.userInfo.id);
    res.render('classes/add', {title: "Add Classes", classes, studentClasses});
})

router.post('/add', async (req, res) => {
    const {class_id, drop_id} = req.body;
    // if there is a drop id, use it, if there is a class id use it.
    if (class_id != undefined) {
        await enrollStudent(class_id,res.locals.userInfo.id);
    }

    if (drop_id != undefined) {
        await unenrollStudent(drop_id, res.locals.userInfo.id);
    }
    res.redirect('/class/add');
})

router.get('/dashboard/:id', async (req, res) => {
    res.locals.requiredPermissions = ['2','3'];
    const students = await getStudentsInClass(req.params.id);
    res.render('classes/dashboard', {title: "Class Dashboard", students});
})

router.get('/createCourse', async (req,res) => {
    res.locals.requiredPermissions = ['2','3'];
    res.render('classes/createCourse', {title: "Create Course"})
})

router.post('/createCourse', async (req, res) => {
    const {name,description} = req.body;
    await createCourse(name, description, res.locals.userInfo.organization_id);
    res.redirect('/teacher')
})

router.get('/createClass', async (req, res) => {
    res.locals.requiredPermissions = ['2','3'];
    const courses = await getCourses(res.locals.userInfo.organization_id);
    res.render('classes/createClass', {title: 'Create Class', courses})
})

router.post('/createClass', async (req, res) => {
    const {course, name, meeting_time} = req.body;
    await createClass(course, name, meeting_time, res.locals.userInfo.id);
    res.redirect('/teacher');
})

export default router;