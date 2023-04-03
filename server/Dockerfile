FROM node:16-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /server
# Copy app files
COPY ./ ./
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 

CMD ["npm", "run", "start"]
