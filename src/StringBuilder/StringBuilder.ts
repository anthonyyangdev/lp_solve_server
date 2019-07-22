class StringBuilder {
  private pointer = 0
  private string_array: string[] = []

  constructor() { }

  public append(char: string) {
    for (let i = 0; i < char.length; i++) {
      this.string_array[this.pointer] = char[i]
      this.pointer++
    }
  }

  public toString() {
    return this.string_array.join('')
  }

  public clear() {
    this.pointer = 0
    this.string_array = []
  }

  public size() {
    return this.pointer
  }
}

export default StringBuilder