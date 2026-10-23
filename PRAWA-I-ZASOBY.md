# Prawa, licencje i zasoby

## Kod i treści

Pakiet nie narzuca licencji dla autorskiego kodu i treści projektu. Przed publiczną dystrybucją właściciel powinien świadomie wybrać licencję albo zachować pełne prawa autorskie.

## Grafiki

Trzy główne obrazy zostały wygenerowane na potrzeby tego projektu przy użyciu narzędzia generowania obrazów OpenAI. Nie przedstawiają rzeczywistych klientów ani zweryfikowanych rodzin. Należy je traktować jako materiały demonstracyjne. Dokładne założenia i prompty znajdują się w `docs/07-zasoby-wizualne-i-prompty.md`.

## Dane osobowe

Projekt nie zawiera prawdziwych danych genealogicznych, adresów e-mail klientów ani prywatnych fotografii użytkowników. Widoczne portrety i nazwisko „Rodzina Nowaków” pełnią funkcję przykładową.

## Zależności zewnętrzne

Wariant React korzysta z zależności open source wymienionych w `source/react/package.json`. Pakiet zachowuje pliki licencyjne dostarczone ze źródłem startera, w tym licencję katalogu `vendor/`. Przy wdrożeniu należy respektować licencje poszczególnych bibliotek.

## Identyfikatory wdrożeniowe

Celowo usunięto identyfikatory konkretnych projektów hostingowych. Dołączone pliki `.openai/hosting.json` są bezpiecznymi szablonami z wartością `project_id: null`. Nowe wdrożenie powinno utworzyć własną tożsamość projektu.

