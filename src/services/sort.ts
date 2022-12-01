export function insertionsort(elements: number[]) {
  for (let j = 1; j < elements.length; j++) {
    const key = elements[j]
    let i = j - 1
    while (i >= 0 && elements[i] > key) {
      elements[i + 1] = elements[i]
      i = i - 1
    }
    elements[i + 1] = key
    console.log(elements)
  }
  console.log(elements)
}

export function bubblesort(elements: number[]) {
  for (let i = 0; i < elements.length - 1; i++) {
    for (let j = elements.length; j > i; j--) {
      if (elements[j] < elements[j - 1]) {
        const element = elements[j]
        elements[j] = elements[j - 1]
        elements[j - 1] = element
        console.log(elements)
      }
    }
  }
}

export function mergesort(els: number[]): number[] {
  // console.log(els)
  if (els.length > 1) {
    let els1 = els.slice(0, els.length / 2)
    let els2 = els.slice(els.length / 2, els.length)
    els1 = mergesort(els1)
    els2 = mergesort(els2)
    let ret = []
    while (els1.length > 0 && els2.length > 0) {
      if (els1[0] < els2[0]) {
        ret.push(els1.shift()!)
      } else {
        ret.push(els2.shift()!)
      }
    }
    ret = ret.concat(els1)
    ret = ret.concat(els2)
    console.log(ret)
    return ret
  }
  return els
}