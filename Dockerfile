# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application for production
RUN npm run build

# Use an official PostgreSQL runtime as the base image for the database
#FROM postgres:14-alpine AS db

# Set environment variables for PostgreSQL
#ENV POSTGRES_DB=classmate_db
#ENV POSTGRES_USER=classmate_user
#ENV POSTGRES_PASSWORD=classmate_password

# Expose the PostgreSQL port
#EXPOSE 5432

# Final stage: Use an official Node.js runtime as a parent image
FROM node:20-alpine AS final

# Set the working directory in the container
WORKDIR /app

# Copy the built application from the build stage
#COPY --from=build /app .

# Copy the database setup from the db stage
#COPY --from=db /var/lib/postgresql/data /var/lib/postgresql/data

# Install serve to serve the built application
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["serve", "-s", "dist"]
