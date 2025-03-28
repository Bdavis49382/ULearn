import { Router } from 'express';

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
    res.render('student/home', { title: 'Student Home'});
})
router.get('/student/profile/:id', async (req,res) => {
    res.locals.requiredPermissions = ['1','2','3'];
    res.render('student/profile', { title: 'Student Profile', id: req.params.id});
})

router.get('/teacher', async (req, res) => {
    res.locals.requiredPermissions = ['2','3'];
    res.render('teacher/home', { title: 'Teacher Home'})
})

export default router;