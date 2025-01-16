import admin from "firebase-admin";
import Response from "../../helper/Response/Response";
export default class AuthController {
    static signUp = async (req, res) => {
        const {
            gender,
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
        } = req.body;
        const db = admin.firestore();
        try {
            const userRecord = await admin.auth().createUser({
                email,
                password,
                displayName: `${firstName} ${lastName}`,
                phoneNumber,
            });

            // Store additional user details in Firestore
            await db.collection('users').doc(userRecord.uid).set({
                gender,
                firstName,
                lastName,
                phoneNumber,
                email,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });
            const data = { message: 'User created successfully' };
            return Response.success(res, 200, data);
        } catch (error) {
            console.log(error);
            const err = { message: error.message || 'Something went wrong' };
            return Response.error(res, 500, err);
        }
    }
}