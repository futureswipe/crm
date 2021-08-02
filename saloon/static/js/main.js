$(document).fsReady(async ({url, path}) => {
        // browser settings
        document.oncontextmenu = window.oncontextmenu = () => {
            return false;
        }

        // navbar items list
        for (let i = 0; i < options.navbar.length; i++) {
            const json = options.navbar[i];
            await $('nav').inner(`<div class="item ${json['active'] === true ? 'active' : ''}"><a href="${json['href']}" class="link">
            <span><i class="fas fa-${json['icon']}"></i></span>
            <p>${json['title']}</p>
        </a></div>`, true);
        }

        // load window
        const navItems = $('.sidebar nav .item')
        $(window).on('load', async () => {
            const loading = $('.loading')
            await $.timeout(async () => {
                await loading.style({
                    opacity: 0
                })
                await $.timeout(async () => {
                    await loading.remove();
                }, 500)
            }, 500)
            await $.timeout(async () => {
                $('.animated').addClass('animate');
            }, 500)
            await $.storage({
                method: 'get',
                name: 'router',
                success: async (res) => {
                    if (res !== '') {
                        await router(res);
                        navItems.each(item => {
                            const attr = $(item).select('a').getattr('href');
                            if (attr === res) {
                                navItems.removeClass('active')
                                $(item).addClass('active')
                            }
                        })
                    }
                }
            })
        })
        const searchListData = [
            {name: 'company', title: 'Futureswipe', location: ''},
            {name: 'company', title: 'Futureswipe', location: ''},
            {name: 'company', title: 'new Company', location: ''},
            {name: 'company', title: 'Futureswipe', location: ''},
            {name: 'company', title: 'Futureswipe', location: ''},
            {name: 'company', title: 'Futureswipe', location: ''},
            {name: 'company', title: 'Futureswipe', location: ''},
        ];
        await search();

        // loops ajax data
        for (let i = 0; i < options.ajax_data.length; i++) {
            const json = options.ajax_data[i];
            await addItem({
                url: json.url.get,
                path: json.path,
                urls: json.url
            })
            await tableHead({
                path: json['path'].select('thead'),
                data: json['head']
            })
        }

        // loop modal data
        for (let i = 0; i < options.modal.length; i++) {
            const jsonData = options.modal[i];
            let list = {};
            for (let j = 0; j < jsonData.data.length; j++) {
                const json = jsonData.data[j];
                const id = `${jsonData['name']}-${json['id']}`;
                if (json['type'] !== 'select') {
                    const inG = $.create('div');
                    $(inG).className('input-group')
                    $(inG).inner(`<input autocomplete="off" id="${id}" type="${json['type']}" class="form-control" placeholder="${json['placeholder']}"><label for="${id}"></label>`);
                    jsonData['path'].select('.card-body').append(inG, 'child')
                    $(inG).select('input').on('keyup, change', () => {
                        list[json['id']] = (json['id'] === 'residue' || json['id'] === 'price'
                            || json['id'] === 'priceall' || json['id'] === 'count')
                            ? Number($(inG).select('input').val())
                            : $(inG).select('input').val();
                        console.log(list)
                    })
                } else {
                    const select = $.create('select');
                    select.name = 'select';
                    select.id = id;
                    $(select).className('form-control')
                    await $.get({
                        url: json['get'],
                        success: async (res) => {
                            for (let k = 0; k < res.length; k++) {
                                const resJ = res[k];
                                $(select).inner(`<option value="${resJ['id']}">${resJ[json['searchBy']]}</option>`, true)
                                list[json['id']] = Number(select.options[select.selectedIndex].value)
                            }
                        }
                    })
                    jsonData['path'].select('.card-body').append(select, 'child')
                    // jsonData['path'].append(select, 'child')
                    $(select).on('change', async () => {
                        list[json['id']] = Number($(select).val());
                    })
                }
            }
            jsonData['path'].select('.card-footer .btn').on('click', async () => {
                if (jsonData['path'].selectAll('input').find(a => a.value === '')) {
                    await alertInfo("Barchasi to'ldirilmadi")
                } else {
                    await alertInfo("Qo'shildi")
                    await closeModal(jsonData['path'])
                    await createItem({
                        url: `/${jsonData.name}/create/`,
                        data: list,
                        path: $(`section#${jsonData['append']}`),
                        res: async (res) => {
                            console.log(res)
                            if (jsonData['name'] === 'order') {
                                await $.get({
                                    url: '/product/',
                                    success: async (resp) => {
                                        const result = resp.reduce(function (r, a) {
                                            r.category = r.category || [];
                                            r.category.push(a);
                                            return r;
                                        }, Object.create(null));
                                        console.log(result[res['category']]);
                                        const modal = $('#order-item-modal')
                                        modal.select('h3').inner(res['category'])
                                        await openModal(modal);
                                    }
                                })
                            }
                        }
                    })
                    await clearCache();
                }
            })
        }

        // time manager
        await $('.time-control').inner(await timeManager());
        await $.interval(async () => {
            $('.time-control').inner(await timeManager());
        }, 1000)

        // bars for menu
        $('.bar').on('click', async () => {
            const sidebar = $('.sidebar');
            sidebar.toggleClass('min')
            if (sidebar.hasClass('min')) {
                $('.bar svg').style({
                    transform: 'rotate(180deg)'
                })
            } else {
                $('.bar svg').style({
                    transform: 'rotate(0)'
                })
            }
        })

        // change window
        navItems.on('click', async function (e) {
            e.preventDefault();
            const attr = $(this).select('a').getattr('href');
            navItems.parent().select('.item.active').removeClass('active')
            $(this).addClass('active');
            await router(attr)
            // history.pushState('', 'asd', attr)
        })

// notification
        $('.notification-btn').on('click', async () => {
            await notification()
        })

        async function router(id) {
            await $.storage({
                data: id,
                name: 'router',
                method: 'set',
            })
            await $.storage({
                name: 'router',
                method: 'get',
                success: (res) => {
                    $('section').addClass('d-none');
                    $(`section${res}`).removeClass('d-none')
                    const add = $('.side-main .add');
                    add.setattr('data-target', res + '-modal')
                    if (res !== '#dashboard') {
                        add.addClass('active')
                        add.removeClass('d-none')
                    } else {
                        add.addClass('d-none')
                    }
                }
            })
        }

        async function alertInfo(data) {
            const alert = $('.alert-info');
            await alert.removeClass('show')
            await alert.select('p').inner(data);
            await alert.addClass('show');
            await $.timeout(async () => {
                alert.removeClass('show')
            }, 3000)
        }

        async function notification() {
            await $.get({
                url: '/birthday/',
                success: async (res) => {
                    if (res.length !== 0) {
                        for (let i = 0; i < res.length; i++) {
                            const json = res[i];
                            const item = $.create('div');
                            $(item).className('item round-2');
                            $(item).inner(`<p class="mb-1">Bugun ${json['name']}ning tug'ilgan kuni</p>
                    <small>${json['phone']}</small>`);
                            $('.notification-list').append(item, 'child')
                        }
                    } else {
                        await alertInfo("Xabarlar mavjud emas!");
                    }
                }
            })
        }

        async function createItem({
                                      data, url, path, res = async () => {
            }
                                  }) {
            await ajax({
                type: "application/json",
                data: data,
                url: url,
                cb: async (resp) => {
                    await res(resp);
                    path.select('tbody').inner('')
                    await addItem({
                        url: `/${url.split('/')[1]}/`,
                        path: path
                    })
                }
            })
        }

        async function tableHead({path, data}) {
            const tr = $.create('tr');
            for (let i = 0; i < data.length; i++) {
                const json = data[i];
                const th = $.create('th');
                $(th).className(i === 0 ? 'min' : '')
                $(th).inner(json);
                $(tr).append(th, 'child')
            }
            $(tr).inner('<th class="min"><i class="fas fa-ellipsis-h"></i></th>', true)
            path.append(tr, 'child')
        }

        async function search() {
            const search = $('#search');
            const searchList = $('.search-list');
            let listH = 0;
            for (let i = 0; i < searchListData.length; i++) {
                const json = searchListData[i];
                const item = $.create('div');
                $(item).className('item');
                $(item).inner(`<h3 class="mb-1">${json['title']}</h3>
                        <p>${json['name']}</p>`)
                searchList.append(item, 'child')
                search.on('keyup', async () => {
                    if (search.val() === '') {
                        searchList.style({
                            height: $(item).scrollHeight() + 'px'
                        })
                    }
                    if (json['title'].toUpperCase().indexOf(search.val().toUpperCase()) >= 0) {
                        $(item).style({
                            display: 'block'
                        })
                        searchList.style({
                            height: $(item).scrollHeight() + 'px'
                        })
                    } else {
                        $(item).style({
                            display: 'none'
                        })
                    }
                })
            }
        }

        async function addItem({url, path, urls}) {
            $.get({
                url: url,
                success: async (resp) => {
                    const res = resp.sort((a, b) => b['id'] - a['id']);
                    path.select('tbody').inner('')
                    for (let i = 0; i < res.length; i++) {
                        const json = res[i];
                        const tr = $.create('tr');
                        const dataItemsArray = [];
                        const array = [];
                        $(tr).inner(`<th>${i + 1}</th>`)
                        for (const jsonKey in json) {
                            const dataItemsList = {}
                            const arrayList = {};
                            if (jsonKey !== 'id' && jsonKey !== 'created') {
                                const th = $.create('th');
                                // await $(th).inner(json[jsonKey] !== null ? json[jsonKey] : '<i class="fas fa-minus"></i>')
                                await $(th).inner(json[jsonKey])
                                await $(tr).append(th, 'child');
                                dataItemsList['edit'] = true;
                                dataItemsList['obj'] = th;
                                const isNum = (jsonKey === 'tel' || jsonKey === 'phone' || jsonKey === 'price'
                                    || jsonKey === 'priceall' || jsonKey === 'id');
                                const isDate = (jsonKey === 'tel' || jsonKey === 'phone');
                                dataItemsList['type'] = jsonKey;
                                dataItemsList['inp-type'] = isNum ? 'number' : isDate ? 'date' : 'text';
                                dataItemsList['url'] = jsonKey === 'position' ? '/service/' : '';
                                dataItemsList['id'] = json['id'];
                                arrayList['url-path'] = url;
                                arrayList['path'] = path;
                                arrayList['urls'] = urls;
                                arrayList['id'] = json['id'];
                                if (array.length < 1) {
                                    array.push(arrayList)
                                }
                                dataItemsArray.push(dataItemsList)
                            }
                        }

                        await controlButtons({
                            parent: $(tr),
                            array: dataItemsArray,
                            urlArray: array
                        })
                        path.select('tbody').append(tr, 'child')
                    }
                }
            })
        }

        async function controlButtons({parent, array, urlArray}) {
            const btn = $.create('button');
            const th = $.create('th');
            $(btn).className('btn option');
            $(btn).inner('<i class="far fa-cog"></i>')
            $(th).append(btn, 'child')
            parent.append(th, 'child');
            const modal = $('#option-modal');
            const opt = [];
            const trashList = {};
            let trashArray = [];
            let saveArray = [];
            let saveList = {};
            $(btn).on('click', async () => {
                modal.select('.card-body').inner('')
                let input = [];
                let keys = [];
                for (let i = 0; i < array.length; i++) {
                    const json = array[i];
                    if (json['edit'] === true) {
                        const inG = $.create('div');
                        opt.push(json['obj'])
                        $(inG).className('input-group');
                        if (json['url']) {
                            $(inG).inner('<select class="form-control"></select>');
                            console.log($(inG))
                            $.get({
                                url: json['url'],
                                success: async (res) => {
                                    for (let j = 0; j < res.length; j++) {
                                        $(inG).select('select').inner(`<option value="${res[j]['id']}">${res[j]['title']}</option>`, true)
                                    }
                                    const inp = $(inG).select('select')
                                    saveList[json['type']] = inp[0].options[inp[0].selectedIndex].value;
                                    inp.on('change', async () => {
                                        saveList[json['type']] = inp[0].options[inp[0].selectedIndex].value;
                                        console.log(saveList)
                                    })
                                    input.push(inp)
                                }
                            })
                        } else {
                            $(inG).inner(`<input value="${$(json['obj']).text()}" class="form-control" type="${json['inp-type']}">`)
                            const inp = $(inG).select('input');
                            saveList[json['type']] = inp.val();
                            input.push(inp)
                        }
                        modal.select('.card-body').append(inG, 'child')
                        keys.push(json['type'])
                    }
                }
                if (saveArray.length === 0) {
                    saveArray.push(saveList)
                } else {
                    saveArray = [];
                    saveArray.push(saveList)
                }
                await editItem({
                    modal: modal,
                    lists: saveArray,
                    inp: input,
                    key: keys
                })
                await openModal(modal)
                trashList['url-path'] = urlArray[0]['url-path']
                trashList['id'] = urlArray[0]['id']
                trashList['path'] = urlArray[0]['path']
                trashList['urls'] = urlArray[0]['urls']
                if (trashArray.length === 0) {
                    trashArray.push(trashList)
                } else {
                    trashArray = [];
                    trashArray.push(trashList)
                }
            })
            modal.select('.card-footer .btn').not('trash').on('click', async () => {
                const ins = modal.selectAll('input');
                if (ins.find(i => i.value === '')) {
                    await alertInfo("Barchasi to'ldirilmadi")
                } else {
                    await alertInfo("O'zgartirildi")
                    await closeModal(modal)
                    const filter = [];
                    for (const key in saveArray[0]) {
                        filter.push({
                            [key]: saveArray[0][key]
                        })
                    }
                    if (filter.length)
                        for (let i = 0; i < filter.length; i++) {
                            const json = filter[i];
                            for (const jsonKey in json) {
                                $(opt[i]).inner(json[jsonKey])
                            }
                        }
                    if (saveArray.length && trashArray[0]['urls']['update'] !== undefined) {
                        console.log(saveArray)
                        await saveItem({
                            url: trashArray[0]['urls']['update'] + trashArray[0]['id'] + '/',
                            data: saveArray[0]
                        })
                        await clearCache();
                    }
                }
            })
            modal.select('.card-footer .btn.trash').on('click', async () => {
                if (trashArray.length > 0) {
                    await removeItem({
                        url: trashArray[0]['urls']['delete'] + trashArray[0]['id'] + '/',
                        cb: async () => {
                            await addItem({
                                url: trashArray[0]['url-path'],
                                path: trashArray[0]['path'],
                                urls: trashArray[0]['urls'],
                            }).then(async () => {
                                await alertInfo("O'chirildi!")
                                await closeModal(modal);
                                trashArray = [];
                            })
                        }
                    })
                }
            })
        }

        async function openModal(modal) {
            modal.style({
                display: 'flex',
            })
            await $.timeout(async () => {
                modal.addClass('show')
            }, 250)

        }

        async function closeModal(modal) {
            await modal.removeClass('show');
            await $.timeout(async () => {
                modal.style({
                    display: 'none',
                })
            }, 250)
        }

        async function removeItem({url, cb}) {
            $.post({
                url: url,
                credentials: 'include'
            }).then(() => cb())
        }

        async function editItem({key, inp, lists, modal}) {
            for (let i = 0; i < inp.length; i++) {
                const input = inp[i];
                input.on('keyup', async () => {
                    if (input.val() === '') {
                        await modal.select('.card-footer .btn').addClass('disabled')
                    } else {
                        await modal.select('.card-footer .btn').removeClass('disabled')
                        lists[0][key[i]] = input.val();
                    }
                })
            }
        }

        async function saveItem({data, url}) {
            $.post({
                url: url,
                dataType: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(data)
            })
        }

        async function ajax({
                                type, data, url, cb = async () => {
            }
                            }) {
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": type,
                },
                credentials: "include",
                body: JSON.stringify(data),
            }).then(res => res.json()).then(res => {
                cb(res)
            })
        }

        async function timeManager() {
            const hour = new Date().getHours();
            const minutes = new Date().getMinutes();
            const seconds = new Date().getSeconds();
            const date = new Date().getDate();
            const month = new Date().getMonth();
            const years = new Date().getFullYear();
            return `<span>${date < 10 ? '0' + date : date}.${month < 10 ? '0' + month : month}.${years < 10 ? '0' + years : years}</span>
            <span>${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}</span>`
        }

        async function observer({obj, to}) {
            obj.scrollTo({
                top: to,
                behavior: 'smooth'
            })
        }

        async function clearCache() {
            $('input').val('')
        }
    }
)