var gTrans = {
    title: {
        en: 'Book Shop',
        he: 'חנות ספרים'
    },
    'add-butt': {
        en: 'Create new book',
        he: 'הוספת ספר',
    },
    'title-id': {
        en: 'id',
        he: 'מזהה',
    },
    'title-name': {
        en: 'Name',
        he: 'שם'
    },
    'title-price': {
        en: 'Price',
        he: 'מחיר',
    },
    'title-actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    'butt-read': {
        en: 'Read',
        he: 'קרא עוד',
    },
    'butt-update': {
        en: 'Update',
        he: 'עדכן',
    },
    'butt-delete': {
        en: 'Delete',
        he: 'מחק',
    },
    'input-name-placeholder': {
        en: 'Book Name',
        he: 'שם הספר'
    }, 'input-price-placeholder': {
        en: 'Price - $',
        he: '$ - מחיר'
    }, 'prev-page': {
        en: 'Prev Page',
        he: 'העמוד הקודם'
    }, 'next-page': {
        en: 'Next Page',
        he: 'העמוד הבא'
    }
}

var gCurrLang = 'en'

function setLang(lang) {
    gCurrLang = lang
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        console.log(el, 'EL');
        var transKey = el.dataset.trans
        var txt = getTrans(transKey);
        console.log(el.nodeName, 'node')
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    })
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';
    var txt = keyTrans[gCurrLang];

    // if not found return en
    if (!txt) txt = keyTrans['en'];
    return txt;
}

function getPrice(price) {
    if (gCurrLang === 'he') {
        price = price * 3.2
        return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(price);
    } else if (gCurrLang === 'en') {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    }

}

