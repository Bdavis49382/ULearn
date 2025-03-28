import { Router } from 'express';
import { login, register } from '../../models/auth/auth.js';

const router = Router();
 

router.get('/login', async (req, res) => {
    res.render('auth/login', {title: 'Login Page'});
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await login(email, password);
    if (user != null) {
        req.session.user = user;
        req.flash('success','Successfully logged in.');
        res.redirect('/');
    }
    else {
        console.log('incorrect username/password');
        req.flash('error', 'Login unsuccessful. Check your username and password and try again, or create account.');
        res.redirect('/auth/login');
    }
})

router.get('/register', async (req, res) => {
    res.render('auth/register', {title: 'Register Page'});
})

router.post('/register', async (req, res) => {
    try {
        const {accountCode, givenNames, lastName, email, password} = req.body;
        const {role_id, organization_id} = await register(accountCode, givenNames, lastName, email, password);
        req.session.user = {given_names: givenNames, last_name: lastName, role_id, organization_id};
        req.flash('success', 'account created and logged in.');
        res.redirect('/');
    } catch (error) {
        req.flash('error','account creation failed');
        res.redirect('/auth/register');
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

export default router;