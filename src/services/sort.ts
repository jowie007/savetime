export function insertionsort(elements: any[], sortField: string): any[] {
  for (let j = 1; j < elements.length; j++) {
    const element = elements[j]
    const key = element[sortField]
    let i = j - 1
    while (i >= 0 && elements[i][sortField] > key) {
      elements[i + 1] = elements[i]
      i = i - 1
    }
    elements[i + 1] = element
  }
  return elements
}

export function bubblesort(elements: any[], sortField: string): any[] {
  for (let i = 0; i < elements.length - 1; i++) {
    for (let j = elements.length - 1; j > i; j--) {
      if (elements[j][sortField] < elements[j - 1][sortField]) {
        const element = elements[j]
        elements[j] = elements[j - 1]
        elements[j - 1] = element
      }
    }
  }
  return elements
}

export function mergesort(els: any[], sortField: string): any[] {
  if (els.length > 1) {
    let els1 = els.slice(0, els.length / 2)
    let els2 = els.slice(els.length / 2, els.length)
    els1 = mergesort(els1, sortField)
    els2 = mergesort(els2, sortField)
    let ret = []
    while (els1.length > 0 && els2.length > 0) {
      if (els1[0][sortField] < els2[0][sortField]) {
        ret.push(els1.shift()!)
      } else {
        ret.push(els2.shift()!)
      }
    }
    ret = ret.concat(els1)
    ret = ret.concat(els2)
    return ret
  }
  return els
}
