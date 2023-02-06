FROM node:16.10.0-alpine as build

# Set the variable
ARG env
ENV env=${env}

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm ci

# Generate the build of the application
RUN npm run build-${env}

# Use official nginx image as the base image
FROM nginx:1.21.6-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/smartgap-public /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./scripts/startup.sh /scripts/startup.sh

RUN chmod +x /scripts/startup.sh

# Expose port 80
EXPOSE 80

ENTRYPOINT ["/scripts/startup.sh"]
