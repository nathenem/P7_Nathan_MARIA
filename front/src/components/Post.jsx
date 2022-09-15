const Post = (props) => {
  return (
    <>
      <div className="forefront">
        <p className="author">@{props.post.author}</p>
        <p className="text">"{props.post.textContent}"</p>
        <p className="image">{props.post.file}</p>
        <p className="date">{props.post.date}</p>
      </div>
    </>
  );
};

export default Post;
