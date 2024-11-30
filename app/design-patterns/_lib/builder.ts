export class ApiRequestBuilder {
  method: RequestInit['method'];
  url: string;
  headers: RequestInit['headers'];
  body: Record<string, any>;

  constructor() {
    this.method = 'GET';
    this.url = '';
    this.headers = {};
    this.body = {};
  }

  setMethod(method: typeof this.method) {
    this.method = method;
    return this;
  }

  setUrl(url: typeof this.url) {
    this.url = url;
    return this;
  }

  setHeaders(headers: typeof this.headers) {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  setBody(body: typeof this.body) {
    this.body = body;
    return this;
  }

  build() {
    return {
      method: this.method,
      url: this.url,
      headers: this.headers,
      body: this.body,
    };
  }
}