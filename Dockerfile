### STAGE 1: Compile and build angular codebase ###

# Use official node image as the base image
FROM node:16.20.2 AS build
# Set the working directory
WORKDIR /usr/local/app
# Add the source code to app
COPY . .
# Install all dependencies
RUN npm install
# Generate the build of the application
RUN npm run build

### STAGE 2: Serve app with nginx server ###

# Use official nginx image as the base image
FROM nginx:latest
# Copy the build output to replace the default nginx contents
COPY --from=build /usr/local/app/dist/fivegmeta /usr/share/nginx/html

# Copy nginx configuration
COPY ./nginx.conf   /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

