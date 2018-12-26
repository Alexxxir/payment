from django.http import HttpResponse
from django.shortcuts import render
from .models import CardPayments, FromYourBank, RequestedPayments


def home(request):
    if request.method == 'POST':
        post = request.POST
        if 'get_file' in post:
            from_your_bank = FromYourBank(
                inn=post.get('inn'),
                bik=post.get('bik'),
                account_number=post.get('account_number'),
                nds=post.get('nds'),
                how_many=int(post.get('how_many'))
            )
            from_your_bank.save()
            string = from_your_bank.to_string()
            response = HttpResponse(string)
            response['Content-Type'] = 'text/plain'
            response['Content-Length'] = len(string)
            response['Content-Disposition'] = "attachment; filename=for_bank.txt"
            return response
        elif 'create_payment' in post:
            request_payments = RequestedPayments(
                inn=post.get('inn'),
                bik=post.get('bik'),
                account_number=post.get('account_number'),
                nds=post.get('nds'),
                how_many=int(post.get('how_many')),
                phone_number=post.get('phone'),
                email=post.get('email'),
            )
            request_payments.save()
        elif 'pay' in post:
            card_payment = CardPayments(
                card_num=post.get('card_num'),
                card_info=post.get('card-info'),
                cvc=post.get('cvc'),
                how_many=int(post.get('sum')),
                comment=post.get('comment'),
                email=post.get('email'),
            )
            card_payment.save()
    return render(request, 'index.html')


def admin(request):
    return render(request, 'admin.html')


def from_card(request):
    change = None
    sort_field = None
    search = None
    if request.method == "GET":
        if "change" in request.GET:
            change = int(request.GET["change"])
        if "sort" in request.GET:
            sort_field = request.GET["sort"]
        if "search" in request.GET:
            search = request.GET["search"]
    return HttpResponse(CardPayments.to_table(change, sort_field, search))


def from_request(request):
    sort_field = None
    search = None
    if request.method == "GET":
        if "sort" in request.GET:
            sort_field = request.GET["sort"]
        if "search" in request.GET:
            search = request.GET["search"]
    return HttpResponse(RequestedPayments.to_table(sort_field, search))


def card_select(request):
    return HttpResponse(CardPayments.get_options())


def request_select(request):
    return HttpResponse(RequestedPayments.get_options())
