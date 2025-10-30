import API from "lambda-api";
import calcluateAverage from "./calculateAverage";
// import makeBaseAPI from "lambda-api";

// function addCORS(_, res, next) {
//   res.cors();
//   next();
// }

const api = API();
// const api = makeBaseAPI({
//   version: "v2.0",
//   errorHeaderWhitelist: ["access-control-allow-origin", "access-control-allow-methods", "access-control-allow-headers"]
// });

// api.use(addCORS);

api.post("/average", async (req, res) => {
  const { birthdays } = req?.body || {};
  console.log({ birthdays });
  try {
    const result = calcluateAverage();
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
});
export const handler = async (event, context) => await api.run(event, context);
