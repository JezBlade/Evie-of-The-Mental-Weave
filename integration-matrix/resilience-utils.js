// 🛡️ RESILIENCE UTILITIES
// Retry, backoff, circuit breaker, and error handling

export class RetryHandler {
  static async withRetry(fn, options = {}) {
    const { maxRetries = 3, baseDelay = 1000, maxDelay = 10000 } = options;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === maxRetries) throw error;
        
        const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
        console.log(`⚠️ Attempt ${attempt} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
}

export class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.failures = 0;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    this.nextAttempt = Date.now();
  }

  async execute(fn) {
    if (this.state === 'OPEN') {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.timeout;
    }
  }
}

export class AuditLogger {
  constructor(logPath) {
    this.logPath = logPath;
  }

  async log(event, data = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      event,
      data,
      hash: this.generateHash(event, data)
    };

    const fs = await import('fs');
    fs.appendFileSync(this.logPath, JSON.stringify(entry) + '\n');
  }

  generateHash(event, data) {
    return Math.random().toString(36).substring(2, 18);
  }
}