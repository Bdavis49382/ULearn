import { Router } from 'express';

const router = Router();
 
router.get('/view/:id', async (req, res) => {
    res.render('activity/view', {title: `Activity ${req.params.id}`, id:req.params.id, sectionId:0});
})

router.get('/view/:id/:sectionId', async (req, res) => {
    res.render('activity/view', {title: `Activity ${req.params.id}: Section ${req.params.sectionId}`, id:req.params.id, sectionId:req.params.sectionId});
})

router.get('/edit/:id', async (req, res) => {
    res.render('/activity/edit', {title: 'Edit Activity', id:req.params.id, sectionId: 0});
})

router.get('/edit/:id/:sectionId', async (req, res) => {
    res.render('activity/edit', {title: `Activity ${req.params.id}: Section ${req.params.sectionId}`, id:req.params.id, sectionId:req.params.sectionId});
})
export default router;