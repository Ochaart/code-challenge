import { expect } from '@jest/globals';
import validators from '../../src/functions/validators';

describe('validators', () => {
  test('checkUserLength returns true if username input >= 10 & <= 50', () => {
    const result = validators.checkUserLength('michael.perez');
    expect(result).toBe(true);
  });
  test('checkUserLength returns false if username input is less than 10', () => {
    const result = validators.checkUserLength('a');
    expect(result).toBe(false);
  })
  test('checkUserLength returns false if username input is more than 50', () => {
    const result = validators.checkUserLength('odwxsozipgjaywrybwlbqnhtiulirhgdtlawqxyldpfnnhtrfwkcbutvilbdsemwhrpoaxsbsavipcdkbacksqa');
    expect(result).toBe(false);
  })
  test('checkPassLength returns true if password input >=20 & <=50', () => {
    const result = validators.checkPassLength('gtlyjwzvcnfsmtsqrknvcpz');
    expect(result).toBe(true);
  })
  test('checkPassLength returns false if password input less than 20', () => {
    const result = validators.checkPassLength('gtlyjwzvcnfsmtsqrkn');
    expect(result).toBe(false);
  })
  test('checkPassLength returns false if password input more than 50', () => {
    const result = validators.checkPassLength('odwxsozipgjaywrybwlbqnhtiulirhgdtlawqxyldpfnnhtrfwkcbutvilbdsemwhrpoaxsbsavipcdkbacksqa');
    expect(result).toBe(false);
  })
  test('checkForSymbol returns true if char is either of these symbols !, @, #, $, or %', () => {
    let result = validators.checkForSymbol('!');
    expect(result).toBe(true);
    result = validators.checkForSymbol('@');
    expect(result).toBe(true);
    result = validators.checkForSymbol('#');
    expect(result).toBe(true);
    result = validators.checkForSymbol('$');
    expect(result).toBe(true);
    result = validators.checkForSymbol('%');
    expect(result).toBe(true);
  })
  test('checkForSymbol returns undefined if char is neither of these symbols !, @, #, $, or %', () => {
    const result = validators.checkForSymbol('a');
    expect(result).toBe(undefined);

  })
  test('checkForLetter returns true if char is a letter from a-zA-Z', () => {
    const result = validators.checkForLetter('a');
    expect(result).toBe(true);
  })
  test('checkForLetter returns undefined if char is not a letter', () => {
    let result = validators.checkForLetter('-');
    expect(result).toBe(undefined);
    result = validators.checkForLetter('1');
    expect(result).toBe(undefined);
  })
  test('checkForNumber returns true if char is a number', () => {
    let result = validators.checkForNumber('1');
    expect(result).toBe(true);
    result = validators.checkForNumber('2');
    expect(result).toBe(true);
    result = validators.checkForNumber('3');
    expect(result).toBe(true);
    result = validators.checkForNumber('4');
    expect(result).toBe(true);
    result = validators.checkForNumber('5');
    expect(result).toBe(true);
    result = validators.checkForNumber('6');
    expect(result).toBe(true);
    result = validators.checkForNumber('7');
    expect(result).toBe(true);
    result = validators.checkForNumber('8');
    expect(result).toBe(true);
    result = validators.checkForNumber('9');
    expect(result).toBe(true);
    result = validators.checkForNumber('0');
    expect(result).toBe(true);
  })
  test('checkForNumber returns undefined if char is not a number', () => {
    let result = validators.checkForNumber('u');
    expect(result).toBe(undefined);
    result = validators.checkForNumber('@');
    expect(result).toBe(undefined);
  })
})