import { generate } from 'generate-password';

export function generateAttendanceCode(length: number) {
  return generate({
    length: length,
    numbers: true,
    symbols: false,
    lowercase: false,
    uppercase: true,
  });
}
