ARG NODE_VERSION=24.12.0-alpine

# =========================================
# Stage: dev (local development)
# =========================================
# Use a lightweight Node.js image for development
FROM node:${NODE_VERSION} AS dev

# Set the working directory inside the container
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json package-lock.json* ./

# Install project dependencies
RUN --mount=type=cache,target=/root/.npm npm install

# Copy the rest of the application source code into the container
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run dev
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# =========================================
# Stage: build
# =========================================
# Use a lightweight Node.js image
FROM node:${NODE_VERSION} AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json package-lock.json* ./

# Install project dependencies
RUN --mount=type=cache,target=/root/.npm npm install

# Copy the rest of the application source code into the container
COPY . .

# Run build
RUN npm run build

# =========================================
# Stage: production (nginx)
# =========================================
FROM nginx:stable-alpine AS production

# Copy build into nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]