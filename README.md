# react-ssr-boilerplate
A React app completed with server-side rendering, express, react router, and styled-components.

### Requirements ###
Node 8.10+
React development knowhow
Styled-Components (optional, but IMHO this is by far the best CSS implementation for React)

### Concepts ###
This implementation uses a static html file as the basis for building client-side js using webpack. Along with that, prepare a webpack configs for server-side rendering, then append rendered html tags, scripts, and styles in it, and serve the file using express. Since webpage is server-side rendered, I used dynamic JS loading in Webpack.

Regarding data store, This project only uses a React component as a container to simplify logic. This is ideal for smaller project where Redux may not be necessary.

