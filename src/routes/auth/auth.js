import { Router } from 'express';
import { login, register } from '../../models/auth/auth.js';
import { registrationValidation } from '../../middleware/validation.js';
import { validationResult } from 'express-validator';

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

router.post('/register', registrationValidation, async (req, res) => {
    // Check if there are any validation errors
    const results = validationResult(req);
    if (results.errors.length > 0) {
        results.errors.forEach((error) => {
        req.flash("error", error.msg);
        });
        res.redirect("/auth/register");
        return;
    }

    try {
        const {accountCode, givenNames, lastName, email, password} = req.body;
        await register(accountCode, givenNames, lastName, email, password);
        req.flash('success', 'account created.');
        res.redirect('/auth/login');
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