export function addClass(el, className) {
  // 拆分className
  if (el.className) {
    let allClass = el.className.split(' ')
    allClass.push(className)
    el.className = allClass.join(' ')
  } else {
    el.className = className
  }
}
