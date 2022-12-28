module.exports = {
    // ... other configuration options
    devServer: {
      proxy: {
        '*': 'http://localhost:8080'
      }
    }
  };