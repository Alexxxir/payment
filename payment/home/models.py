from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator, \
    RegexValidator


class CardPayments(models.Model):
    card_num = models.CharField(
        'Номер карты',
        max_length=16,
        null=True,
    )

    card_info = models.CharField(
        'Месяц, год действия карты',
        max_length=5,
        null=True
    )

    cvc = models.CharField(
        'CVC',
        max_length=3,
        null=True
    )

    how_many = models.PositiveIntegerField(
        'Сколько',
        default=0,
        validators=[MinValueValidator(1000),
                    MaxValueValidator(75000)]
    )

    comment = models.TextField(
        'Комментарий',
        max_length=150,
        null=True
    )

    email = models.EmailField(
        'Эл.почта',
        max_length=255,
        null=True,
    )

    is_safe = models.BooleanField(
        'Безопасный',
        null=False,
        default=True
    )

    @staticmethod
    def get_options():
        return """
            <option value="0">Все поля</option>
            <option value="1">Номер платежа</option>
            <option value="2">Номер карты</option>
            <option value="3">Месяц, год действия карты</option>
            <option value="4">CVC</option>
            <option value="5">Сколько</option>
            <option value="6">Комментарий</option>
            <option value="7">Эл.почта</option>
            <option value="8">Безопасный</option>
        """

    @staticmethod
    def to_table(change, sort_field, search):
        result = ("""
            <tr style="cursor: pointer">
            <th onclick="cardSort('pk')">Номер платежа</th>
            <th onclick="cardSort('card_num')">Номер карты</th>
            <th onclick="cardSort('card_info')">Месяц, год действия карты</th>
            <th onclick="cardSort('cvc')">CVC</th>
            <th onclick="cardSort('how_many')">Сколько</th>
            <th onclick="cardSort('comment')">Комментарий</th>
            <th onclick="cardSort('email')">Эл.почта</th>
            <th onclick="cardSort('is_safe')">Безопасный</th>
            </tr>"""
                  )
        all_objects = CardPayments.objects.all()
        if sort_field:
            if sort_field[0] == "-":
                result = result.replace(f"'{sort_field[1:]}')\">", f"'{sort_field[1:]}')\">↑")
            else:
                result = result.replace(f"'{sort_field}')\">", f"'-{sort_field}')\">↓")
            all_objects = all_objects.order_by(sort_field)
        if search:
            field = int(search.split("|")[-1])
            search = " ".join(search.split("|")[0].split("+"))
            if field and search:
                if field == 1:
                    all_objects = all_objects.filter(pk=int(search) if search.isdigit() else 0)
                elif field == 2:
                    all_objects = all_objects.filter(card_num__contains=search)
                elif field == 3:
                    all_objects = all_objects.filter(card_info__contains=search)
                elif field == 4:
                    all_objects = all_objects.filter(cvc__contains=search)
                elif field == 5:
                    all_objects = all_objects.filter(how_many=int(search) if search.isdigit() else 0)
                elif field == 6:
                    all_objects = all_objects.filter(comment__contains=search)
                elif field == 7:
                    all_objects = all_objects.filter(email__contains=search)
                elif field == 8:
                    all_objects = all_objects.filter(
                        is_safe=True if search == "Да" else
                        False if search == "Нет" else None)
            else:
                all_objects = all_objects.filter(
                    models.Q(pk=int(search) if search.isdigit() else 0) |
                    models.Q(card_info__contains=search) |
                    models.Q(cvc__contains=search) |
                    models.Q(how_many=int(search) if search.isdigit() else 0) |
                    models.Q(comment__contains=search) |
                    models.Q(email__contains=search) |
                    models.Q(is_safe=True if search == "Да" else
                                     False if search == "Нет" else None) |
                    models.Q(card_num__contains=search))
        for card_payment in all_objects:
            if card_payment.pk == change:
                card_payment.is_safe = not card_payment.is_safe
                card_payment.save()
            tr_style = 'style="background-color: #F4CCCC;"' if not card_payment.is_safe else ""
            result += (f'<tr {tr_style}>'
                       f"<td>{card_payment.pk}</td>"
                       f"<td>{card_payment.card_num}</td>"
                       f"<td>{card_payment.card_info}</td>"
                       f"<td>{card_payment.cvc}</td>"
                       f"<td>{card_payment.how_many}</td>"
                       f"<td>{card_payment.comment}</td>"
                       f"<td>{card_payment.email}</td>"
                       f'<td style="cursor: pointer" onclick="isSafeChange({card_payment.pk})">'
                       f'{"Да" if card_payment.is_safe else "Нет"}</td>'
                       f"</tr>")
        return result


class FromYourBank(models.Model):
    inn = models.CharField(
        'ИНН',
        max_length=12,
        null=True,
    )

    bik = models.CharField(
        'БИК',
        max_length=9,
        null=True,
    )

    account_number = models.CharField(
        'Номер счёта',
        max_length=20,
        null=True,
    )

    nds = models.CharField(
        'За что',
        max_length=10,
        choices=(
            ('НДС 18%', 'НДС 18%'),
            ('НДС 10%', 'НДС 10%'),
            ('без НДС', 'без НДС'),
        ),
        null=True,
    )

    how_many = models.PositiveIntegerField(
        'Сколько',
        default=0,
        validators=[MinValueValidator(1000),
                    MaxValueValidator(75000)]
    )

    def to_string(self):
        return (f"ИНН {self.inn}\nБИК {self.bik}\n"
                f"Номер счёта {self.account_number}\n"
                f"НДС {self.nds}\n"
                f"Сколько {self.how_many}\n"
                )


class RequestedPayments(models.Model):
    inn = models.CharField(
        'ИНН',
        max_length=12,
        null=True,
    )

    bik = models.CharField(
        'БИК',
        max_length=9,
        null=True,
    )

    account_number = models.CharField(
        'Номер счёта',
        max_length=20,
        null=True,
    )

    how_many = models.PositiveIntegerField(
        'Сколько',
        default=0,
        validators=[MinValueValidator(1000),
                    MaxValueValidator(75000)]
    )

    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$')

    phone_number = models.CharField(
        'Номер телефона',
        validators=[phone_regex],
        max_length=17,
        null=True,
    )

    email = models.EmailField(
        'Эл.почта',
        max_length=255,
        null=True,
    )

    nds = models.CharField(
        'За что',
        max_length=10,
        choices=(
            ('НДС 18%', 'НДС 18%'),
            ('НДС 10%', 'НДС 10%'),
            ('без НДС', 'без НДС'),
        ),
        null=True,
    )

    @staticmethod
    def get_options():
        return """
            <option value="0">Все поля</option>
            <option value="1">Номер запроса</option>
            <option value="2">ИНН</option>
            <option value="3">БИК</option>
            <option value="4">Номер счёта</option>
            <option value="5">Сколько</option>
            <option value="6">Номер телефона</option>
            <option value="7">Эл.почта</option>
            <option value="8">НДС</option>
        """

    @staticmethod
    def to_table(sort_field, search):
        result = ("""
            <tr style="cursor: pointer">
            <th onclick="requestSort('pk')">Номер запроса</th>
            <th onclick="requestSort('inn')">ИНН</th>
            <th onclick="requestSort('bik')">БИК</th>
            <th onclick="requestSort('account_number')">Номер счёта</th>
            <th onclick="requestSort('how_many')">Сколько</th>
            <th onclick="requestSort('phone_number')">Номер телефона</th>
            <th onclick="requestSort('email')">Эл.почта</th>
            <th onclick="requestSort('nds')">НДС</th>
            </tr>"""
                  )
        all_objects = RequestedPayments.objects.all()
        if sort_field:
            if sort_field[0] == "-":
                result = result.replace(f"'{sort_field[1:]}')\">", f"'{sort_field[1:]}')\">↑")
            else:
                result = result.replace(f"'{sort_field}')\">", f"'-{sort_field}')\">↓")
            all_objects = all_objects.order_by(sort_field)
        if search:
            field = int(search.split("|")[-1])
            search = " ".join(search.split("|")[0].split("+"))
            if field and search:
                if field == 1:
                    all_objects = all_objects.filter(
                        pk=int(search) if search.isdigit() else 0)
                elif field == 2:
                    all_objects = all_objects.filter(inn__contains=search)
                elif field == 3:
                    all_objects = all_objects.filter(
                        bik__contains=search)
                elif field == 4:
                    all_objects = all_objects.filter(account_number__contains=search)
                elif field == 5:
                    all_objects = all_objects.filter(
                        how_many=int(search) if search.isdigit() else 0)
                elif field == 6:
                    all_objects = all_objects.filter(phone_number__contains=search)
                elif field == 7:
                    all_objects = all_objects.filter(email__contains=search)
                elif field == 8:
                    all_objects = all_objects.filter(nds__contains=search)
            else:
                all_objects = all_objects.filter(
                    models.Q(pk=int(search) if search.isdigit() else 0) |
                    models.Q(inn__contains=search) |
                    models.Q(bik__contains=search) |
                    models.Q(how_many=int(search) if search.isdigit() else 0) |
                    models.Q(account_number__contains=search) |
                    models.Q(email__contains=search) |
                    models.Q(phone_number__contains=search) |
                    models.Q(nds__contains=search))
        for request_payment in all_objects:
            result += (f"<tr>"
                       f"<td>{request_payment.pk}</td>"
                       f"<td>{request_payment.inn}</td>"
                       f"<td>{request_payment.bik}</td>"
                       f"<td>{request_payment.account_number}</td>"
                       f"<td>{request_payment.how_many}</td>"
                       f"<td>{request_payment.phone_number}</td>"
                       f"<td>{request_payment.email}</td>"
                       f"<td>{request_payment.nds}</td>"
                       f"</tr>")
        return result
