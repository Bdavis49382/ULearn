import { Router } from 'express';
import { getClasses, getClassesForStudent } from '../models/classes/classes.js';
import { getLiveActivitiesForStudent } from '../models/activity/activity.js';
import { getStudentProfile } from '../models/auth/auth.js';

const router = Router();
 
// The home page route
router.get('/', async (req, res) => {
    if (req.session.user) {
        const roleId = req.session.user.role_id;
        console.log(req.session.user);
        switch (Number(roleId)) {
            case 1:
                res.redirect('/student');
                break;
            case 2:
                res.redirect('/teacher');
                break;
            case 3:
                res.redirect('/admin');
                break;
            default:
                res.redirect('/student');
        }
    }
    else {
        res.render('home', { title: 'Home Page' });
    }
});

router.get('/student', async (req, res) => {
    res.locals.requiredPermissions = ['1'];
    const classes = await getClassesForStudent(res.locals.userInfo.id);
    const activities = await getLiveActivitiesForStudent(res.locals.userInfo.id);
    res.render('student/home', { title: 'Student Home', classes, activities});
})
router.get('/student/profile/:id', async (req,res) => {
    res.locals.requiredPermissions = ['1','2','3'];
    const studentInfo = await getStudentProfile(req.params.id);
    console.log(studentInfo);
    res.render('student/profile', { title: 'Student Profile', studentInfo});
})

router.get('/teacher', async (req, res) => {
    res.locals.requiredPermissions = ['2','3'];
    const classes = await getClasses(res.locals.userInfo.id);
    res.render('teacher/home', { title: 'Teacher Home', classes})
})

export default router;