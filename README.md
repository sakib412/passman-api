# Run this project locally

## Prerequisites
- [Node.js](https://nodejs.org/en/) (tested on v18.15.0 but should work on any version >= 16)
- MongoDB (local or remote)


## Setup
1. Clone the repository
    ```bash
    git clone https://github.com/sakib412/passman-api.git
    ```
2. Change directory to cloned repository
    ```bash
    cd passman-api
    ```

3. Install dependencies
    ```bash
    npm install
    ``` 
    or 
    ```bash 
    yarn 
    ```
4. Copy `.env.example` to `.env` and fill in the values
   ```bash
    cp .env.example .env
    ```
    update your `.env` file with your own values
5. Start the server
    ```bash
    npm run dev
    ```

## For production build 
1. Build the project
    ```bash
    npm run build
    ```

2. Run the production server after build
    ```bash 
    npm start
    ```

