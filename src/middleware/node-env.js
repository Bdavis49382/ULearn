import { getNav } from '../utils/index.js';

const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || 'production';

const configureNodeEnvironment = async (req, res, next) => {
    res.locals.isDevMode = mode.includes('dev');
    res.locals.navHTML = await getNav(req.session.user != undefined);
    res.locals.port = port;
    res.locals.scripts = [];
    res.locals.styles = [];
    res.locals.userInfo = req.session.user;
    res.locals.requiredPermissions = [undefined];
    // Add things only needed in development mode
    if (res.locals.isDevMode) {
        // Add livereload script to the page
        res.locals.scripts.push(`
            <script>
                const ws = new WebSocket('ws://127.0.0.1:${parseInt(port) + 1}');
                ws.onclose = () => {
                    setTimeout(() => location.reload(), 2000);
                };
            </script>    
        `);
    }

    next();
};

export default configureNodeEnvironment;