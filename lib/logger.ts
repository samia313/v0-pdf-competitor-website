enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: any
  context?: string
}

class Logger {
  private static isDevelopment = process.env.NODE_ENV === 'development'

  private static formatLog(
    level: LogLevel,
    message: string,
    data?: any,
    context?: string
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message: `[v0] ${context ? `[${context}]` : ''} ${message}`,
      data,
    }
  }

  static debug(message: string, data?: any, context?: string) {
    const log = this.formatLog(LogLevel.DEBUG, message, data, context)
    if (this.isDevelopment) {
      console.log(log.message, data)
    }
  }

  static info(message: string, data?: any, context?: string) {
    const log = this.formatLog(LogLevel.INFO, message, data, context)
    console.log(log.message, data)
  }

  static warn(message: string, data?: any, context?: string) {
    const log = this.formatLog(LogLevel.WARN, message, data, context)
    console.warn(log.message, data)
  }

  static error(message: string, error?: any, context?: string) {
    const log = this.formatLog(LogLevel.ERROR, message, error, context)
    console.error(log.message, error)
  }
}

export default Logger
