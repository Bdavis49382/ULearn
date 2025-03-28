import { Router } from 'express';
import { addCode, getCodes, getRoles } from '../../models/codes/codes.js';
import { getUsers } from '../../models/organization/organization.js';

const router = Router();
 
router.get('/', async (req, res) => {
    const organization_id = req.session.user?.organization_id || 0;
    
    const codes = await getCodes(organization_id);
    const users = await getUsers(organization_id);
    const roles = await getRoles();
    
    console.log(users);
    res.locals.requiredPermissions = ['3'];
    res.render('admin/home', { title: 'Admin Home', codes, users, roles, organization_id})
})

router.get('/addCode/:orgId/:roleId', async (req, res) => {
    console.log(await addCode(req.params.roleId, req.params.orgId));
    req.flash('success','Successfully created code.')
    res.redirect('/admin/');
})

export default router;