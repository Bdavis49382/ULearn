import { Router } from 'express';
import { completeActivity, createActivity, getActivity, getActivityProgress, getEnrollment, startActivity, updateActivity, updateActivityProgress } from '../../models/activity/activity.js';

const router = Router();
 
router.get('/view/:id', async (req, res) => {
    res.locals.requiredPermissions = ['1','2','3'];
    const activity = await getActivity(req.params.id);
    res.render('activity/view', {title: `Activity ${req.params.id}`, activity:activity[0], sectionId:-1});
})

router.get('/view/:id/:sectionId', async (req, res) => {
    res.locals.requiredPermissions = ['1','2','3'];
    const activity = await getActivity(req.params.id);
    const enrollment_data = await getEnrollment(res.locals.userInfo.id, req.params.id);
    if (enrollment_data != undefined && enrollment_data.length > 0) {
        const enrollment_id = enrollment_data[0].id;
        const activityProgress = await getActivityProgress(enrollment_id, req.params.id);
        if (activityProgress.length == 0) {
            await startActivity(enrollment_id, req.params.id);
        }
    }
    else {
        console.log(`User ${res.locals.userInfo.id} is not registered for the class with this activity. Not tracking progress.`)
    }
    res.render('activity/view', {title: `Activity ${req.params.id}: Section ${req.params.sectionId}`, activity: activity[0], sectionId:req.params.sectionId});
})

router.post('/view/:id/:sectionId', async (req, res) => {
    const enrollment_data = await getEnrollment(res.locals.userInfo.id, req.params.id);
    console.log(enrollment_data);
    if (enrollment_data != undefined && enrollment_data.length > 0) {
        const enrollment_id = enrollment_data[0].id;
        const activity = await getActivity(req.params.id);
        if (activity[0].details.sections.length - 1 <= req.params.sectionId) {
            await completeActivity(enrollment_id, req.params.id);
        }

        const activityProgress = await getActivityProgress(enrollment_id, req.params.id);
        activityProgress[0].details.answers[req.params.sectionId] = req.body.answer;
        await updateActivityProgress(enrollment_id, req.params.id, activityProgress[0].details)
    }
    res.redirect(`/activity/view/${req.params.id}/${Number(req.params.sectionId) + 1}`)
})

router.get('/edit/:id', async (req, res) => {
    res.locals.requiredPermissions = ['2','3'];
    const activity = await getActivity(req.params.id);
    res.render('/activity/edit', {title: 'Edit Activity', activity: activity[0], sectionId: 0});
})

router.post('/edit/:id', async (req, res) => {
    await updateActivity(req.params.id, req.body);
    res.redirect('/activity/edit/' + req.params.id)
})

router.get('/edit/:id/:sectionId', async (req, res) => {
    res.locals.requiredPermissions = ['2','3'];
    const activity = await getActivity(req.params.id);
    res.render('activity/edit', {title: `Activity ${req.params.id}: Section ${req.params.sectionId}`, id:req.params.id, sectionId:req.params.sectionId});
})

router.get('/create/:course_id', async (req, res) => {
    res.locals.requiredPermissions = ['2','3'];
    res.render('activity/create', {title: 'Create Activity', course_id: req.params.course_id})
});

router.post('/create/:course_id', async (req, res) => {
    const {name, description} = req.body;
    await createActivity(name, req.params.course_id, {"type":"unknown","sections":[]}, 0, description);
    res.redirect('/')
})
export default router;