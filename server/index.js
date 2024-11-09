const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

let db;

async function connectToDatabase() {
  const uri = "mongodb+srv://spalit:sonali@cluster0.qjrwwps.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

    try {
      await client.connect();
        db = client.db('expenses');
        const collection = await db.collection('userExpenses');
        console.log('Database connection is established');
    } catch (err) {
        console.error('Error establishing connection with database:', err);
        setTimeout(connectToDatabase, 5000);
    }
}

connectToDatabase();

app.use(bodyParser.json());

// CRUD Endpoints

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    console.log("here")
    const expenses = await db.collection('userExpenses').find({}).toArray()

    res.json(expenses);
    console.log(expenses)

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Add new expense
app.post('/api/expenses', async (req, res) => {
  try {
    const newExpense = req.body;

    const insert = await db.collection('userExpenses').insertOne(newExpense);
    console.log('POST, Inserted a new document with id:', insert.insertedId);

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Update an existing expense
app.put('/api/expenses/:id', async (req, res) => {
  try {
    const expenseId = req.params.id;
    const modifiedExpense = req.body;

    const updateResult = await db.collection('userExpenses').updateOne(
      { _id: new mongoose.Types.ObjectId(expenseId)},
      { $set: modifiedExpense}
    );

    if (updateResult.modifiedCount === 1) {
      res.status(200).json({ message: 'Expense was updated successfully' });
    } else {
      res.status(404).json({error: 'Expense cannot be found'});
    }
  } catch (error) {
    console.error('Error updating an expense:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// Delete an existing expense by Id
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const expenseId = req.params.id;

    const deleteResult = await db.collection('userExpenses').deleteOne({ _id: new mongoose.Types.ObjectId(expenseId) });

    if (deleteResult.deletedCount === 1) {
      res.status(200).json({message: 'Expense deleted successfully'});
    } else {
      res.status(404).json({error: 'Expense cannot be found'});
    }
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(express.static('client'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});