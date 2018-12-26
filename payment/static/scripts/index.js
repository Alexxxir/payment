var myApp = angular.module("myApp", []);

myApp.controller('myAppCtrl', function($scope) {});

jQuery(function($) {
    $('#own-bank-form').on('keyup click focus', function(event) {
        let submit = $('#own-bank');
        $('#own-bank-nds').toggleClass('ok', true);
        if ( validateForm() ) {
            event.preventDefault();
            submit.prop('disabled',true);
        } else {
            submit.prop('disabled',false);
        }
    });

    function validateForm() {
        $(".text-error").remove();
        let inn = $("#own-bank-inn");
        let vInn = false;
        if ( inn.val().length !== 10 && inn.val().length !== 12 || !Number(inn.val()) ) {
            vInn = true;
            if (inn.val().length !== 0) {
                inn.after('<span class="text-error for-inn">ИНН должен содержать 10 или 12 цифр</span>');
                $(".for-inn").css({top: inn.position().top + inn.outerHeight() - 10,
                                         left: inn.position().left - 290});
                $("#own-bank-inn").toggleClass('error', true );
                $("#own-bank-inn").toggleClass('ok', false );
            } else {
                $("#own-bank-inn").toggleClass('error', false );
                $("#own-bank-inn").toggleClass('ok', false );
            }
        } else {
            $(".for-inn").css({top: inn.position().top + inn.outerHeight() + 2});
            $("#own-bank-inn").toggleClass('ok', true );
            $("#own-bank-inn").toggleClass('error', false );
        }

        let bik = $("#own-bank-bik");
        let vBik = false;
        if ( bik.val().length !== 9 || !Number(bik.val())) {
            vBik = true;
            if (bik.val().length !== 0) {
                bik.after('<span class="text-error for-bik">БИК должен содержать 9 цифр</span>');
                $(".for-bik").css({top: bik.position().top + bik.outerHeight() - 10,
                                         left: bik.position().left - 290});
                $("#own-bank-bik").toggleClass('error', true );
                $("#own-bank-bik").toggleClass('ok', false );
            } else {
                $("#own-bank-bik").toggleClass('error', false );
                $("#own-bank-bik").toggleClass('ok', false );
            }
        } else {
            $(".for-bik").css({top: bik.position().top + bik.outerHeight() + 2});
            $("#own-bank-bik").toggleClass('ok', true );
            $("#own-bank-bik").toggleClass('error', false );
        }

        let acc = $("#own-bank-acc");
        let vAcc = false;
        if ( acc.val().length !== 20 || !Number(acc.val())) {
            vAcc = true;
            if (acc.val().length !== 0) {
                acc.after('<span class="text-error for-acc">Номер счёта должен содержать 20 цифр</span>');
                $(".for-acc").css({top: acc.position().top + acc.outerHeight() - 10,
                                         left: acc.position().left - 290});
                $("#own-bank-acc").toggleClass('error', true );
                $("#own-bank-acc").toggleClass('ok', false );
            } else {
                $("#own-bank-acc").toggleClass('error', false );
                $("#own-bank-acc").toggleClass('ok', false );
            }
        } else {
            $(".for-acc").css({top: acc.position().top + acc.outerHeight() + 2});
            $("#own-bank-acc").toggleClass('ok', true );
            $("#own-bank-acc").toggleClass('error', false );
        }

        let count = $("#own-bank-count");
        let vCount = false;
        if ( !Boolean(count.val()) || count.val() < 1000 || count.val() > 75000) {
            vCount = true;
            if (Boolean(count.val())) {
                count.after('<span class="text-error for-count">Должно быть от 1000 до 75000</span>');
                $(".for-count").css({top: count.position().top + count.outerHeight() - 10,
                                         left: count.position().left - 290});
                $("#own-bank-count").toggleClass('error', true );
                $("#own-bank-count").toggleClass('ok', false );
            } else {
                $("#own-bank-count").toggleClass('error', false );
                $("#own-bank-count").toggleClass('ok', false );
            }
        } else {
            $(".for-count").css({top: count.position().top + count.outerHeight() + 2});
            $("#own-bank-count").toggleClass('ok', true );
            $("#own-bank-count").toggleClass('error', false );
        }

        return ( vInn | vBik | vAcc | vCount);
    }
});