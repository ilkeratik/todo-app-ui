FROM nginx:alpine

# Copy the built React app to Nginx's serve directory
COPY build/ /usr/share/nginx/html

# Copy the Nginx configuration file
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]