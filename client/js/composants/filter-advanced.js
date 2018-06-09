export const filterElement = category => {
  let value = category.title.replace(/[\s]/g, '-')
  return /* html */`
  <li>
  <input type="checkbox" name=${value} id=${value} value=${value}>
    <label for=${value}>${category.title}</label>
  </li>
    `
}
