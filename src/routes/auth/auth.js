import { Router } from 'express';

const router = Router();
 
router.get('/login/:id', async (req, res) => {
    res.render('auth/login', {title: 'Login Page', id:req.params.id});
})

router.get('/login', async (req, res) => {
    res.render('auth/role', {title: 'Login Page'});
})

router.get('/register', async (req, res) => {
    res.render('auth/register', {title: 'Register Page'});
})

export default router;