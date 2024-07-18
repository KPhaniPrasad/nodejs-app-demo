# Use official Node.js image from Docker Hub
FROM node

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to /app
COPY package.json .

# Install dependencies
RUN npm install
RUN npm install mysql@latest

# Copy the rest of the application code to /app
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]
