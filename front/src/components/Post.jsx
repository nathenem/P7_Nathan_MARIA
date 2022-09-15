const Post = (props) => {
  return (
    <>
      <div className="post">
        <p>Author's Name</p>
        <p>{props.post.textContent}</p>
        <p>{props.post.file}</p>
        <p>{props.post.date}</p>
      </div>
    </>
  );
};

export default Post;
