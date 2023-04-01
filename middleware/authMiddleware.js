import admin from '../firebase/index.js'

// This is the middleware function that will be used to verify the token
export default async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = await admin.auth().verifyIdToken(token)
        req.user = decodedToken
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: 'You are not authenticated!',
        })
    }
}
