const dev = process.env.NODE_ENV !== 'production';

// change the deployment string if deploying.

export const server = dev ? 'http://localhost:3000' : 'https://your_deployment.server.com';