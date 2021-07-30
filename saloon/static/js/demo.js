$(document).fsReady(async () => {
    for (let i = 0; i < webOptions.ajax_data.length; i++) {
        const jsonData = webOptions.ajax_data[i];
        await tableHeadView(jsonData.path, jsonData.head)
        await addForView(jsonData.url.get, jsonData.path)
    }
    for (let i = 0; i < webOptions.modal.ajax_data.length; i++) {
        const jsonData = webOptions.modal.ajax_data[i];
        const listData = {};
        for (let j = 0; j < jsonData.data.length; j++) {
            const ids = {
                unit: 0,
                category: 0,
                company: 0,
                customer: 0,
                worker: 0
            }
            const json = jsonData.data[j];
            const inGroup = $.create('div');
            $(inGroup).className(json.select === true ? 'input-group select-item relative' : json.list === true ? 'list-modal' : 'input-group relative');
            if (json.select === undefined && json.list === undefined) {
                const inId = `${jsonData.name}-${json['id']}`;
                $(inGroup).inner(`<input id="${inId}" placeholder="${json['placeholder']}" autocomplete="off" class="form-control fw-bold t-dark w-100" type="${json['type']}"> 
<label for="${inId}" class="absolute"><i class="${webOptions.modal.iconType} fa-${json['icon']}"></i></label>`)
                $(inGroup).select(`#${inId}`).on('keyup, change', function () {
                    listData[json['id']] = $(this).val();
                })
            }
            if (json.select === true) {
                const getBtn = $.create('button');
                $(getBtn).className('get');
                $(getBtn).inner('<i class="fas fa-angle-down"></i>')
                $(inGroup).inner(`<p class="form-control pl-3" style="max-width: 100%; width: 100%;">${json['placeholder']}</p>`, true);
                $(inGroup).append(getBtn, 'child')
                $(inGroup).inner(`<div class="lists"></div>`, true)
                const get = $(inGroup).select('.get')
                get.on('click', async () => {
                    console.log(get)
                    const lists = get.next();
                    await $(inGroup).select('.lists').inner('')
                    await $.get({
                        url: json.get,
                        success: async (res) => {
                            for (let f = 0; f < res.length; f++) {
                                const pItem = $.create('p');
                                $(pItem).className('item');
                                await $(pItem).inner(res[f][json.searchBy])
                                await lists.append(pItem, 'child')
                                $(pItem).on('click', async () => {
                                    ids[json.setTo] = res[f]['id'];
                                    if (json['id'] === 'position' || json['id'] === 'measurement' || json['id'] === 'category' || json['id'] === 'company' ||
                                        json['id'] === 'unit' || json['id'] === 'worker' || json['id'] === 'customer' || json['id'] === 'withcompany')
                                        listData[json['id']] = ids[json.setTo];
                                    await $(inGroup).select('p.form-control').inner($(pItem).text())
                                    await lists.toggleClass('show')
                                })
                            }
                            await lists.property('--h', $(inGroup).select('.lists').h('scroll') + 5 + 'px');
                            await lists.toggleClass('show')
                        }
                    })
                })
            }
            jsonData.path.append(inGroup, 'child');
        }
        jsonData.path.next().select('.btn').on('click', async () => {
            if (jsonData.name !== 'order-item') {
                await createData(listData, `/${jsonData.name}/create/`, $(`section#${jsonData.append}`), async (res) => {
                })
            }
        })
    }

    async function getAjax(url, res = async () => {
    }) {
        $.get({
            url: url,
            success: async (resp) => res(resp)
        })
    }

    async function addForView(url, path) {
        await getAjax(url, async (res) => {
            const filter = res.sort((a, b) => {
                return b['id'] - a['id']
            })
            for (let i = 0; i < filter.length; i++) {
                const resData = filter[i];
                const tr = $.create('tr');
                $(tr).inner(`<th>${i + 1}</th>`)
                for (const resDataKey in resData) {
                    const th = $.create('th');
                    await $(th).setattr('type', true, (resDataKey === 'position' || resDataKey === 'measurement' || resDataKey === 'company'
                        || resDataKey === 'category') ? 'select' : (resDataKey === 'price' || resDataKey === 'tel' || resDataKey === 'priceall' || resDataKey === 'residue'
                        || resDataKey === 'phone') ? 'number' : 'text')
                    await $(th).setattr('url', true, resDataKey === 'position' ? '/service/' : resDataKey === 'measurement' ? '/unit/'
                        : resDataKey === 'company' ? '/company/' : resDataKey === 'category' ? '/service/' : '')
                    if (resDataKey !== 'id' && resDataKey !== 'created') {
                        $(th).inner(resData[resDataKey])
                        await $(tr).append(th, 'child');
                    }
                }
                $(tr).inner(`<th class="d-flex ai-center gap-1">
                                      ${url.search('order') >= 0 ? `<button class="view-btn btn bg-primary ripple btn-active t-white px-4 py-2 round-1"><i class="fas fa-eye"></i></button>` : ''}
                                      <button class="edit-btn btn bg-main-green ripple btn-active t-white px-4 py-2 round-1"><i class="fas fa-edit"></i></button>
                                      <button class="trash-btn btn bg-danger ripple btn-active t-white px-4 py-2 round-1"><i class="fas fa-trash"></i></button>
                                      <button class="save-btn d-none btn bg-main ripple btn-active t-white px-4 py-2 round-1"><i class="fas fa-save"></i></button>
                                      </th>`, true)
                path.select('tbody').append(tr, 'child');
            }
        })
    }

    async function tableHeadView(path, data) {
        const tr = $.create('tr');
        for (let i = 0; i < data.length; i++) {
            const head = data[i];
            $(tr).inner(`<th>${head}</th>`, true)
            path.select('thead').append(tr, 'child');
        }
        path.select('thead tr').inner(`<th><i class="fas fa-ellipsis-h"></i></th>`, true)
    }

    async function createData(data, url, path, res = async () => {
                              }
    ) {
        await fetch(url, {
            method: "POST", headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then(res => {
            try {
                res.json()
            } catch (error) {

            }
        }).then(resp => {
            res(resp);
            path.select('tbody').inner('')
            console.log(`/${url.split('/')[1]}/`, path)
            addForView(`/${url.split('/')[1]}/`, path)
        })
    }
})