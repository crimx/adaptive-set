# adaptive-set

[![Docs](https://img.shields.io/badge/Docs-read-%23fdf9f5)](https://crimx.github.io/adaptive-set)
[![Build Status](https://github.com/crimx/adaptive-set/actions/workflows/build.yml/badge.svg)](https://github.com/crimx/adaptive-set/actions/workflows/build.yml)
[![npm-version](https://img.shields.io/npm/v/adaptive-set.svg)](https://www.npmjs.com/package/adaptive-set)
[![Coverage Status](https://img.shields.io/coverallsCoverage/github/crimx/adaptive-set)](https://coveralls.io/github/crimx/adaptive-set)
[![minified-size](https://img.shields.io/bundlephobia/minzip/adaptive-set)](https://bundlephobia.com/package/adaptive-set)

A set of utils for implementing specialized `Set` data structure designed to optimize memory usage and performance based on the number of elements it contains.
It adapts its internal representation to efficiently handle cases where there are no items, a single item, or multiple items.

- **No Items**: When the set is empty, it uses an `undefined` value to represent the absence of elements, minimizing memory usage.
- **Single Item**: When the set contains exactly one item, it uses a lightweight `Single` class to store the single element, providing quick access and iteration.
- **Multiple Items**: When the set contains more than one item, it switches to using a standard `Set` to leverage its efficient handling of multiple elements.

This adaptive approach ensures that the it remains efficient and performant across different usage scenarios,
making it an ideal choice for applications where the number of elements can vary significantly.

## Install

```
npm add adaptive-set
```

## Example

```ts
import { add, has, remove, size, type AdaptiveSet } from "adaptive-set";

type Fn = () => void;

class MyClass {
  private listeners?: AdaptiveSet<Fn>;

  public notify(): void {
    if (this.listeners) {
      for (const listener of this.listeners) {
        listener();
      }
    }
  }

  public addListener(listener: Fn): void {
    this.listeners = add(this.listeners, listener);
  }

  public removeListener(listener: Fn): void {
    this.listeners = remove(this.listeners, listener);
  }

  public hasListener(listener: Fn): boolean {
    return has(this.listeners, listener);
  }

  public getListenerCount(): number {
    return size(this.listeners);
  }

  public clearListeners(): void {
    this.listeners = undefined;
  }
}
```
