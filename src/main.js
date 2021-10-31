const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hasMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' },
]
const simplifyUrl = (url) => {
    return url.replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hasMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                <use xlink:href="#icon-delete"></use>
                    </svg></div>
            </div>
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hasMap.splice(index, 1)
            render()
        })
    })
}
render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是啥？')
        if (url.indexOf('http') !== 0) {
            url = 'https://www.' + url
        }
        console.log(url)
        hasMap.push({ logo: simplifyUrl(url)[0], url: url })
        render()
    })
window.onbeforeunload = () => {
    const string = JSON.stringify(hasMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hasMap.length; i++) {
        if (hasMap[i].logo.toLowerCase() === key) {
            window.open(hasMap[i].url)
        }
    }
})