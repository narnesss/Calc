




var calcs = [];

var selectIndexCalc = 0;
var selectTypeCalc;                        // выбранный калькулятор
var listCalcs = [];                        // список имеющихся калькуляторов
var listElemsConstructor = [];

var id_div_container = "#container";
var id_div_TypesCalcs = "#typeCalcs";
var id_div_ListElemCalcs = "#elementsCalcs";
var id_div_Constructor = "#constructor";
var id_div_Result = "#div_result";

var url_edit_ajax= "editCalcAjax";

// Получение пользовательских калькуляторов
function loadUserCalcs() {

    // for (var i = 0; i < listCalcs.length; i++)
    //     loadCalc(listCalcs[i]);

    $(id_div_TypesCalcs).text("Загрузка пользовательских калькуляторов...");
    var search = { query: "GET", typeCalc: "ALL" };         // запрос для сервера

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: url_edit_ajax,
        data : JSON.stringify(search),
        dataType : 'json',
        //async: false,
        success: function (data) {
            console.log("SUCCESS: ", data);
            userCalcs = JSON.parse(JSON.stringify(data, null, 4));
            displayUserCalcs(); // получаю list_displayUserCalcs
        },
        error: function (e) { console.log("ERROR: ", e); },
        done: function (e) { console.log("DONE: ", e); }
    });
}

function loadDefaultCalc() {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: url_edit_ajax,
        success: function (data) {
            console.log("SUCCESS: ", data);
            var listCalcs = JSON.parse(JSON.stringify(data, null, 4));

            for (var i = 0; i < listCalcs.length; i++) {
                var search = { typeCalc: listCalcs[i], query: "GET" };

                $.ajax({
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    url: url_edit_ajax,
                    data : JSON.stringify(search),
                    dataType : 'json',
                    async: false,
                    success: function (data) {
                        console.log("SUCCESS: ", data);
                        calcs[search.typeCalc] = JSON.parse(JSON.stringify(data, null, 4));
                    },
                    error: function (e) { console.log("ERROR: ", e); },
                    done: function (e) { console.log("DONE: ", e); }
                });
            }
            console.log(calcs);
        },
        error: function (e) { console.log("ERROR: ", e); },
        done: function (e) { console.log("DONE: ", e); }
    });
}
function loadDefaultCalc1() {

    console.log(list_displayUserCalcs);
    var list1 = unique(list_displayUserCalcs);
    console.log(list1);

    for (var i = 0; i < list1.length; i++) {
        var type = list1[i];
        var search = {typeCalc: type, query: "GET"};
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: url_edit_ajax,
            data: JSON.stringify(search),
            dataType: 'json',
            success: function (data) {
                console.log("SUCCESS: ", data);
                calcs[type] = JSON.parse(JSON.stringify(data, null, 4));
            },
            error: function (e) { console.log("ERROR: ", e); },
            done: function (e) { console.log("DONE: ", e); }
        });
    }
}

var list_displayUserCalcs = [];
// отображение калькуляторов
function displayUserCalcs() {
    $(id_div_TypesCalcs).empty();
    $(id_div_ListElemCalcs).empty();
    $(id_div_Constructor).empty();
    $(id_div_Result).empty();

    // создание и заполнение блока
    var mainDiv = $('<div>', {class: ""});
    for (var i = 0; i < userCalcs.length; i++) {
        console.log(userCalcs[i]);

        var idCalc = userCalcs[i].calcId;

        var div = $('<div id="userCalc' + i + '">', { class: "" /*, text: userCalcs[i].name*/});
        var divSave = $('<button id="' + i + '" onclick="displayUserCalc(id);">' + userCalcs[i].name + '</button>');
        var divEdit = $('<button id="' + i + '" onclick="editUserCalc(id);">Редактировать</button>');
        var divDel = $('<button id="' + i + '" onclick="deleteUserCalc(id);">Удалить</button>');
        var divCode = $('<button id="' + idCalc + '" onclick="displayCode(id);">Код</button>');

        var modalCode =
            $('<div id="modal' + idCalc + '" class="modal_window" style="display: none;">' +
                    '<h2 class="modal_h2">Данные калькулятора</h2>' +
                    '<a id="' + idCalc + '" class="modal_close" onclick="closeCode(id);">x</a>' +
                    '<div class="modal_content">' +
                        '<div id="code' + idCalc + '"></div>' +
                        '<div>Скачатйте и подключите следующие файлы на стороннем сайте: ' +
                            '<a name="/resources/js/calc.js" onclick="downloadFile(name);" style="color: black;">calc.js</a>' +
                            '<a name="/resources/js/class.css" onclick="downloadFile(name);" style="color: black;">class.css</a>' +
                        '</div>' +
                    '</div>' +
                '</div>');

        $('body').append(modalCode);
        $('div#code' + idCalc).text('Добавте следующий код на страницу стороннего сайта: <div class="calc" id="' + idCalc + '"></div>');


        div.append(divSave).append(divEdit).append(divDel).append(divCode);
        mainDiv.append(div);
        list_displayUserCalcs.push(userCalcs[i].type);
    }
    mainDiv.appendTo(id_div_TypesCalcs);
}

function closeCode(id) {
    $('#modal' + id).css('display', 'none');
}

function displayCode(id) {
    var m = '#modal' + id;
    var modal = $(m)[0];

    var winH = $(window).height();
    var winW = $(window).width();

    //Set the popup window to center
    $(modal).css('top',  winH/2-$(modal).height()/2);
    $(modal).css('left', winW/2-$(modal).width()/2);
    $(modal).css('display', 'block');
}

window.downloadFile = function (sUrl) {

    //iOS devices do not support downloading. We have to inform user about this.
    if (/(iP)/g.test(navigator.userAgent)) {
        alert('Your device does not support files downloading. Please try again in desktop browser.');
        return false;
    }

    //If in Chrome or Safari - download via virtual link click
    if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
        //Creating new link node.
        var link = document.createElement('a');
        link.href = sUrl;

        if (link.download !== undefined) {
            //Set HTML5 download attribute. This will prevent file from opening if supported.
            var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
            link.download = fileName;
        }

        //Dispatching click event.
        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }

    // Force file download (whether supported by server).
    if (sUrl.indexOf('?') === -1) {
        sUrl += '?download';
    }

    window.open(sUrl, '_self');
    return true;
};

window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

function unique(arr) {
    var obj = {};

    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true; // запомнить строку в виде свойства объекта
    }

    return Object.keys(obj); // или собрать ключи перебором для IE8-
}

// отображение элементов выбранного калькулятора
function displayUserCalc(index) {
    selectIndexCalc = index;
    selectTypeCalc = $(userCalcs)[index].type;
    console.log(selectIndexCalc);
    console.log(selectTypeCalc);
    displayConstructorCalc();
}
function editUserCalc(index) {

    $(id_div_ListElemCalcs).empty();
    $(id_div_Constructor).empty();
    $(id_div_Result).empty();
    listElemsConstructor.splice(0, listElemsConstructor.length);

    selectIndexCalc = index;
    selectTypeCalc = $(userCalcs)[index].type;
    displayElems();

    var list_li = $("#" + id_ul_list_cbs).children('li'); // из main.js
    console.log(list_li);

    for (var i = 0; i < list_li.length; i++) {
        var li = list_li[i];
        var checkbox = $(li).children('input');
        var elems = $(userCalcs[index].elements);
        console.log(checkbox.val());
        console.log(elems);
        for (var j = 0; j < elems.length; j++) {
            if (checkbox.val() == elems[j].idName) {
                checkbox.prop('checked', true);
                listElemsConstructor.push(checkbox.val());
            }
        }
    }
    console.log(listElemsConstructor);
    updateConstructorFromCalc();    // из calc.js
}
function deleteUserCalc(index) {
    var search = {
        typeCalc: $(userCalcs[index])[0].type,
        query: "DEL",
        userId: $(userCalcs[index])[0].userId,
        idCalc: $(userCalcs[index])[0].calcId
    };
    console.log(search);

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: url_edit_ajax,
        data : JSON.stringify(search),
        dataType : 'json',
        success: function (data) {
            success = true;
            console.log("SUCCESS: ", data);
            outputData = JSON.parse(JSON.stringify(data, null, 4));
            $(id_div_Result).empty();
            $("div#userCalc" + index).remove();
            result();
            alert("Калькулятор \"" + $(userCalcs[index])[0].name + "\" удален");
        },
        error: function (data) {
            success = false;
            console.log("ERROR: ", data);
            errorResult = data.responseText;
            $(id_div_Result).empty();
            result();
            alert("Ошибка удаления калькулятора");
        },
        done: function (e) { console.log("DONE: ", e); }
    });
}

var id_ul_list_cbs = "list_cbs";
// Отображение элементов выбранного калькулятора (в checkbox(ы))
function displayElems() {

    $(id_div_ListElemCalcs).empty();
    listElemsConstructor.splice(0, listElemsConstructor.length);

    var start = 0;
    var ul = $('<ul id="list_cbs" class="list1a"></ul>');

    console.log(selectTypeCalc);
    if (selectTypeCalc == "Осаго")
        start = 1;

    console.log(selectTypeCalc);
    console.log(calcs);
    console.log(calcs[selectTypeCalc]);

    // добавление элементов в блок ui
    for (var i = start; i < $(calcs[selectTypeCalc].elements).length; i++) {
        //nameElemCalcs[$(calcs[tCalc])[i].value] = data[i].name;
        console.log($(calcs[selectTypeCalc].elements)[i]);
        var checkbox = $('<li><input  type="checkbox"  name="elemCalc" value="'
            + $(calcs[selectTypeCalc].elements)[i].idName + //id="elemCalc' + i + '"
            '" onclick="checkboxChangeCalc(this);"/><span class="displayElemsselectTypeCalc">' + $(calcs[selectTypeCalc].elements)[i].name + '</span></li>');
        ul.append(checkbox);
    }
    console.log(ul);
    console.log(id_div_ListElemCalcs);
    console.log($(id_div_ListElemCalcs));
    ul.appendTo(id_div_ListElemCalcs);
    // $(id_div_ListElemCalcs).append(ul);
    console.log($(id_div_ListElemCalcs));
}
// Выбор элемента калькулятора
function checkboxChangeCalc(checkbox) {

    (checkbox.checked)
        ? listElemsConstructor.push(checkbox.value)
        : listElemsConstructor.splice(listElemsConstructor.indexOf(checkbox.value), 1);
    updateConstructorFromCalc();
}

function updateConstructorFromCalc() {
    console.log("updateConstructorFromCalc");

    $(id_div_Constructor).empty();  // отчистка блока
    $(id_div_Result).empty();
    outputData = null;
    inputData = null;

    nameCalcFromCalc();

    console.log(selectTypeCalc);
    switch(selectTypeCalc) {
        case "Осаго":
            basicRate();
            elements();
            buttonsFromCalc();
            result();
            break;
        case "Кредит":
        case "Ипотека":
            elements();
            buttonsFromCalc();
            result();
            break;
        default: break;
    }
}



function buttonsFromCalc() {
    console.log("buttonsFromCalc");

    var mainDiv = $('<br><br><br><br><div>', {id: "res", class: "test"});
    var divCompute = $('<div id="computeRes" class="buttonCompute">');
    var divSave = $('<div id="saveRes" class="buttonSave">');
    var buttonSave = $('<button type="submit" id="btnSave" onclick="saveCalcFromCalc();">Сохранить</button>');
    var buttonCompute = $('<button type="submit" id="btnCompute" onclick="computeCalcFromCalc();">Вычислить</button>');
    divCompute.append(buttonCompute);
    divSave.append(buttonSave);

    mainDiv//.append($('<div>', {class: "border", text: p.info}))
    //.append($('<div>', {class: "border", text: p.formula}))
        .append(divCompute).append(divSave).appendTo(id_div_Constructor);
}

// Сохранение калькулятора
function saveCalcFromCalc() {

    var list = [];
    if (selectTypeCalc == "Осаго")
        list.push($(calcs[selectTypeCalc].elements)[0]);
    for (var i = 0; i < listElemsConstructor.length; i++) {
        for (var j = 0; j < $(calcs[selectTypeCalc].elements).length; j++)
            if ($(calcs[selectTypeCalc].elements)[j].idName == listElemsConstructor[i])
                list.push($(calcs[selectTypeCalc].elements)[j]);
    }

    console.log(list);

    var search = { idCalc: $(userCalcs)[selectIndexCalc].calcId, typeCalc: selectTypeCalc,
        query: "UPDATE", list: list , name: $(calcs[selectTypeCalc])[0].name };
    console.log(search);

    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: url_edit_ajax,
        data : JSON.stringify(search),
        dataType : 'json',
        success: function (data) {
            console.log("SUCCESS: ", data);
            $(userCalcs)[selectIndexCalc] = JSON.parse(JSON.stringify(data, null, 4));
            console.log($(userCalcs));
            alert("Изменения сохранены");
            },
        error: function (data) { console.log("ERROR: ", data); alert("Ошибка сохранения изменений");},
        done: function (data) { console.log("DONE: ", data); }
    });

}