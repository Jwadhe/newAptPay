import dotenv from 'dotenv'

// set the node to 'development' by default

const envFound = dotenv.config();
if(envFound.error){
  // This error should crash whole process
throw new Error("⚠️  Couldn't find .env file  ⚠️")
}
let databaseUrl;
let jwtSecret;
let port;
let tlsCAFile;
let endpoint;
let secret;
let apiKey;

if(process.env.ENV){
  databaseUrl = process.env.MONGODB_LOCAL_URL;
  jwtSecret = process.env.JWT_SECRET;
  port = process.env.PORT;
  tlsCAFile = process.env.STAGE_tlsCAFile;
  endpoint = process.env.SANDBOX_API_ENDPOINT;
  secret = process.env.SANDBOX_API_SECRET;
  apiKey = process.env.SANDBOX_API_KEY;
}

export default () => ({

   /**
   * APTPAY
   */
    endpoint,
    secret,
    apiKey,

    port: parseInt(process.env.PORT, 10) || 3001,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    }

    
  });

  export{}