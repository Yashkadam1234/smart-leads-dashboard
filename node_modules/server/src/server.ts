import app from "./app";

import { connectDB }
from "./config/db";

import { config }
from "./config/env";

/**
 * Start server
 */
const startServer =
  async (): Promise<void> => {
    try {
      await connectDB();

      const server =
        app.listen(
          config.PORT,
          () => {
            console.log(
              `🚀 Server running on port ${config.PORT}`
            );
          }
        );

      /**
       * Graceful shutdown
       */
      process.on(
        "SIGTERM",
        () => {
          console.log(
            "SIGTERM received"
          );

          server.close(
            () => {
              console.log(
                "Server closed"
              );

              process.exit(0);
            }
          );
        }
      );
    } catch (error) {
      console.error(
        "Server startup failed:",
        error
      );

      process.exit(1);
    }
  };

startServer();