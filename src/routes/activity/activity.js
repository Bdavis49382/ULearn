import { Router } from 'express';

const router = Router();
 
router.get('/view/:id', async (req, res) => {
    res.render('activity/view', {title: `Activity ${req.params.id}`, id:req.params.id});
})

router.get('/edit/:id', async (req, res) => {
    res.render('/activity/edit', {title: 'Edit Activity', id:req.params.id});
})

export default router;