const NewPostForm = () => {
  return (
    <>
      <form>
        <p>New post</p>
        <div>
          <label>Text Content</label>
          <input type="Text" />
        </div>
        <div>
          <label>Image</label>
          <input type="file" accept=".png,.jpeg,.jpg" />
        </div>
      </form>
    </>
  );
};

export default NewPostForm;
