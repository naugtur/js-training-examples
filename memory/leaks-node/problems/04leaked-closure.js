const databaseConnector = () => {
  let nextCallback;
  let called = true;

  const query = (q, callback) => {
    const result = {
      query: q,
      data: ["Can't say I found anything..."],
    };

    // This is some weird logic for managing callbacks that 
    // we don't even call, but it emulates well the shenanigans 
    // you may see in homegrown asynchronous flow management contraptions
    const prev = nextCallback;
    nextCallback = function () {
      if (called) {
        called = false;
      } else {
        prev();
      }
      callback();
      called = true;
    };

    return result;
  };

  return {
    query,
  };
};

const db = databaseConnector();
module.exports = async function contextLeaking(request) {
  const result = db.query(
    `SELECT * FROM users WHERE id = ${request.id}`,
    function uselessCallback() {
      console.log("callback called");
    }
  );
  return result;
};
