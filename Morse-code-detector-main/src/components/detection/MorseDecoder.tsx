// Morse code dictionary for decoding
const MORSE_TO_LETTER: Record<string, string> = {
  ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E",
  "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J",
  "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O",
  ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
  "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y",
  "--..": "Z", "-----": "0", ".----": "1", "..---": "2", "...--": "3",
  "....-": "4", ".....": "5", "-....": "6", "--...": "7", "---..": "8",
  "----.": "9", "--..--": ",", ".-.-.-": ".", "..--..": "?", "-.-.--": "!",
  "-....-": "-", "-..-.": "/", ".--.-.": "@", "-.--.": "(", "-.--.-": ")"
};

export class MorseDecoder {
  static decodeLetter(morseCode: string): string | null {
    return MORSE_TO_LETTER[morseCode] || null;
  }

  static decodeMessage(morseWords: string[]): string {
    return morseWords
      .map(word => 
        word.split(' ')
          .map(letter => this.decodeLetter(letter))
          .filter(Boolean)
          .join('')
      )
      .join(' ');
  }

  static isValidMorseCode(code: string): boolean {
    return /^[.\-\s]+$/.test(code);
  }

  static formatMorseCode(code: string): string {
    return code.replace(/\./g, '·').replace(/-/g, '–');
  }
}
