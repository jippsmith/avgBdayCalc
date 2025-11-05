import API from "lambda-api";
import calcluateAverage from "./calculateAverage";

function addCORS(_, res, next) {
  res.cors();
  next();
}

const api = API();

api.use(addCORS);
api.options("*", async (req, res) => {
  if (req.headers.origin !== "http://localhost:5173") return res.status(500).send(); // (or deployed version)
  res.status(200).send();
});

api.post("/average", async (req, res) => {
  const { birthdays } = req?.body || {};
  try {
    const result = calcluateAverage({ birthdays });
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
});
export const handler = async (event, context) => await api.run(event, context);
