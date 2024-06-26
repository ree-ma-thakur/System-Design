import express from "express";
import bodyParser from "body-parser";

const app = express();

// used bodyparser as middleware
app.use(bodyParser.json());

// all is for any type of request
app.all("/", (req, res) => {
  console.log("Request > ", req);
  console.log("Response >", res);
  res.send(`I'm up!`);
});

const todos = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    completed: true,
  },
];

// CRUD Operations
// READ
app.get("/todos", (req, res) => {
  res.json(todos);
});

// CREATE
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.json({
    message: "New Todo Added!",
  });
});

// UPDATE
app.put("/todos/:id", (req, res) => {
  const newTodoData = req.body;
  const todoParamId = req.params.id;
  const todoIndex = todos.findIndex((td) => td.id === todoParamId);

  if (todoIndex !== -1) {
    todos[todoIndex] = {
      id: todoParamId,
      ...newTodoData,
    };
    res.json({
      message: "Todo updated successfully!",
    });
  } else {
    res.json({
      message: "Todo Id does not exist!",
    });
  }
});

// DELETE
app.delete("/todos/:id", (req, res) => {
  const todoParamId = req.params.id;
  const todoIndex = todos.findIndex((td) => td.id === todoParamId);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
  }

  res.json({
    message: "Todo deleted successfully!",
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
