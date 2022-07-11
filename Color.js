class Color {
  colors = {
      white: 0,
      black: 1,
      blue: 2,
      green: 3,
      lightred: 4,
      brown: 5,
      purple: 6,
      orange: 7,
      yellow: 8,
      lightgreen: 9,
      cyan: 10,
      lightcyan: 11,
      lightblue: 12,
      pink: 13,
      grey: 14,
      lightgrey: 15
  }
  formats = {
      color: String.fromCharCode(0x03),
      bold: String.fromCharCode(0x02),
      italic: String.fromCharCode(0x1D),
      underline: String.fromCharCode(0x1F),
      strikethrough: String.fromCharCode(0x1E),
      monospace: String.fromCharCode(0x11),
      hex: String.fromCharCode(0x04),
      reset: String.fromCharCode(0x0F)
  }

  constructor() {}

  getColoredString(string, fgColor = 'black', bgColor = 'white') {
      let coloredString = this.formats.color

      if (+string === +string) string = ` ${string}`

      if (this.colors.hasOwnProperty(fgColor))
          coloredString += String(this.colors[fgColor])
      if (bgColor !== 'white' && this.colors.hasOwnProperty(bgColor))
          coloredString += `,${String(this.colors[bgColor])}`

      return `${coloredString}${string}${this.formats.color}${this.formats.reset}`
  }

  highlight(string) {
      return this.getColoredString(string, 'white', 'black')
  }

  lastLetter(string) {
      return this.getFormattedString(this.getColoredString(string.toUpperCase(), 'lightred'), ['bold', 'italic'])
  }

  listeningUser(string) {
      return this.getColoredString(string, 'lightblue', 'white')
  }

  songTitle(string) {
      return this.getColoredString(string, 'lightred', 'black')
  }

  system(string) {
      return this.getFormattedString(this.getColoredString(string, 'blue'), ['bold', 'italic'])
  }

  player(string) {
      return this.getFormattedString(this.getColoredString(string, 'green'), ['bold', 'italic'])
  }

  fazan(string) {
      if (string.length < 3)
          return this.getFormattedString(this.getColoredString(string, 'green'), ['bold', 'italic'])
      else if (string.length == 3)
          return this.getFormattedString(this.getColoredString(string, 'yellow'), ['bold', 'italic'])
      else if (string.length == 4)
          return this.getFormattedString(this.getColoredString(string, 'orange'), ['bold', 'italic'])
      else
          return this.getFormattedString(this.getColoredString(string, 'lightred'), ['bold', 'italic'])
  }

  getFormattedString(string, formats) {
      if (!Array.isArray(formats))
          formats = [formats]

      if (+string === +string) string = ` ${string}`
      
      formats.forEach(f => {
          if (this.formats.hasOwnProperty(f))
              string = `${this.formats[f]}${string}${this.formats.reset}`
      })

      return string
  }

  bold(string) {
      return this.getFormattedString(string, 'bold')
  }

  bolditalic(string) {
      return this.getFormattedString(string, ['bold', 'italic'])
  }

  songRobot(string, songName = null, user = null) {
    if (songName) {
      string = string.replace('[songName]', this.getColoredString(songName, 'lightblue', 'white'))
    }
    if (user) {
      string = string.replace('[userName]', this.getColoredString(user, 'lightred'))
    }
    return this.getFormattedString(string, ['bold', 'italic'])
  }
}

module.exports = Color
