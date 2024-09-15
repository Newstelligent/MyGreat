FROM node:20.17.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force && npm install

# Copy the rest of the application files
COPY ./ ./

# Build the frontend
RUN npm run build

# Expose port 80
EXPOSE 80

# Serve the production build
CMD ["npx", "serve", "-s", "build", "-l", "80"]
