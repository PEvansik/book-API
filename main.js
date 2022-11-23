const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 3001

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
]

// generate new note ID
let genId = (item) => {
  let mint = item.map(el => +el.id)
  let rit =  mint.reduce((a, b) => Math.max(a, b), -Infinity);
  return rit + 1;
}

app.get('/', (req, res) => {
    res.send(`<h1>This is a fresh fullstack project</h1>`)
})

app.get('/api/notes', (req, res) => {
    console.log(notes)
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const {id} = req.params;

  let note = notes.find(note => note.id === +id)
  if (note) {
    console.log(note.date)
    res.json(note.date)
  }else {
    // customize  the status message
    res.statusMessage = `${id} out of range`
    res.status(405).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const {id} = req.params;

  let note = notes.filter(n => n.id === +id)

  res.statusMessage = `note ${note.id} has been deleted`
  res.status(204).end()
})



app.post(`/api/notes`, (req, res) => {
  console.log(Array.isArray(notes))
  
  req.body = {
    id: genId(notes),
    content: "Message is of different types",
    date: new Date(),
    important: true
  }

  console.log(Array.isArray(notes))
  // notes = notes.push(req.body)
  console.log(Array.isArray(notes))
  console.log(notes);
  console.log(req.body)
  console.log(Array.isArray(notes))
  res.json(req.body)
})


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})