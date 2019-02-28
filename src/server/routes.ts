import * as express from 'express';
import DB from './db';


const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/blogs', async (req, res) => {
    try {
        let blogs = await DB.Blogs.all();
    res.json(blogs);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }

})

router.get('/api/blogs/:id', async (req, res) => {
    try {
        let blogs = await DB.Blogs.one(req.params.id);
    res.json(blogs);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }

})

// router.get('/', async (req, res) => {
//     try {
//         let blogs = await DB.Blogs.postBlog(req.params.id);
//     res.json(blogs);
//     } catch(e) {
//         console.log(e);
//         res.sendStatus(500);
//     }

// })


export default router;