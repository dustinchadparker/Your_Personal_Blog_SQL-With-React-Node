import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import * as React from "react";



export default class OneBlog extends React.Component<
  IOneBlogProps,
  IOneBlogState 
> {
  constructor(props: IOneBlogProps) {
    super(props);

    this.state = {
      blogs: [],
      title: null,
      content: null,
      author: null,
      authorid: null,
      id: null
    };
 
  }

  async componentWillMount() {
    let id = this.state.id;
    console.log(id);
    let r = await fetch(`/api/blogs/${id}`);
    let blogs = await r.json();
    this.setState({ blogs });
 
  }


  render() {
      return(
      <div>
        {console.log(this.state.blogs)}
        HEY
      </div>

      );

    
  }
}

interface IOneBlogProps {
}

interface IOneBlogState {
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
