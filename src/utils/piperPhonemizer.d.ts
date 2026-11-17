export function createPiperPhonemize(moduleArg?: {
  print?: (data: string) => void;
  printErr?: (message: string) => void;
  locateFile?: (url: string) => string;
}): Promise<{
  callMain: (args: string[]) => void;
}>;
