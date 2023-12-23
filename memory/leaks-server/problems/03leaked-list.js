const databaseConnector = () => {
  const links = {
    prev: null,
  };

  const makeRequest = (q) => {
    const result = {
      query: q,
      data: ["Can't say I found anything..."],
      prev: links.prev,
    };
    links.prev = result;
    return result;
  };

  return {
    query: (q) => makeRequest(q),
  };
};

const db = databaseConnector();
module.exports = async function noticeACache(request) {
  const result = db.query(`SELECT * FROM users WHERE id = ${request.id}`);
  return result;
};
