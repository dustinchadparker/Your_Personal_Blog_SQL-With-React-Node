import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import * as React from "react";
import { RouteComponentProps } from "react-router";


export interface IOneBlogProps extends RouteComponentProps<{ id: string; key:string; }> {}

export interface IOneBlogState {
  creation: string;
  blogs: {
    title: string;
    content: string;
    _created: string;
    authorname: string;
    authorid: string,

  };
  
}
 class OneBlog extends React.Component<
  IOneBlogProps,
  IOneBlogState 
> {
  constructor(props: IOneBlogProps) {
    super(props);

    this.state = {
      blogs: {
        content: null,
        title: null,
        _created: null,
        authorname: null,
        authorid: null,
      },
      creation: null,

    };
  }

  async componentDidMount() {
    let id = this.props.match.params.id;
    let r = await fetch(`/api/blogs/${id}`);
    let blogs = await r.json();

    this.setState({ blogs: {
      title: blogs[0].title,
      content: blogs[0].content,
      authorname: blogs[0].name,
      _created: blogs[0]._created,
      authorid: blogs[0].authorid
    }, creation: `${blogs[0]._created.slice(
      0,
      10
    )} @ ${blogs[0]._created.slice(11, 16)}`
  
  });
 
  }

  async handleEdit(e: React.ChangeEvent<HTMLFormElement>) {
    let id = this.props.match.params.id;

    let info = {
      id: id,
      name: this.state.blogs.authorname,
      content: this.state.blogs.content,
      _created: this.state.blogs._created,
      title: this.state.blogs.title,
      authorid: this.state.blogs.authorid,

    };

    e.preventDefault();
    try {
      await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(info)
      });
      this.props.history.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  async handleDelete() {
    let id = this.props.match.params.id;

    try {
      await fetch(`/api/blogs/${id}`, {
        method: "DELETE"
      });
      this.props.history.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  async handleBack() {
    try {
      await 
      this.props.history.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  handleChange(val: string) {
    this.state.blogs.content = val;
  }
  
showBlog = () => {
  return (
    <div>
      <h1 className="covalence-blue text-center">My Blog</h1>
      <div className="list-group">
   
            <section>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{this.state.blogs.title}</h5>
                <small>{`${this.state.creation}`}</small>
              </div>
              <p className="mb-3"><input
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    this.handleChange(e.target.value)
                  }
                  className="form-control"
                  placeholder={this.state.blogs.content}
                  aria-label="namename"
                  aria-describedby="basic-addon1"
                />
              </p>
              <small> By: {this.state.blogs.authorname}</small>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  onClick={this.handleEdit.bind(this)}
                  className="btn btn-info"
                >
                   Save Changes
                </button>
                <button
                  onClick={this.handleDelete.bind(this)}
                  className="btn btn-danger"
                >
                  X<span className="deletetooltip">Delete</span>
                </button>
                <button
                  onClick={this.handleBack.bind(this)}
                  className="btn btn-danger"
                >
                  Go Back
                </button>
                </div>
            </section>
        
        
      </div>
    </div>
  );
}

  render() {
      return(
      <div>
                 
        {this.showBlog()}
        
      </div>

      );

    
  }
}

export default OneBlog;