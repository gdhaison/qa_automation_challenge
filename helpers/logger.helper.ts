export class LoggerHelper {
  static info(msg: string) {
    console.log(`ℹ️ INFO: ${msg}`);
  }
  static success(msg: string) {
    console.log(`✅ SUCCESS: ${msg}`);
  }
  static error(msg: string) {
    console.error(`❌ ERROR: ${msg}`);
  }
}