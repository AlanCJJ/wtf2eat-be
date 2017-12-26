module.exports = {
  // Secret key for JWT signing and encryption
  secret: process.env.JWT_SECRET_KEY || 'super secret passphrase',
  // Database connection information
  database: process.env.DB_HOST || 'mongodb://localhost:27017',
  // Setting port for server
  port: process.env.PORT || 3000,
  // necessary in order to run tests in parallel of the main app
  test_port: 3001,
  test_db: 'mern-starter-test',
  test_env: 'test'
};
