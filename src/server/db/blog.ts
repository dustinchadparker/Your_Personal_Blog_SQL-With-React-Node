import { Connection } from "./index";

export const all = async () => {
  return new Promise((resolve, reject) => {
    Connection.query("SELECT * from blogs;", (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

export const one = async (id: number) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "select b.id, a.name, b.title, b.content, b.authorid, b._created from authors a join blogs b on b.authorid =  a.id where b.id = ?;",
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const deleteBlog = async (id: number) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "delete from blogs where id = ?;",
      [id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const updateBlog = async (
  id: number,
  content: string
) => {
  return new Promise((resolve, reject) => {


    Connection.query(
      "UPDATE blogs SET content = ? WHERE id = ?;",
      [content, id],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export const postBlogs = async (
  id: string,
  author: string,
  title: string,
  content: string
) => {
  return new Promise((resolve, reject) => {


    Connection.query(
      "call spCheckAuthorExists(?,?,?)",
      [author, content, title],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};

export default {
  all,
  one,
  postBlogs,
  deleteBlog,
  updateBlog
};
