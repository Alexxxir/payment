var myApp = angular.module("myApp", []);

myApp.controller('myAppCtrl', function($scope) {});

jQuery(function($) {
    const emailValid = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i;
    $('#own-bank-form').on('keyup click focus', function(event) {
        let submit = $('#own-bank');
        $('#own-bank-nds').toggleClass('ok', true);
        if ( validateOwnBankForm() ) {
            event.preventDefault();
            submit.prop('disabled',true);
        } else {
            submit.prop('disabled',false);
        }
    });

    $('#any-bank-form').on('keyup click focus', function(event) {
        let submit = $('#any-bank');
        if ( validateAnyBankForm() ) {
            event.preventDefault();
            submit.prop('disabled',true);
        } else {
            submit.prop('disabled',false);
        }
    });

    $('#your-bank-form').on('keyup click focus', function(event) {
        let submit = $('#your-bank');
        $('#your-bank-nds').toggleClass('ok', true);
        if ( validateYourBankForm() ) {
            event.preventDefault();
            submit.prop('disabled',true);
        } else {
            submit.prop('disabled',false);
        }
    });

    function validateOwnBankForm() {
        $(".text-error").remove();
        let inn = $("#own-bank-inn");
        let vInn = false;
        if ( inn.val().length !== 10 && inn.val().length !== 12 || !Number(inn.val()) ) {
            vInn = true;
            if (inn.val().length !== 0) {
                inn.after('<span class="text-error for-inn">ИНН должен содержать 10 или 12 цифр</span>');
                $(".for-inn").css({top: inn.position().top + inn.outerHeight() - 7,
                                         left: inn.position().left - 290});
                inn.toggleClass('error', true );
                inn.toggleClass('ok', false );
            } else {
                inn.toggleClass('error', false );
                inn.toggleClass('ok', false );
            }
        } else {
            inn.toggleClass('ok', true );
            inn.toggleClass('error', false );
        }

        let bik = $("#own-bank-bik");
        let vBik = false;
        if ( bik.val().length !== 9 || !Number(bik.val())) {
            vBik = true;
            if (bik.val().length !== 0) {
                bik.after('<span class="text-error for-bik">БИК должен содержать 9 цифр</span>');
                $(".for-bik").css({top: bik.position().top + bik.outerHeight() - 7,
                                         left: bik.position().left - 290});
                bik.toggleClass('error', true );
                bik.toggleClass('ok', false );
            } else {
                bik.toggleClass('error', false );
                bik.toggleClass('ok', false );
            }
        } else {
            bik.toggleClass('ok', true );
            bik.toggleClass('error', false );
        }

        let acc = $("#own-bank-acc");
        let vAcc = false;
        if ( acc.val().length !== 20 || !Number(acc.val())) {
            vAcc = true;
            if (acc.val().length !== 0) {
                acc.after('<span class="text-error for-acc">Номер счёта должен содержать 20 цифр</span>');
                $(".for-acc").css({top: acc.position().top + acc.outerHeight() - 7,
                                         left: acc.position().left - 290});
                acc.toggleClass('error', true );
                acc.toggleClass('ok', false );
            } else {
                acc.toggleClass('error', false );
                acc.toggleClass('ok', false );
            }
        } else {
            acc.toggleClass('ok', true );
            acc.toggleClass('error', false );
        }

        let count = $("#own-bank-count");
        let vCount = false;
        if ( !Boolean(count.val()) || count.val() < 1000 || count.val() > 75000) {
            vCount = true;
            if (Boolean(count.val())) {
                count.after('<span class="text-error for-count">Должно быть от 1000 до 75000</span>');
                $(".for-count").css({top: count.position().top + count.outerHeight() - 7,
                                         left: count.position().left - 290});
                count.toggleClass('error', true );
                count.toggleClass('ok', false );
            } else {
                count.toggleClass('error', false );
                count.toggleClass('ok', false );
            }
        } else {
            count.toggleClass('ok', true );
            count.toggleClass('error', false );
        }

        return ( vInn | vBik | vAcc | vCount );
    }

    function validateAnyBankForm() {
        $(".text-error").remove();
        let num = $("#any-bank-num");
        let vNum = false;
        if ( num.val().length !== 16 || !Number(num.val()) ) {
            vNum = true;
            if (num.val().length !== 0) {
                num.after('<span class="text-error for-num">Номер карты должен содержать 16 цифр</span>');
                $(".for-num").css({top: num.position().top + num.outerHeight(),
                                         left: num.position().left});
                num.toggleClass('error', true );
                num.toggleClass('ok', false );
            } else {
                num.toggleClass('error', false );
                num.toggleClass('ok', false );
            }
        } else {
            num.toggleClass('ok', true );
            num.toggleClass('error', false );
        }

        let info = $("#any-bank-info");
        let vInfo = false;
        if ( info.val().length !== 5 ) {
            vInfo = true;
            if (info.val().length !== 0) {
                info.after('<span class="text-error for-info">ММ/ГГ, ММ от 01 до 12, ГГ от 17 до 35</span>');
                $(".for-info").css({top: info.position().top + info.outerHeight(),
                                          left: info.position().left});
                info.toggleClass('error', true );
                info.toggleClass('ok', false );
            } else {
                info.toggleClass('error', false );
                info.toggleClass('ok', false );
            }
        } else {
            if (info.val()[2] === '/' && Number(info.val().slice(0, 2)) <= 12 &&
                Number(info.val().slice(0, 2)) >= 1 &&
                Number(info.val().slice(3, 5)) >= 17 &&
                Number(info.val().slice(3, 5)) <= 35) {
                info.toggleClass('ok', true );
                info.toggleClass('error', false );
            } else {
                vInfo = true;
                info.after('<span class="text-error for-info">ММ/ГГ, ММ от 01 до 12, ГГ от 17 до 35</span>');
                $(".for-info").css({top: info.position().top + info.outerHeight(),
                                          left: info.position().left});
                info.toggleClass('error', true );
                info.toggleClass('ok', false );
            }
        }

        let cvc = $("#any-bank-cvc");
        let vCvc = false;
        if ( cvc.val().length !== 3 || !Number(cvc.val()) ) {
            vCvc = true;
            if (cvc.val().length !== 0) {
                cvc.after('<span class="text-error for-cvc">CVC 3 цифры</span>');
                $(".for-cvc").css({top: info.position().top + info.outerHeight() + 20,
                                         left: info.position().left});
                cvc.toggleClass('error', true );
                cvc.toggleClass('ok', false );
            } else {
                cvc.toggleClass('error', false );
                cvc.toggleClass('ok', false );
            }
        } else {
            cvc.toggleClass('ok', true );
            cvc.toggleClass('error', false );
        }

        let count = $("#any-bank-count");
        let vCount = false;
        if ( !Boolean(count.val()) || count.val() < 1000 || count.val() > 75000) {
            vCount = true;
            if (Boolean(count.val())) {
                count.after('<span class="text-error for-count">Должно быть от 1000 до 75000</span>');
                $(".for-count").css({top: count.position().top + count.outerHeight() - 2,
                                         left: count.position().left - 150});
                count.toggleClass('error', true );
                count.toggleClass('ok', false );
            } else {
                count.toggleClass('error', false );
                count.toggleClass('ok', false );
            }
        } else {
            count.toggleClass('ok', true );
            count.toggleClass('error', false );
        }

        let email = $("#any-bank-email");
        let vEmail = false;
        if (email.val().length === 0) {
            vEmail = true;
            email.toggleClass('error', false );
            email.toggleClass('ok', false );
        } else if (emailValid.test( email.val() )) {
            email.toggleClass('ok', true );
            email.toggleClass('error', false );
        } else {
            vEmail = true;
            email.after('<span class="text-error for-email">Не корректный email</span>');
            $(".for-email").css({top: email.position().top + email.outerHeight() - 7,
                                     left: email.position().left - 150});
            email.toggleClass('error', true );
            email.toggleClass('ok', false );
        }

        let comment = $("#any-bank-comment");
        comment.toggleClass('ok', true );
        comment.toggleClass('error', false );

        return ( vNum | vInfo | vCvc | vCount | vEmail );
    }

    function validateYourBankForm() {
        $(".text-error").remove();
        let inn = $("#your-bank-inn");
        let vInn = false;
        if ( inn.val().length !== 10 && inn.val().length !== 12 || !Number(inn.val()) ) {
            vInn = true;
            if (inn.val().length !== 0) {
                inn.after('<span class="text-error for-inn-2">ИНН должен содержать 10 или 12 цифр</span>');
                $(".for-inn-2").css({top: inn.position().top + inn.outerHeight() - 7,
                                         left: inn.position().left - 250});
                inn.toggleClass('error', true );
                inn.toggleClass('ok', false );
            } else {
                inn.toggleClass('error', false );
                inn.toggleClass('ok', false );
            }
        } else {
            inn.toggleClass('ok', true );
            inn.toggleClass('error', false );
        }

        let bik = $("#your-bank-bik");
        let vBik = false;
        if ( bik.val().length !== 9 || !Number(bik.val())) {
            vBik = true;
            if (bik.val().length !== 0) {
                bik.after('<span class="text-error for-bik-2">БИК должен содержать 9 цифр</span>');
                $(".for-bik-2").css({top: bik.position().top + bik.outerHeight() - 7,
                                         left: bik.position().left - 250});
                bik.toggleClass('error', true );
                bik.toggleClass('ok', false );
            } else {
                bik.toggleClass('error', false );
                bik.toggleClass('ok', false );
            }
        } else {
            bik.toggleClass('ok', true );
            bik.toggleClass('error', false );
        }

        let acc = $("#your-bank-acc");
        let vAcc = false;
        if ( acc.val().length !== 20 || !Number(acc.val())) {
            vAcc = true;
            if (acc.val().length !== 0) {
                acc.after('<span class="text-error for-acc">Номер счёта должен содержать 20 цифр</span>');
                $(".for-acc").css({top: acc.position().top + acc.outerHeight() - 7,
                                         left: acc.position().left - 250});
                acc.toggleClass('error', true );
                acc.toggleClass('ok', false );
            } else {
                acc.toggleClass('error', false );
                acc.toggleClass('ok', false );
            }
        } else {
            acc.toggleClass('ok', true );
            acc.toggleClass('error', false );
        }

        let count = $("#your-bank-count");
        let vCount = false;
        if ( !Boolean(count.val()) || count.val() < 1000 || count.val() > 75000) {
            vCount = true;
            if (Boolean(count.val())) {
                count.after('<span class="text-error for-count">Должно быть от 1000 до 75000</span>');
                $(".for-count").css({top: count.position().top + count.outerHeight() - 7,
                                         left: count.position().left - 250});
                count.toggleClass('error', true );
                count.toggleClass('ok', false );
            } else {
                count.toggleClass('error', false );
                count.toggleClass('ok', false );
            }
        } else {
            count.toggleClass('ok', true );
            count.toggleClass('error', false );
        }

        let phone = $("#your-bank-phone");
        let phoneValid = /\+\d \d\d\d \d\d\d-\d\d-\d\d/;
        let vPhone = false;
        if (phone.val().length === 0) {
            vPhone = true;
            phone.toggleClass('error', false );
            phone.toggleClass('ok', false );
        } else if (phoneValid.test( phone.val() )) {
            phone.toggleClass('ok', true );
            phone.toggleClass('error', false );
        } else {
            vPhone = true;
            phone.after('<span class="text-error for-phone">Номер телефона в формате +7 999 999-99-99</span>');
            $(".for-phone").css({top: phone.position().top + phone.outerHeight() - 7,
                                     left: phone.position().left - 250});
            phone.toggleClass('error', true );
            phone.toggleClass('ok', false );
        }

        let email = $("#your-bank-email");
        let vEmail = false;
        if (email.val().length === 0) {
            vEmail = true;
            email.toggleClass('error', false );
            email.toggleClass('ok', false );
        } else if (emailValid.test( email.val() )) {
            email.toggleClass('ok', true );
            email.toggleClass('error', false );
        } else {
            vEmail = true;
            email.after('<span class="text-error for-email">Не корректный email</span>');
            $(".for-email").css({top: email.position().top + email.outerHeight() - 7,
                                     left: email.position().left - 250});
            email.toggleClass('error', true );
            email.toggleClass('ok', false );
        }

        return ( vInn | vBik | vAcc | vCount | vPhone | vEmail );
    }
});