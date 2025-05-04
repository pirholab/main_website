FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml* package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:18-alpine AS production
WORKDIR /app

# Copy built assets from build stage
COPY --from=base /app/out ./out
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 