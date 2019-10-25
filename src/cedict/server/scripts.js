const storeMessage = (messageText) => {
  const objectStoreName = 'cedictMsgStore'
  let open = indexedDB.open('db-name', 1) // eslint-disable-line prefer-const

  open.onupgradeneeded = () => {
    let db = open.result // eslint-disable-line prefer-const
    db.createObjectStore(objectStoreName, { autoIncrement: true })
  }

  open.onsuccess = () => {
    let db = open.result // eslint-disable-line prefer-const
    let tx = db.transaction(objectStoreName, 'readwrite') // eslint-disable-line prefer-const
    let store = tx.objectStore(objectStoreName) // eslint-disable-line prefer-const

    store.put({ message: messageText, timestamp: new Date().toString() })

    tx.oncomplete = () => {
      db.close()
    }
  }
}

const messageHandler = (event) => {
  console.info('A message has been received', event)
  console.info(`Message has been originated at ${event.origin}`)
  storeMessage(`Message from ${event.origin}`)
  window.parent.postMessage('Response from CEDICT', event.origin)
}

document.addEventListener('DOMContentLoaded', () => {
  console.info('CEDICT DOM content loaded')
})

window.onload = () => {
  console.info('CEDICT loaded')
}

window.addEventListener('message', messageHandler, false)
