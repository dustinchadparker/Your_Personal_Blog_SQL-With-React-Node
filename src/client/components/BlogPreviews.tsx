import * as React from "react";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";

export default class BlogPreviews extends React.Component<
  IBlogPreviewsProps,
  IBlogPreviewsState
> {
  constructor(props: IBlogPreviewsProps) {
    super(props);

    this.state = { blogs: [], title: null, content: null, author: null };
  }

  async componentWillMount() {
    let r = await fetch("/api/blogs");
    let blogs = await r.json();
    this.setState({ blogs });
  }

  showBlogs = () => {
    return (
      <div>
        <h1 className="covalence-blue text-center">My Blog</h1>
        <div className="list-group">
          {this.state.blogs.map(blog => {
            return (
              <section>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{blog.title}</h5>
                  <small>{`${blog._created.slice(
                    0,
                    10
                  )} @ ${blog._created.slice(11, 16)}`}</small>
                </div>
                <p className="mb-1">{blog.content}</p>
              </section>
            );
          })}
        </div>
      </div>
    );
  };
  render() {
    return (
      <main className="container">
        {this.showBlogs()}
        <div className="row mt-4 justify-content-center">
          <h3>Create New Blog Post!</h3>
          <div className="col-md-8">
            <form
              // onSubmit={}
              className="form-group  shadow-lg bg-white border border-primary rounded"
            >
              <label className="ml-1 mb-1 font-weight-bold">Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder={`Enter Name`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ author: e.target.value })
                }
              />
              <label className="ml-1 mb-1 font-weight-bold">Title:</label>
              <input
                type="text"
                className="form-control "
                placeholder={`Enter Title of Blog`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ title: e.target.value })
                }
              />
              <label className="ml-1 mb-1 font-weight-bold">Post:</label>
              <input
                placeholder="Blog goes here"
                className="form-control"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ content: e.target.value })
                }
              />
              <button className="btn btn-info btn-lg shadow-lg mt-2 mb-1">
                Post!
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

interface IBlogPreviewsProps {}

interface IBlogPreviewsState {
  blogs: Array<{ title: string; content: string; _created: string }>;
  title: string;
  author: string;
  content: string;
}
