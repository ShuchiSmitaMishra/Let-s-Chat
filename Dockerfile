# Use an official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port on which your app will run (adjust as needed)
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]