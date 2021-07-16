const createCriticismSerializer = (criticism) => {
  const criticismSerializer = {};

  criticismSerializer["_id"] = criticism["_id"];
  criticismSerializer["stars"] = criticism["stars"];
  criticismSerializer["review"] = criticism["review"];
  criticismSerializer["spoilers"] = criticism["spoilers"];
  criticismSerializer["critic"] = {};
  criticismSerializer["critic"]["_id"] = criticism["user"]["_id"];
  criticismSerializer["critic"]["first_name"] = criticism["user"]["first_name"];
  criticismSerializer["critic"]["last_name"] = criticism["user"]["last_name"];

  return {
    _id: criticismSerializer._id,
    critic: criticismSerializer.critic,
    stars: criticismSerializer.stars,
    review: criticismSerializer.review,
    spoilers: criticismSerializer.spoilers,
  };
};

module.exports.createCriticismSerializer = createCriticismSerializer;
