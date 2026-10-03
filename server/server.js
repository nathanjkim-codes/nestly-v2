import express from "express";
import cors from "cors";

let children = [
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
app.use(cors());
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

//UPDATE
app.put("/api/children/:id", (req, res) => {
  let updatedChild;
  const childId = Number(req.params.id);
  const updatedData = req.body;
  const updatedChildren = children.map((child) => {
    if (childId === child.id) {
      updatedChild = {
        ...child,
        ...updatedData,
      };
      return updatedChild;
    }
    return child;
  });
  children = updatedChildren;
  res.json(updatedChild);
});

//DELETE
app.delete("/api/children/:id", (req, res) => {
  const childId = Number(req.params.id);

  const updatedChildren = children.filter((child) => {
    return childId !== child.id;
  });
  children = updatedChildren;
  res.sendStatus(204);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
