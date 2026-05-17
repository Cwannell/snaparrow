###########################################
# 1. FRONTEND BUILD (VITE)
###########################################
FROM node:20-alpine AS frontend-build
WORKDIR /app
# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci
# Add source
COPY . .
# Build the Vite app
RUN npm run build
###########################################
# 2. SERVE FRONTEND VIA NGINX
###########################################
FROM nginx:alpine AS frontend-runtime
# Copy built frontend to NGINX directory
COPY --from=frontend-build /app/dist /usr/share/nginx/html
# Expose web server port
EXPOSE 80
# Start NGINX
CMD ["nginx", "-g", "daemon off;"]