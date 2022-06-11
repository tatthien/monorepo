import { b } from '@tatthien/b';

export function a(name: string): string {
  return `Hello ${name} from a. A calls B: ${b(name)}`;
}
