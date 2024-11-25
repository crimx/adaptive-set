import { describe, expect, it } from "vitest";

import { type AdaptiveSet, add, clear, has, isSingle, remove, size } from ".";

describe("adaptive-set", () => {
  describe("add", () => {
    it("should be be Single on first add", () => {
      let col: AdaptiveSet<number>;

      col = add(col, 1);

      expect(isSingle(col)).toBe(true);
      expect([...col]).toEqual([1]);
    });

    it("should be be Set on second add", () => {
      let col: AdaptiveSet<number>;

      // Not checking equality of the added value is intended to reduce code for corner cases.
      col = add(col, 1);
      col = add(col, 1);

      expect(isSingle(col)).toBe(false);
      expect(col).toBeInstanceOf(Set);
      expect([...col]).toEqual([1]);

      col = add(col, 2);
      expect(isSingle(col)).toBe(false);
      expect(col).toBeInstanceOf(Set);
      expect([...col]).toEqual([1, 2]);
    });
  });

  describe("remove", () => {
    it("should remove item from empty set", () => {
      let col: AdaptiveSet<number>;

      col = remove(col, 1);

      expect(col).toBeUndefined();
    });

    it("should remove item from Single", () => {
      let col: AdaptiveSet<object>;

      const value = {};

      col = add(col, value);

      expect(isSingle(col)).toBe(true);
      expect([...col]).toEqual([value]);

      col = remove(col, {});

      expect(isSingle(col)).toBe(true);
      expect([...col!]).toEqual([value]);

      col = remove(col, value);
      expect(col).toBeFalsy();
    });

    it("should remove items from Set", () => {
      let col: AdaptiveSet<number>;

      col = add(col, 1);
      col = add(col, 2);
      col = add(col, 3);

      expect(isSingle(col)).toBe(false);
      expect(col).toBeInstanceOf(Set);
      expect([...col]).toEqual([1, 2, 3]);

      col = remove(col, 0);
      expect([...col!]).toEqual([1, 2, 3]);

      col = remove(col, 2);
      expect([...col!]).toEqual([1, 3]);

      col = remove(col, 1);
      expect([...col!]).toEqual([3]);

      col = remove(col, 3);
      expect([...col!]).toEqual([]);
    });

    describe("clear", () => {
      it("should clear empty", () => {
        let col: AdaptiveSet<number>;

        col = clear(col);
        expect(col).toBeFalsy();
      });

      it("should clear single", () => {
        let col: AdaptiveSet<number>;

        col = add(col, 1);
        col = clear(col);
        expect(col).toBeFalsy();
      });

      it("should clear set and returns the cleared set", () => {
        let col: AdaptiveSet<number>;

        col = add(col, 1);
        col = add(col, 2);
        col = clear(col);
        expect(col).toBeInstanceOf(Set);
        expect(col).lengthOf(0);
      });
    });

    it("should drop Set when size is empty", () => {
      let col: AdaptiveSet<number>;

      col = add(col, 1);
      col = add(col, 2);

      expect(isSingle(col)).toBe(false);
      expect(col).toBeInstanceOf(Set);
      expect([...col]).toEqual([1, 2]);

      col = remove(col, 0, true);
      expect([...col!]).toEqual([1, 2]);

      col = remove(col, 1, true);
      expect([...col!]).toEqual([2]);

      col = remove(col, 2, true);
      expect(col).toBeFalsy();
    });
  });

  describe("size", () => {
    it("should get size", () => {
      let col: AdaptiveSet<number>;

      expect(size(col)).toBe(0);

      col = add(col, 1);
      expect(size(col)).toBe(1);

      col = add(col, 1);
      expect(size(col)).toBe(1);

      col = add(col, 2);
      expect(size(col)).toBe(2);

      col = remove(col, 1);
      expect(size(col)).toBe(1);

      col = remove(col, 2);
      expect(size(col)).toBe(0);

      col = add(col, 3);
      expect(size(col)).toBe(1);

      col = remove(col, 3, true);
      expect(size(col)).toBe(0);
    });
  });

  describe("has", () => {
    it("should check if value exists", () => {
      let col: AdaptiveSet<number>;

      expect(has(col, 1)).toBe(false);

      col = add(col, 1);
      expect(has(col, 1)).toBe(true);

      col = add(col, 2);
      expect(has(col, 1)).toBe(true);
      expect(has(col, 2)).toBe(true);

      col = remove(col, 1);
      expect(has(col, 1)).toBe(false);
      expect(has(col, 2)).toBe(true);

      col = remove(col, 2);
      expect(has(col, 1)).toBe(false);
      expect(has(col, 2)).toBe(false);

      col = add(col, 3);
      expect(has(col, 3)).toBe(true);

      col = remove(col, 3, true);
      expect(has(col, 3)).toBe(false);
    });
  });

  describe("iterator", () => {
    it("should iterate over values", () => {
      let col: AdaptiveSet<number>;

      expect(col).toBeUndefined();

      col = add(col, 1);
      expect([...col]).toEqual([1]);

      col = add(col, 2);
      expect([...col]).toEqual([1, 2]);

      col = remove(col, 1);
      expect(col).toBeDefined();
      expect([...col!]).toEqual([2]);

      col = remove(col, 2);
      expect(col).toBeDefined();

      col = add(col, 3);
      expect([...col]).toEqual([3]);

      col = remove(col, 3, true);
      expect(col).toBeFalsy();
    });
  });
});
