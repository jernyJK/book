export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  // database: {
  //   host: process.env.DATABASE_HOST,
  //   port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  // },
  database: {
    host: process.env.MONGODB_URI,
    options: {
      dbName: process.env.DB_NAME || 'book-service',
      w: 'majority',
      retryWrites: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
})
