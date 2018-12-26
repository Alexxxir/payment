const adminApp = angular.module("adminApp", []);

adminApp.controller('adminAppCtrl', function($scope) {});
let [sortCard, sortReq, searchCard, searchReq] = ["", "", "", ""];

$(function() {
    $("#from-request").load('/admin/from_request');
    $("#from-card").load('/admin/from_card');
    $("#request-select").load('/admin/request_select');
    $("#card-select").load('/admin/card_select');
});

function isSafeChange(pk) {
    if (sortCard) {
        if (searchCard) {
            $("#from-card").load(`/admin/from_card/?change=${pk}&sort=${sortCard}&search=${searchCard}`);
        } else {
            $("#from-card").load(`/admin/from_card/?change=${pk}&sort=${sortCard}`);
        }
    } else {
        if (searchCard) {
            $("#from-card").load(`/admin/from_card/?change=${pk}&search=${searchCard}`);
        } else {
            $("#from-card").load(`/admin/from_card/?change=${pk}`);
        }
    }
}

function cardSort(field) {
    sortCard = field;
    if (searchCard) {
        $("#from-card").load(`/admin/from_card/?sort=${field}&search=${searchCard}`);
    } else {
        $("#from-card").load(`/admin/from_card/?sort=${field}`);
    }
}

function requestSort(field) {
    sortReq = field;
    if (searchReq) {
        $("#from-request").load(`/admin/from_request/?sort=${field}&search=${searchReq}`);
    } else {
        $("#from-request").load(`/admin/from_request/?sort=${field}`);
    }
}

$(function() {
    $('input[type="text"]').on("keyup change", function () {
        let is_checked = document.getElementById("ask").checked;
        if (is_checked) {
            let input = document.getElementById("card-search");
            let select = document.getElementById("card-select");
            let value = input.value.split(' ').join('+') + "|" + select.value;
            searchCard = value;
            if (sortCard) {
                $("#from-card").load(`/admin/from_card/?search=${value}&sort=${sortCard}`);
            } else {
                $("#from-card").load(`/admin/from_card/?search=${value}`);
            }
        } else {
            let input = document.getElementById("request-search");
            let select = document.getElementById("request-select");
            let value = input.value.split(' ').join('+') + "|" + select.value;
            searchReq = value;
            if (sortReq) {
                $("#from-request").load(`/admin/from_request/?search=${value}&sort=${sortReq}`);
            } else {
                $("#from-request").load(`/admin/from_request/?search=${value}`);
            }
        }
    });
});
