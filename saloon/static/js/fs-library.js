"use strict";

class FS extends Array {
    fsReady(cb) {
        const isReady = this.some(e => {
            return e.readyState !== null && e.readyState !== 'loading';
        })
        if (isReady) {
            cb()
        } else {
            this.on('DOMContentLoaded');
            document.addEventListener('DOMContentLoaded', cb);
        }
        return this;
    }

    on(e, cb) {
        this.each(fs => {
            for (let i = 0; i < e.split(',').length; i++) {
                fs.addEventListener(e.split(',')[i], cb);
            }
        })
    }

    resize(cb) {
        this.each(fs => {
            fs.onresize = cb;
        })
    }

    click(cb) {
        this.each(fs => {
            fs.onclick = cb;
        })
    }

    drag(cb) {
        this.each(fs => {
            fs.ondrag = cb;
        })
    }

    dragend(cb) {
        this.each(fs => {
            fs.ondragend = cb;
        })
    }

    dragenter(cb) {
        this.each(fs => {
            fs.ondragenter = cb;
        })
    }

    dragover(cb) {
        this.each(fs => {
            fs.ondragover = cb;
        })
    }

    drop(cb) {
        this.each(fs => {
            fs.ondrop = cb;
        })
    }

    dragstart(cb) {
        this.each(fs => {
            fs.ondragstart = cb;
        })
    }

    load(cb) {
        this.each(fs => {
            fs.onload = cb;
        })
    }

    dataUrl(data) {
        this.each(fs => {
            fs.readAsDataURL(data)
        })
    }

    net() {
        return this[0].navigator.onLine === true;
    }

    scrollTo(scroll) {
        this.each(fs => {
            fs.scrollTo(scroll)
        })
    }

    parent() {
        return this.map(fs => fs.parentNode)
    }

    next() {
        return this.map(fs => fs.nextElementSibling).filter(e => e !== null);
    }

    prev() {
        return this.map(fs => fs.previousElementSibling).filter(e => e !== null);
    }

    first() {
        return new FS(this[0]);
    }

    last() {
        return new FS(this.pop());
    }

    nth(nth) {
        return new FS(this[nth]);
    }

    onkeydown(cb) {
        this.each(fs => {
            fs.onkeydown = cb;
        })
    }

    val(val) {
        if (val === undefined) {
            return this[0].value;
        } else {
            this.each(fs => {
                fs.value = val
            })
        }
    }

    removeChild() {
        this.each(fs => {
            fs.parentNode.removeChild(fs)
        })
    }

    remove() {
        this.each(fs => {
            fs.remove()
        })
    }

    removeClass(className) {
        this.each(fs => fs.classList.remove(className))
    }

    class(className) {
        this.each(fs => fs.className = className)
    }

    className(name) {
        return this[0].className = name;
    }

    addClass(className) {
        this.each(fs => fs.classList.add(className))
    }

    toggleClass(className) {
        this.each(fs => fs.classList.toggle(className))
    }

    property(name, value) {
        this.each(fs => {
            if (value.length === 1) {
                fs.style.setProperty(name, value[0])
            } else {
                fs.style.setProperty(name, value)
            }
        })
    }

    select(select) {
        return this.map(fs => fs.querySelector(select)).filter(fs => fs !== null);
    }

    selectAll(select) {
        return new FS(...this[0].querySelectorAll(select));
    }

    prepend(el) {
        this[0].prepend(el)
    }

    append(el, append) {
        if (el === undefined) {
            return false;
        }
        if (append === 'child' || (append === undefined || !append)) {
            this.each(fs => fs.appendChild(el))
        }
    }

    inner(html, append) {
        this.each(fs => {
            if (append === false || append === undefined) {
                fs.innerHTML = html;
            } else {
                fs.innerHTML += html;
            }
        })
    }

    text() {
        return this[0].innerText || this[0].textContent || this[0].innerHTML;
    }

    css(css, get) {
        return this.map(fs => getComputedStyle(fs).getPropertyValue(css));
    }

    have() {
        return !!this[0];
    }

    get(get) {
        switch (get) {
            case 'number': {
                return this[0].match(/\d/g).join('');
            }
            case 'class': {
                return this[0].className;
            }
        }
    }

    join(separator) {
        return this[0].join(separator);
    }

    x(get) {
        if (get === false || !get || get === 'offset') {
            return this[0].offsetX;
        }
        if (get === 'scroll') {
            return this[0].scrollX;
        }
        if (get === 'layer') {
            return this[0].layerX;
        }
        if (get === 'client') {
            return this[0].clientX;
        }
    }

    y(get) {
        if ((get === false || !get) || get === 'offset') {
            return this[0].offsetY;
        }
        if (get === 'scroll') {
            return this[0].scrollY;
        }
        if (get === 'pageOffset') {
            return this[0].pageYOffset;
        }
        if (get === 'layer') {
            return this[0].layerY;
        }
        if (get === 'client') {
            return this[0].clientY;
        }
    }

    l(get) {
        if (get === 'scroll') {
            return this[0].offsetLeft;
        }
        if (get === 'offset' || get === undefined) {
            return this[0].offsetLeft;
        }
        if (get === 'full') {
            return this[0].getBoundingClientRect().left;
        }
    }

    scrollTop() {
        return this[0].scrollTop;
    }

    offsetTop() {
        return this[0].offsetTop;
    }

    rectTop() {
        return this[0].getBoundingClientRect(), top;
    }

    scrollWidth() {
        return this[0].scrollWidth;
    }

    offsetWidth() {
        return this[0].offsetWidth;
    }

    rectWidth() {
        return this[0].getBoundingClientRect().width;
    }

    scrollHeight() {
        return this[0].scrollHeight;
    }

    offsetHeight() {
        return this[0].offsetHeight;
    }

    rectHeight() {
        return this[0].getBoundingClientRect().height;
    }

    innerHeight() {
        return this[0].innerHeight;
    }

    style(value) {
        this.each(fs => {
            for (const valueKey in value) {
                fs.style[valueKey] = value[valueKey];
            }
        })
    }

    to(name, mod) {
        switch (name) {
            case 'localString': {
                return this.length.toLocaleString(mod ? mod : '')
            }
        }
    }

    convertColor(from, to, a) {
        let _this = this[0];
        let empty = from !== '' && to !== '';
        let rgbToHex = from === 'rgb' && to === 'hex';
        let rgbToRgba = from === 'rgb' && to === 'rgba';
        if (empty) {
            if (rgbToRgba) {
                if (!(_this.search('rgba') >= 0)) {
                    return _this.replace(')', `, ${a === undefined ? .75 : a})`).replace('rgb', 'rgba');
                } else {
                    return _this.replace(_this.split(',').splice(_this.split(',').length - 1, _this.split(',').length)[0], ` ${a === undefined ? .75 : a})`)
                }
            }
            if (rgbToHex) {
                let sep = _this.indexOf(",") > -1 ? "," : " ";
                _this = _this.substr(4).split(")")[0].split(sep);
                let r = (+_this[0]).toString(16),
                    g = (+_this[1]).toString(16),
                    b = (+_this[2]).toString(16);
                if (r.length === 1) {
                    r = "0" + r;
                }
                if (g.length === 1) {
                    g = "0" + g;
                }
                if (b.length === 1) {
                    b = "0" + b;
                }
                return "#" + r + g + b;
            }
        }
    }

    observe({threshold}) {
        let observer;
        this.each(fs => {
            new IntersectionObserver((entry) => {
                entry.forEach(fs => {
                    observer = fs.isIntersecting;
                })
                console.log(observer)
            }, {threshold: threshold}).observe(fs)
        })
        return observer;
    }

    each(cb) {
        this.forEach(cb);
    }

    getattr(data) {
        return this[0].getAttribute(data);
    }

    setattr(data, value) {
        return this[0].setAttribute(data, value);
    }

    scrollTo(arr) {
        this[0].scrollTo(arr);
    }

    not(className) {
        return this.map(fs => {
            if (!fs.classList.contains(className)) {
                return fs;
            }
        }).filter(fs => fs !== undefined)
    }

    uppercase() {
        return this[0].value.toUpperCase() || this[0].innerText.toUpperCase() || this[0].textContent.toUpperCase()
            || this[0].innerHTML.toUpperCase()
    }

    hasClass(className) {
        return this[0].classList.contains(className);
    }
}

function $(param) {
    if (typeof param === 'string' || param instanceof String) {
        return new FS(...document.querySelectorAll(param))
    } else {
        return new FS(param)
    }
}

$.post = (async function ({
                              url, data, dataType, credentials, res = () => {
    }
                          }) {
    if (credentials !== undefined) {
        await fetch(url, {credentials: credentials})
    } else {
        await fetch(url, {method: "POST", body: data, headers: dataType})
    }
})
$.get = (async function ({
                             url, success = () => {
    }
                         }) {
    await fetch(url, {method: "GET"}).then(res => {
        return res.json();
    }).then(data => {
        success(data)
    })
})
$.storage = (async function ({
                                 name, method, data, success = () => {
    }
                             }) {
    if (name !== undefined) {
        switch (method) {
            case "get":
                if (localStorage.getItem(name)) {
                    success(localStorage.getItem(name));
                } else {
                    success(null)
                }
                break;
            case "set":
                if (data !== undefined) {
                    localStorage.setItem(name, data);
                }
        }
    }
})
$.interval = (async function (cb, time) {
    setInterval(cb, time)
})
$.timeout = (async function (cb, time) {
    setTimeout(cb, time)
})
$.math = function (value, math) {
    if (math === 'floor') {
        return Math.floor(value);
    } else {
        return undefined;
    }
}
$.create = function (el) {
    return document.createElement(el);
}
$.observer = function ({threshold, object, cb}) {
    new IntersectionObserver(function (observer) {
        observer.forEach(fs => {
            if (fs.isIntersecting) {
                console.log(true)
                return true;
            } else {
                console.log(false)
                return false;
            }
        })
    }, {threshold: threshold}).observe(object)
}
$.pagination = function ({get, number, size, array}) {
    if (get === 'pagination') {
        return array.slice((number - 1) * size, number * size);
    } else if (get === 'page') {
        return Math.ceil(array.length / size)
    } else if (get === 'page' && number) {
        console.error('error')
    } else {
        console.error('error')
    }
}