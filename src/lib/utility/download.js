export default class Download {
  static collectionToCSV (delimiter, keys = []) {
    return (collection = []) => {
      const headers = keys.map(key => `${key}`).join(delimiter)
      const extractKeyValues = record => keys.map(key => `${record[key]}`).join(delimiter)

      return collection.reduce((csv, record) => {
        return (`${csv}\n${extractKeyValues(record)}`).trim()
      }, headers)
    }
  }

  static downloadBlob (blob, filename) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = filename || 'download'
    a.click()
    return a
  }
}
