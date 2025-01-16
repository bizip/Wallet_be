
import admin from "firebase-admin";
import Response from "../../helper/Response/Response";
export default class budjetController {

// Routes for transactions
static async newBadet(req, res) {try {
    const { category, amount, period } = req.body;
    const db = admin.firestore();
    const userId = req.user.uid;
    
    const budget = {
      userId,
      category,
      amount: parseFloat(amount),
      period, // 'monthly', 'weekly', etc.
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('budgets').add(budget);
    res.status(201).json({ id: docRef.id, ...budget });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
}