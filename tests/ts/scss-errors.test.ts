import { describe, it, expect } from 'vitest';
import path from 'node:path';
import sass from 'sass';

const loadPaths = [path.resolve(process.cwd(), 'src/scss')];

function compileSnippet(source: string) {
  return () =>
    sass.renderSync({
      data: source,
      includePaths: loadPaths
    });
}

describe('SCSS colour function error handling', () => {
  it('get-colour() errors an unknown colour family', () => {
    const source = `
      @use 'functions/colours' as colours;

      $value: colours.get-colour('apple');
    `;

    expect(compileSnippet(source)).toThrowError(
      'get-colour(): unknown colour family `apple`.'
    );
  });

  it('get-colour() errors scale not defined for family', () => {
    const source = `
      @use 'functions/colours' as colours;

      $value: colours.get-colour('blue', 45);
    `;

    expect(compileSnippet(source)).toThrowError(
      'get-colour(): scale `45` is not defined for family `blue`.'
    );
  });

  it('get-colour-scale() errors an unknown colour family', () => {
    const source = `
      @use 'functions/colours' as colours;

      $value: colours.get-colour-scale('apple');
    `;

    expect(compileSnippet(source)).toThrowError(
      'get-colour-scale(): unknown colour family `apple`.'
    );
  });

  it('colour-keys() errors an unknown colour family', () => {
    const source = `
      @use 'functions/colours' as colours;

      $value: colours.colour-keys('apple');
    `;

    expect(compileSnippet(source)).toThrowError(
      'colour-keys(): unknown colour family `apple`.'
    );
  });
});
