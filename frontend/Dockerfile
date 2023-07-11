FROM --platform=linux/amd64 node:latest
# Set the working directory in the container
WORKDIR /app

COPY package.json ./

RUN npm i

# Copy the rest of the application files into the container
COPY . .

# Expose the desired port for the application to run on (change to your desired port)
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev", "--" , "--host"]