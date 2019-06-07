import { calculate } from '../src/index'
import { Result, findFromResult } from '../src/result'
import { Heir } from '../src/heir';
import Fraction from 'fraction.js';

function checkResult(
  results: Result[],
  heir: Heir | { name: Heir, type?: 'fard'|'tasib'|'special_case' },
  share: Fraction
) {
  const result = (() => {
    if(typeof heir === 'string') { return findFromResult(results, heir) }

    if(heir.type) return findFromResult(results, heir.name, heir.type)
    return findFromResult(results, heir.name)
  })()

  if(!result) {
    throw Error(`${(typeof heir === 'string') ? heir: heir.name} couldn't be found in result`)
  }
  expect(result.share).toEqual(share)
}

const f = (num: number, den: number = 1) => new Fraction(num, den)

test('empty case', () => {
  const result = calculate({})
  expect(result.length).toEqual(0)
})

test('1 wife, 1 son', () => {
  const result = calculate({ wife: 1, son: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'son', f(7,8))
})

test('husband, mother, 1 maternal_brother, 1 full_uncle', () => {
  const result = calculate({
    husband: 1,
    mother: 1,
    maternal_sibling: 1,
    full_paternal_uncle: 1
  })
  checkResult(result, 'husband', f(1,2))
  checkResult(result, 'mother', f(1,3))
  checkResult(result, 'maternal_sibling', f(1,6))
  checkResult(result, 'full_paternal_uncle', f(0))
})

test('1 daughter, 2 full_sisters', () => {
  const result = calculate({ daughter: 1, full_sister: 2 })
  checkResult(result, 'daughter', f(1,2))
  checkResult(result, 'full_sister', f(1,2))
})

test('2 daughters, 1 paternal_sister', () => {
  const result = calculate({ daughter: 2, paternal_sister: 1 })
  checkResult(result, 'daughter', f(2,3))
  checkResult(result, 'paternal_sister', f(1,3))
})

test('1 daughter, 1 paternal_grand_daughter, 2 full_sister', () => {
  const result = calculate({
    daughter: 1,
    paternal_grand_daughter: 1,
    full_sister: 2
  })
  checkResult(result, 'daughter', f(1,2))
  checkResult(result, 'paternal_grand_daughter', f(1,6))
  checkResult(result, 'full_sister', f(1,3))
})

test('father, 1 full_brother', () => {
  const result = calculate({ father: 1, full_brother: 1 })
  checkResult(result, 'father', f(1))
})

test('1 wife, 1 son, mother', () => {
  const result = calculate({ wife: 1, son: 1, mother: 1 })
  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'son', f(17,24))
  checkResult(result, 'mother', f(1,6))
})

test('husband, 2 full_sister', () => {
  const result = calculate({ husband: 1, full_sister: 2 })
  checkResult(result, 'husband', f(3,7))
  checkResult(result, 'full_sister', f(4,7))
})

test('husband, father, mother', () => {
  const result = calculate({ husband: 1, father: 1, mother: 1 })
  checkResult(result, 'husband', f(1,2))
  checkResult(result, 'father', f(1,3))
  checkResult(result, 'mother', f(1,6))
})

test('1 wife, father, mother', () => {
  const result = calculate({ wife: 1, father: 1, mother: 1 })
  checkResult(result, 'wife', f(1,4))
  checkResult(result, 'father', f(1,2))
  checkResult(result, 'mother', f(1,4))
})

// requires mushtaraka case
test.todo('husband, mother, 2 full_brother, 2 meternal_sibling')

test('2 daughter', () => {
  const result = calculate({ daughter: 2 })
  checkResult(result, 'daughter', f(1,1))
})

test('mother, 1 full_sister', () => {
  const result = calculate({ mother: 1, full_sister: 1 })
  checkResult(result, 'mother', f(2,5))
  checkResult(result, 'full_sister', f(3,5))
})

test('1 paternal_grand_mother, 1 full_sister, 1 maternal_sibling', () => {
  const result = calculate({
    paternal_grand_mother: 1,
    full_sister: 1,
    maternal_sibling: 1
  })

  checkResult(result, 'paternal_grand_mother', f(1,5))
  checkResult(result, 'full_sister', f(3,5))
  checkResult(result, 'maternal_sibling', f(1,5))
})

test('TEMP: 1 wife, 1 daughter, 1 grand_daughter, mother', () => {
  const result = calculate({
    wife: 1,
    daughter: 1,
    paternal_grand_daughter: 1,
    mother: 1
  })

  checkResult(result, 'wife', f(1,8))
  checkResult(result, 'daughter', f(21,40))
  checkResult(result, 'paternal_grand_daughter', f(7,40))
  checkResult(result, 'mother', f(7,40))
})