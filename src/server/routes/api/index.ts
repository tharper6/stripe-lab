import * as express from 'express';
import * as passport from 'passport';

import blogsRouter from './blogs';
import blogtagsRouter from './blogtag'
import tagsRouter from './tags'
import donateRouter from './donate'

const router = express.Router();

router.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if(user) req.user = user;
        return next();
    })(req, res, next);
});

router.use('/blogs', blogsRouter);
router.use('/blogtag', blogtagsRouter);
router.use('/tags', tagsRouter);
router.use('/donate', donateRouter);

export default router;