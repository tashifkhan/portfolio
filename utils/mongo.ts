import { MongoClient } from 'mongodb'

declare global {
   var _mongoClientPromise: Promise<MongoClient> | undefined
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const options = {
   connectTimeoutMS: 5000,
   socketTimeoutMS: 5000,
   serverSelectionTimeoutMS: 5000,
   retryWrites: true,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
   if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
   }
   clientPromise = global._mongoClientPromise
} else {
   client = new MongoClient(uri, options)
   clientPromise = client.connect()
}

export default clientPromise