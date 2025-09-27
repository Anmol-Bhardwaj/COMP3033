const connect = require("connect");
const url = require("url");

const app = connect();

function lab2Handler(req, res) {
  const query = url.parse(req.url, true).query;
  const method = query.method;
  const x = parseFloat(query.x);
  const y = parseFloat(query.y);

  let result;
  let error = null;

  if (method === "add") {
    result = x + y;
  } else if (method === "subtract") {
    result = x - y;
  } else if (method === "multiply") {
    result = x * y;
  } else if (method === "divide") {
    if (y === 0) {
      error = "Division by zero is not allowed";
    } else {
      result = x / y;
    }
  } else {
    error = "Invalid method. Use add, subtract, multiply, or divide.";
  }

  res.setHeader("Content-Type", "application/json");

  if (error) {
    res.end(JSON.stringify({ error: error }));
  } else {
    res.end(
      JSON.stringify({
        x: query.x,
        y: query.y,
        operation: method,
        result: result.toString(),
      })
    );
  }
}

app.use("/lab2", lab2Handler);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
