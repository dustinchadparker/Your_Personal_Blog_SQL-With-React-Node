import { Connection } from "./index";

export const all = async () => {
    return new Promise((resolve, reject) => {
      Connection.query("SELECT * from blogs", (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  };

  export const one = async (id: number) => {
    return new Promise((resolve, reject) => {
      Connection.query("SELECT * from blogs where id=?", [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  };

  export const postBlogs = async (id: string, title: string, author: string, content: string) => {
    return new Promise((resolve, reject) => {
      Connection.query("call spCheckAuthorExists(?,?,?)", [author, content, title], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  };


export default {
  all,
  one,
  postBlogs
};
