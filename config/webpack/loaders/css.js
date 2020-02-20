module.exports = {
  test: /\.css$/,
  use: [
    {
      loader: 'vue-style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        modules: {
	        localIdentName: "[name]__[local]___[hash:base64:5]",
	      },
      }
    }
  ]
}