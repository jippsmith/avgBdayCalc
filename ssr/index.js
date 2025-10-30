export const handler = async (event, context) => {
  const now = new Date().valueOf();
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: `<div style="height: 40px; width: 30px; background-color: green">
      Hello there! ${now}
    </div>`
  };
};
