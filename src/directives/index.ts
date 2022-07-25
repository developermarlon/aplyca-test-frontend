export const toucheableTable = {
  mounted: (el: any, binding: any, vnode: any) => {
    if (el !== null && el.querySelector('table')) {
      el = el.querySelector('table').parentElement
      el.style.cursor = 'move' as string
      let down: boolean = false;
      let scrollLeft: number = 0;
      let x: number = 0;

      el.addEventListener('mousedown', (e: any) => {
        down = true;
        scrollLeft = el.scrollLeft;
        x = e.clientX;
      })

      el.addEventListener('mouseup', (e: any) => {
        down = false;
      })

      el.addEventListener('mousemove', (e: any) => {
        if (down) {
          el.scrollLeft = scrollLeft + x - e.clientX;
        }
      })

      el.addEventListener('mouseleave', () => {
        down = false;
      })
    }
  }
}

export const scrollTable = {
  mounted: (el: any, binding: any, vnode: any) => {
    el = el.querySelector('table').parentElement
    el.style.setProperty('overflow-y', 'scroll', 'important')
    el.style.setProperty('overflow-x', 'scroll', 'important')
    el.style.setProperty('max-height', '500px', 'important')
    el.onscroll = (e: any) => {
      var translate = 'translate(0,' + (e.target.scrollTop-2) + 'px)'
      let table = e.target.querySelector('table')
      if (table) {
        table.querySelector('thead').style.transform = translate
        table.querySelector('thead').style.setProperty('background', '#fff', 'important')
        table.querySelector('thead').style.setProperty('position', 'relative', 'important')
        table.querySelector('thead').style.setProperty('z-index', '2', 'important')
      }
    }
  }
}
