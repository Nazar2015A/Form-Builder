declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      MONGO_URL: string;
      CLIENT_URL: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      SECRET_KEY: string;
      CALLBACK_URL: string;
      SERVER_URL: string;
    }
  }
}

export {};
