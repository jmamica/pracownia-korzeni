# Opis funkcjonalny

## 1. Zakres wspólny obu wariantów

Oba warianty przedstawiają tę samą usługę i prowadzą użytkownika przez tę samą logikę sprzedażową:

1. rozpoznanie okazji lub potrzeby;
2. nazwanie problemu rozproszonych informacji;
3. pokazanie indywidualnie projektowanego rozwiązania;
4. objaśnienie procesu współpracy;
5. wykazanie zakresu personalizacji;
6. przedstawienie wariantów;
7. osadzenie produktu w kontekście prezentu;
8. pokazanie przykładowych realizacji;
9. rozwianie obaw w FAQ;
10. zaproszenie do bezpiecznego pierwszego kroku.

W obu wersjach są: responsywna nawigacja, komplet sekcji sprzedażowych, trzy warianty usługi, galeria, FAQ, formularz demonstracyjny i oryginalne grafiki.

## 2. Wariant statyczny

Wariant statyczny znajduje się w `source/static/dist`. Cała warstwa dokumentu, stylów i zachowania jest zawarta w `index.html`; lokalne obrazy są w `dist/assets`.

### Funkcje

- przyklejany nagłówek i nawigacja do sekcji;
- menu mobilne;
- przyciski CTA przewijające do dalszej części strony;
- prosty test gotowości oparty na polach wyboru;
- dynamiczna odpowiedź testu zależna od liczby zaznaczonych materiałów;
- trzy warianty usługi;
- rozwijane pytania FAQ oparte na natywnych elementach `details`;
- formularz kontaktowy, który wyświetla informację demonstracyjną bez transmisji danych.

### Test gotowości

Użytkownik zaznacza rodzaje posiadanych materiałów, np. nazwiska i daty, fotografie, dokumenty lub rodzinne opowieści. Wynik nie ocenia użytkownika i nie blokuje kontaktu. Jego rola to pokazanie, że każdy zakres materiałów pozwala wykonać następny krok.

### Formularz

Formularz nie ma backendu. Po jego wysłaniu JavaScript zapobiega żądaniu sieciowemu i pokazuje lokalny komunikat. Przed produkcją trzeba dodać zgodę, politykę prywatności, walidację serwerową, zabezpieczenie antyspamowe i prawdziwy endpoint.

## 3. Wariant React

Wariant React znajduje się w `source/react`. Jest to jednostronicowa aplikacja oparta na React, Vinext/Vite i komponentach Radix UI.

### Konfigurator w czterech krokach

#### Krok 1 — cel

Jednokrotny wybór:

- prezent;
- pamiątka dla rodziny;
- uporządkowanie historii.

#### Krok 2 — posiadane materiały

Wielokrotny wybór:

- nazwiska i daty;
- fotografie;
- dokumenty i notatki;
- opowieści rodzinne.

Brak kompletnego zestawu nie jest błędem. Komunikacja zachęca do rozpoczęcia od tego, co jest dostępne.

#### Krok 3 — styl

Jednokrotny wybór:

- botaniczny;
- klasyczny;
- współczesny.

#### Krok 4 — podsumowanie

Użytkownik widzi zebrane wybory i może podać adres e-mail. Formularz wyświetla lokalny stan powodzenia, ale nie wysyła danych.

### Zachowanie konfiguratora

- bieżący krok i wybory są przechowywane w stanie React;
- zapis jest utrwalany w `localStorage` pod kluczem `pracownia-korzeni-config`;
- po ponownym otwarciu strony konfiguracja może zostać odtworzona;
- karty wariantów aktualizują wybrany wariant i przewijają do konfiguratora;
- inne CTA mogą przewijać do konfiguratora i wstępnie wybrać cel;
- postęp jest sygnalizowany tekstowo i wizualnie;
- walidacja nie pozwala przejść dalej bez wymaganego wyboru.

### Pozostałe interakcje

- zakładki personalizacji;
- akordeon FAQ;
- responsywne menu;
- płynne przejścia do sekcji;
- stan sukcesu po demonstracyjnym formularzu.

## 4. Integracja WebMCP w React

Aplikacja rejestruje narzędzia, jeśli środowisko przeglądarki udostępnia `document.modelContext`:

- `start_tree_configuration` — rozpoczyna konfigurację z celem `prezent`, `pamiatka` albo `porzadek` i przechodzi do kroku drugiego;
- `read_tree_configuration` — zwraca aktualny krok i podsumowanie wyborów bez zmiany stanu.

Integracja jest dodatkiem progresywnym. Brak WebMCP nie wpływa na normalną obsługę strony.

## 5. Dane i prywatność

Bieżący prototyp:

- nie ma bazy danych;
- nie wysyła formularzy;
- nie przyjmuje plików rodzinnych;
- nie zapisuje konfiguracji poza lokalną pamięcią przeglądarki;
- nie zawiera kont ani płatności.

Przed wdrożeniem funkcji przesyłania fotografii i dokumentów trzeba zaprojektować prywatność, retencję, kontrolę dostępu, szyfrowanie, usuwanie danych i odpowiednią podstawę prawną przetwarzania.

