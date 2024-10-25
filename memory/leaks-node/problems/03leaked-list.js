class DBQueryResult {
  constructor(query, data, prev) {
    this.query = query;
    this.data = data;
    this.prev = prev;
  }
}

const databaseConnector = () => {
  const links = {
    prev: null,
  };

  const makeRequest = (q) => {
    const result = new DBQueryResult(q, ["This is DATA!".repeat(300)], links.prev);
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
