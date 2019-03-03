import * as React from "react";
import { Link } from "react-router-dom";
import OneBlog from './OneBlog';

export default class BlogPreviews extends React.Component<
  IBlogPreviewsProps,
  IBlogPreviewsState
> {
  constructor(props: IBlogPreviewsProps) {
    super(props);

    this.state = {
      blogs: [],
      title: null,
      content: null,
      author: null,
      authorid: null,
      id: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    let r = await fetch("/api/blogs");
    let blogs = await r.json();
    this.setState({ blogs });
  }

  async handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    if (this.state.author && this.state.content && this.state.title) {
      let info = {
        id: this.state.id,
        author: this.state.author,
        title: this.state.title,
        content: this.state.content,
        authorid: ""
      };

      e.preventDefault();
      try {
        await fetch(`/api/blogs`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(info)
        });
      } catch (e) {
        console.log(e);
      }
      location.reload();
    } else {
      alert("Requires name, title, and a post content!");
    }
  }

  showBlogs = () => {
    return (
      <div>
        <h1 className="covalence-blue text-center">My Blog</h1>
        <div className="list-group">
          {this.state.blogs.map(blog => {
            return (
              <section>
                <Link to={`/api/blogs/${blog.id}` }>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{blog.title}</h5>
                  <small>{`${blog._created.slice(
                    0,
                    10
                  )} @ ${blog._created.slice(11, 16)}`}</small>
                </div></Link>
                <p className="mb-3">{blog.content}</p>
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
          <div className="col-md-12">
            <form
              onSubmit={this.handleSubmit}
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
  blogs: Array<{
    id: string;
    authorid: string;
    title: string;
    content: string;
    _created: string;
  }>;
  title: string;
  author: string;
  content: string;
  authorid: string;
  id: string;
}
