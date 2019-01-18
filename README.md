# react-ssr-boilerplate
A React app completed with server-side rendering, express, react router, and styled-components.

### Requirements ###
- Node 8.10+
- React development knowhow
- Styled-Components (optional, by far the best CSS implementation for React IMHO)

### Concepts ###
This implementation uses a static html file as the basis for building client-side js using Webpack. A pair of server/client Webpack configs not just render standalone app for the client, also serves rendered HTML with Express.

This project only uses a React component as a container to simplify data store logic, and is ideal for smaller project where Redux is not needed.

