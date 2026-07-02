import { useState } from "react";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";
import Avatar from "../Common/Avatar";
import "./FeedPost.css";

function FeedPost({ post }) {
  const [liked, setLiked] = useState(false);
  const [reactions, setReactions] = useState(post.reactions);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comments, setComments] = useState([]);
  const [draft, setDraft] = useState("");

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setReactions((prev) => (liked ? prev - 1 : prev + 1));
  };

  const submitComment = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setComments((prev) => [...prev, text]);
    setDraft("");
  };

  return (
    <div className="card feed-post">
      <div className="card-body">
        <div className="feed-post-header">
          <Avatar initials={post.initials} color={post.color} />
          <div>
            <div className="feed-post-author">
              {post.author} <span>created a post</span>
            </div>
            <div className="feed-post-time">{post.timeAgo}</div>
          </div>
        </div>

        <p className="feed-post-message">{post.message}</p>

        <div className="feed-post-celebration">
          <span>HAPPY BIRTHDAY</span>
          <strong>{post.celebrationName}</strong>
        </div>

        <div className="feed-post-actions">
          <button className={liked ? "active" : ""} onClick={toggleLike}>
            <FiThumbsUp /> {liked ? "Liked" : "Like"}
          </button>
          <button onClick={() => setShowCommentBox((s) => !s)}>
            <FiMessageSquare /> Comment
          </button>
          <span className="feed-post-stats">
            {reactions} reactions &bull; {comments.length + post.comments} Comments
          </span>
        </div>

        {comments.length > 0 && (
          <div className="feed-post-comments">
            {comments.map((comment, i) => (
              <div key={i} className="feed-post-comment">
                {comment}
              </div>
            ))}
          </div>
        )}

        {showCommentBox && (
          <form className="feed-post-comment-form" onSubmit={submitComment}>
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit" className="btn">
              Post
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default FeedPost;
