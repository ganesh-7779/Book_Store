const redis = require("redis");
const client = redis.createClient();
class Redis {
  /**
   * @description function written to provide data to user in minimal time using caching
   * @param {*} req valid request is expected
   * @param {*} res if user post this req for secound time then res should be redis data for user
   * @param {*} if there is no redisdata function calls for next function
   */
  redis = (req, res, next) => {
    client.get("getAllBook", (err, redisdata) => {
      if (err) {
        throw err;
      } else if (redisdata) {
        res.send({ redisData: JSON.parse(redisdata) });
      } else {
        next();
      }
    });
  };
  /**
   * @description function written to provide data to user in minimal time using caching
   * @param {*} req valid request is expected
   * @param {*} res if user post this req more than one time with same book id then res should be redis data for user
   * @param {*} if there is no redisdata function calls for next function
   */
  redisById = (req, res, next) => {
    const bookId = req.params.Id;
    console.log(bookId);
    client.get(bookId, (err, redisdata) => {
      if (err) {
        throw err;
      } else if (redisdata) {
        res.send({ redisData: JSON.parse(redisdata) });
      } else {
        next();
      }
    });
  };

  /**
   * @description clearing cache
   */
  clearCache = () => {
    client.flushall();
    console.log("Cache is cleared!");
  };
}
module.exports = new Redis();
