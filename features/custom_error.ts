class E extends Error {
  constructor(msg) {
    super(msg)
  }
}

throw new E('Hello World')