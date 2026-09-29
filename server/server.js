import express from "express";

const children = [
  {
    id: 1,
    name: "Emma",
  },
  {
    id: 2,
    name: "Evelyn",
  },
];

const app = express();

// Middleware
app.use(express.json());

// READ
app.get("/api/children", (req, res) => {
  res.json(children);
});

//CREATE
app.post("/api/children", (req, res) => {
  const newChild = req.body;

  children.push(newChild);

  res.json(newChild);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
