const createCommentSerializer = (comment) => {
  const commentSerializer = {};

  commentSerializer["_id"] = comment["_id"];
  commentSerializer["comment"] = comment["comment"];
  commentSerializer["user"] = {};
  commentSerializer["user"]["_id"] = comment["user"]["_id"];
  commentSerializer["user"]["first_name"] = comment["user"]["first_name"];
  commentSerializer["user"]["last_name"] = comment["user"]["last_name"];

  return {
    _id: commentSerializer._id,
    user: commentSerializer.user,
    comment: commentSerializer.comment,
  };
};

module.exports.createCommentSerializer = createCommentSerializer;
