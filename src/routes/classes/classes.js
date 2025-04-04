import { Router } from 'express';
import { createClass, createCourse, enrollStudent, getAllClasses, getClassesForStudent, getCourses, getStudentsInClass, unenrollStudent, getClass } from '../../models/classes/classes.js';
import { getActivities, getActivityProgress, getEnrollment } from '../../models/activity/activity.js';

const router = Router();
 
router.get('/view/:id', async (req, res) => {
    res.locals.requiredPermissions = ['1'];
    let activities = await getActivities(req.params.id);
    const classInfo = await getClass(req.params.id);
    activities = await Promise.all(activities.map(async activity => {
        const enrollment_data = await getEnrollment(res.locals.userInfo.id, activity.id);
        if (enrollment_data != undefined && enrollment_data.length > 0) {
            const enrollment_id = enrollment_data[0].id;
            const activityProgress = await getActivityProgress(enrollment_id, activity.id);
            if (activityProgress.length == 0) {
                return {...activity, graded:false,completed:false};
            }
            return {...activity, graded:activityProgress[0].graded, completed:activityProgress[0].completed};
        }
        else {
            console.log(`User ${res.locals.userInfo.id} is not registered for the class with this activity. Not tracking progress.`)
        }
    }))
    console.log(activities)
    res.render('classes/view', {title: `Course ${req.params.id}`, activities, classInfo:classInfo[0]});
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
    const course = (await getClass(req.params.id))[0];
    const activities = await getActivities(req.params.id);
    res.render('classes/dashboard', {title: "Class Dashboard", students, course, activities});
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