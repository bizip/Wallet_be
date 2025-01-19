import admin from "firebase-admin";
import Response from "../../helper/Response/Response";
export default class TransactionController {

// Routes for transactions
static async newTransactions(req, res) {
    try {
        const db = admin.firestore();
      const { amount, type, category, subcategory, account, description, date } = req.body;
      const userId = req.user.uid;
      const transaction = {
        amount: parseFloat(amount),
        type, // 'income' or 'expense'
        category,
        subcategory,
        account,
        description,
        date: new Date(date),
        userId,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      const docRef = await db.collection('transactions').add(transaction);
      
      // Update account balance
      const accountRef = db.collection('accounts').doc(`${userId}_${account}`);
      await db.runTransaction(async (t) => {
        const doc = await t.get(accountRef);
        const currentBalance = doc.exists ? doc.data().balance : 0;
        const newBalance = type === 'income' ? 
          currentBalance + transaction.amount : 
          currentBalance - transaction.amount;
        
        t.set(accountRef, { balance: newBalance }, { merge: true });
      });
      
      Response.success(res, 201, { id: docRef.id, ...transaction });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get transactions with filtering and summary
  static async getAllTransaction(req, res) {
    const db = admin.firestore();
    try {
      const userId = req.user.uid;
      const { startDate, endDate, category, account } = req.query;
      
      let query = db.collection('transactions')
        .where('userId', '==', userId)
        .orderBy('date', 'desc');
      
      if (startDate) {
        query = query.where('date', '>=', new Date(startDate));
      }
      if (endDate) {
        query = query.where('date', '<=', new Date(endDate));
      }
      if (category) {
        query = query.where('category', '==', category);
      }
      if (account) {
        query = query.where('account', '==', account);
      }
      
      const snapshot = await query.get();
      const transactions = [];
      let summary = { income: 0, expense: 0 };

      snapshot.forEach(doc => {
        const transaction = doc.data();
        transactions.push({ id: doc.id, ...transaction });
        if (transaction.type === 'income') {
          summary.income += transaction.amount;
        } else if (transaction.type === 'expense') {
          summary.expense += transaction.amount;
        }
      });
      
      Response.success(res, 200, { transactions, summary });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get transaction summary
 
  }