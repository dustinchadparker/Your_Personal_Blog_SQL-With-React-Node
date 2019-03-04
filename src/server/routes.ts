import * as express from "express";
import DB from "./db";

const router = express.Router();


router.get("/api/blogs", async (req, res) => {
  try {
    let blogs = await DB.Blogs.all();
    res.json(blogs);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/api/blogs/:id", async (req, res) => {
  try {
    let blogs = await DB.Blogs.one(req.params.id);
    res.json(blogs);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete("/api/blogs/:id", async (req, res) => {
  try {
    let blogs = await DB.Blogs.deleteBlog(req.params.id);
    res.json(blogs);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/api/blogs/:id", async (req, res, next) => {
  let id = req.params.id;
  let bloginfo = req.body;

  try {
    res.json(await DB.Blogs.updateBlog(id, bloginfo.content));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
 
  res.sendStatus(200);
});

router.post(`/api/blogs`, async (req, res, next) => {
  let info = req.body;
  let id = req.params.id;
  
  try {
    let blogs = await DB.Blogs.postBlogs(id, info.author, info.title, info.content)
    res.json(blogs);
  
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});


export default router;
