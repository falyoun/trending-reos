const hashStringToInt = (str, tableSize) => {
  let hash = 17;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    hash = (13 * hash * c.charCodeAt(i)) % tableSize;
  }
  return hash;
};

export class HashTable {
  table = new Array(77);
  numItems = 0;

  resize = () => {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach((item) => {
      if (item) {
        item.forEach(([key, value]) => {
          const idx = hashStringToInt(key, newTable.length);
          if (newTable[idx]) {
            newTable[idx].push([key, value]);
          } else {
            newTable[idx] = [[key, value]];
          }
        });
      }
    });

    this.table = newTable;
  };

  setItem = (key, value) => {
    this.numItems++;
    const loadFactor = this.numItems / this.table.length;
    if (loadFactor > 0.8) {
      this.resize();
    }
    const idx = hashStringToInt(key, this.table.length);
    if (this.table[idx]) {
      this.table[idx].push([key, value]);
    } else {
      this.table[idx] = [[key, value]];
    }
  };

  getItem = (key) => {
    const idx = hashStringToInt(key, this.table.length);
    if (!this.table[idx]) {
      return null;
    }
    const foundElements = this.table[idx].find((x) => x[0] === key)
    return foundElements && foundElements.length > 0 ? foundElements[1] : null;
  };
}