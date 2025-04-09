import express from "express";
import bodyParser from "body-parser";
import { str10_36 } from "hyperdyperid/lib/str10_36.js";
import DOMPurify from "isomorphic-dompurify";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function addLineBreaks(textToLineBreak) {
  const purifiedText = DOMPurify.sanitize(textToLineBreak);

  return purifiedText.replace(/\r\n|\r|\n/g, "<br>");
}

function Post(title, content, date, id) {
  this.title = title;
  this.content = addLineBreaks(content);
  this.date = date;
  this.id = id;
}

function getCurrentDate() {
  const date = new Date();

  return `${date.getDay()} ${date.getMonth()} ${date.getFullYear()}`;
}

var posts = [];
var currentSelectedPost = 0;

var isEditingPost = false;
var postToEdit;

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts, currentSelectedPost: currentSelectedPost, isEditingPost: isEditingPost, postToEdit: postToEdit });
});

app.post("/submit-post", (req, res) => {
  if (isEditingPost) {
    const editedPost = new Post(req.body["title"], req.body["content"], postToEdit.date, postToEdit.id);
    posts[posts.findIndex((post) => post.id === postToEdit.id)] = editedPost;

    isEditingPost = false;
    postToEdit = null;
  } else {
    posts.push(new Post(req.body["title"], req.body["content"], getCurrentDate(), str10_36()));
  }

  res.redirect("/");
});

app.post("/see-post", (req, res) => {
  currentSelectedPost = posts.findIndex((post) => post.id === req.body["postId"]);

  res.redirect("/");
});

app.post("/edit-post", (req, res) => {
  isEditingPost = true;
  postToEdit = posts.find((post) => post.id === req.body["postId"]);

  res.redirect("/");
});

app.post("/cancel-edit-post", (req, res) => {
  isEditingPost = false;
  postToEdit = null;

  res.redirect("/");
});

app.post("/delete-post", (req, res) => {
  const postIndex = posts.findIndex((post) => post.id === req.body["postId"]);
  posts.splice(postIndex, 1);

  currentSelectedPost = 0;

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
