export default class Token {
  private value: string
  private regex: RegExp
  private literal: string
  private type: number | string

  constructor(token: any) {
    this.value = token.value
    this.regex = token.regex
    this.type = token.type
    this.literal = token.literal
  }

  public getType() {
    return this.type
  }

  public getRegex() {
    return this.regex
  }

  public getValue() {
    return this.value
  }

  public getLiteral() {
    return this.literal
  }

  public clone() {
    return new Token({
      value: this.value,
      regex: this.regex,
      type: this.type,
      literal: this.literal
    })
  }
}