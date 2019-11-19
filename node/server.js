const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

let rules = [];
let id = 0;

app.listen(4201, () => console.log('Server listening on port 4201!'));

app.post('/api/rules', (req, res) => {
  id = id + 1;
  let rule = {
    id: id,
    text: req.body.text,
    filtered: req.body.filtered
  };
  rules.push(rule);
  res.send(rule);
});

app.get('/api/rules', (req, res) => {
  res.send(rules);
});

app.put('/api/rules/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let rulesMap = rules.map(rule => {
    return rule.id;
  });
  let index = rulesMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that rule doesn't exist");
    return;
  }
  let rule = rules[index];
  rule.text = req.body.text;
  rule.completed = req.body.completed;
  res.send(rule);
});

app.delete('/api/rules/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = rules.map(rule => {
      return rule.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  rules.splice(removeIndex, 1);
  res.sendStatus(200);
});