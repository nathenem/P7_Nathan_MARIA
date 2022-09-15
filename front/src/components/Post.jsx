const Post = (props) => {
  return (
    <>
      <div>
        <p>{props.post.author}</p>
        <p>{props.post.textContent}</p>
        <p>{props.post.file}</p>
        <p>{props.post.date}</p>
      </div>
    </>
  );
};

export default Post;
