module.exports = {
  // Other webpack configurations...
  module: {
    rules: [
      // Other rules...
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          attributes: {
            list: [
              {
                tag: "video",
                attribute: "src",
                type: "src",
              },
            ],
          },
        },
      },
      {
        test: /\.mp4$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "video/mp4",
          name: "[name].[ext]", // You can customize the output file name if needed
        },
      },
    ],
  },
};
