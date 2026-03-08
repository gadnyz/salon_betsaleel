import { runStartupEnvCheck } from "@/lib/startupEnvCheck";

export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    runStartupEnvCheck();
  }
}
