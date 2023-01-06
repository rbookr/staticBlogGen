//a标签点击 事件 hook
//[javascript - 怎么拦截页面上所有A标签的跳转 - SegmentFault 思否](https://segmentfault.com/q/1010000037608020)
//
document.body.addEventListener('click', function () {
    // 兼容处理
    var target = event.target || event.srcElement;
    // 判断是否匹配目标元素
    if (target.nodeName.toLocaleLowerCase() === 'a') {
        console.log('当前点击的 a 标签: ', target);

        // 对捕获到的 a 标签进行处理，需要先禁止它的跳转行为
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            window.event.returnValue = true;
        }

        // 处理完 a 标签的内容，重新触发跳转，根据原来 a 标签页 target 来判断是否需要新窗口打开
        let link = target.getAttribute('href')
        console.log('link',link);
        return

        var url = target.getAttribute("href")
        if (target.getAttribute("target") === '_blank') {
            window.open(url)
        } else {
            window.location.href = url
        }
    }
});
