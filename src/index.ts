import { exec } from 'child_process';

interface ExecOptions {
  encoding?: BufferEncoding;
  disableStdOut?: boolean;
}

export function execute(command: string, options: ExecOptions = {}): Promise<string> {
  const { encoding = 'utf8', disableStdOut = false } = options;

  return new Promise((resolve, reject) => {
    const childProcess = exec(command, { encoding: 'buffer' });

    const chunks: Buffer[] = [];

    // Ensure stdout is not null before attaching listeners
    if (childProcess.stdout) {
      childProcess.stdout.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
        if (disableStdOut) {
          process.stdout.write(chunk);
        }
      });
    }

    // Ensure stderr is not null before attaching listeners
    if (childProcess.stderr) {
      childProcess.stderr.on('data', (chunk: Buffer) => {
        process.stderr.write(chunk);
      });
    }

    childProcess.on('error', (error: Error) => {
      reject(error);
    });

    childProcess.on('exit', (code: number) => {
      if (code === 0) {
        const output = Buffer.concat(chunks).toString(encoding);
        resolve(output);
      } else {
        reject(new Error(`Command '${command}' exited with code ${code}`));
      }
    });
  });
}
