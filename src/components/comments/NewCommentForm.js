import { useRef, useEffect } from "react";
import { addComment } from "../../libs/api";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);
  const { onAddedComment } = props;

  useEffect(() => {
    if (!error && status === "completed") {
      onAddedComment();
    }
  }, [error, onAddedComment, status]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const { value } = commentTextRef.current;
    if (value.trim().length !== 0) {
      sendRequest({ commentData: { text: value }, quoteId: props.quoteId });
    }
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && <LoadingSpinner />}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;