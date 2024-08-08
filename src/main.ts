import { defaultHeirs, calculate } from './index'

function printResults(results) {
  const fractionToString = r => ({ ...r, share: r.share.toFraction() })
  console.log(results.map(fractionToString))
}

const result = calculate({ wife: 3, son: 1, daughter: 1 })
printResults(result)
//=> [
//     { name: 'wife',     count: 3, type: 'fard',  share: '1/8'  },
//     { name: 'son',      count: 1, type: 'tasib', share: '7/12' },
//     { name: 'daughter', count: 1, type: 'tasib', share: '7/24' }
//   ]