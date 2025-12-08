# Note-Taking Application API

A RESTful API for managing notes with full CRUD operations using Express.js and MongoDB.

## Features

- Create, Read, Update, and Delete notes
- Input validation for title and content
- Error handling middleware
- MongoDB integration with Mongoose

## API Endpoints

### 1. Create a Note
**POST** `/notes`

Creates a new note with title and content.

**Request Body:**
```json
{
  "title": "My Note Title",
  "content": "This is the content of my note"
}
```

**Response:**
- `201 Created` - Note successfully created
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My Note Title",
  "content": "This is the content of my note"
}
```
- `400 Bad Request` - Missing or empty title/content

### 2. Get All Notes
**GET** `/notes`

Retrieves all notes from the database.

**Response:**
- `200 OK` - List of all notes
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Note 1",
    "content": "Content 1"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Note 2",
    "content": "Content 2"
  }
]
```

### 3. Update a Note
**PUT** `/notes/:id`

Updates an existing note by ID.

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated Content"
}
```

**Response:**
- `200 OK` - Note successfully updated
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Updated Title",
  "content": "Updated Content"
}
```
- `400 Bad Request` - Invalid or empty fields
- `404 Not Found` - Note with specified ID not found

### 4. Delete a Note
**DELETE** `/notes/:id`

Deletes a note by ID.

**Response:**
- `200 OK` - Note successfully deleted
```json
{
  "message": "Note deleted successfully"
}
```
- `404 Not Found` - Note with specified ID not found

## Error Handling

The API implements comprehensive error handling:

- `400 Bad Request` - Validation errors (missing/empty fields)
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Unhandled server errors

## Project Structure

```
note_taking/
├── src/
│   └── api.js              # Main application entry point
├── models/
│   └── note.js             # Mongoose Note model
├── controllers/
│   └── noteController.js   # CRUD operation handlers
├── routes/
│   └── index.js            # API route definitions
├── middleware/
│   └── errorHandler.js     # Error handling middleware
└── README.md               # Documentation
```

## Setup and Installation

1. Install dependencies:
```bash
npm install express mongoose
```

2. Configure MongoDB connection in your application

3. Start the server:
```bash
node src/api.js
```

The server will run on `http://localhost:3000`

## Usage Examples

### Create a Note
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Note","content":"This is my first note"}'
```

### Get All Notes
```bash
curl http://localhost:3000/notes
```

### Update a Note
```bash
curl -X PUT http://localhost:3000/notes/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'
```

### Delete a Note
```bash
curl -X DELETE http://localhost:3000/notes/507f1f77bcf86cd799439011
```

## Validation Rules

- **Title**: Required, non-empty string
- **Content**: Required, non-empty string
- Both fields are validated on create and update operations

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
