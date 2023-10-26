interface Converter {
  pattern: RegExp
  convert: (line: string) => string
}
