
/**
 * A custom StringBuilder class similar to the one implemented in Java.
 * Treats String as a mutable object that can be appended upon.
 */
class StringBuilder {
  private pointer = 0
  private string_array: string[] = []

  /**
   * Adds {str} to the StringBuilder instance.
   * @param str Any sized-length string
   */
  public append(str: string) {
    for (let i = 0; i < str.length; i++) {
      this.string_array[this.pointer] = str[i]
      this.pointer++
    }
  }

  /**
   * Converts the string built by StringBuilder into an immutable string.
   */
  public toString() {
    return this.string_array.join('')
  }

  /**
   * Clears the current string.
   */
  public clear() {
    this.pointer = 0
    this.string_array = []
  }

  /**
   * Returns the current size of the string.
   */
  public size() {
    return this.pointer
  }
}

export default StringBuilder