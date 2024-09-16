# frontend/Dockerfile
FROM node:20.17.0

# Set the working directory to /frontend
WORKDIR /frontend

# Copy over package files and install dependencies
COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && npm install

# Copy all app files to /frontend directory
COPY ./ . 

# Build the production version of the app
RUN npm run build

# Create the logs directory inside public folder and copy log file to it
# This ensures logs are visible and accessible in the frontend
RUN mkdir -p ./public/logs && cp /root/.npm/_logs/*.log ./public/logs/npm-debug.log || echo "Log file not found"

# Serve the application using serve
EXPOSE 80
CMD ["npx", "serve", "-s", "build", "-l", "80"]
