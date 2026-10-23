# Pracownia Korzeni — kompletny pakiet projektu

Wersja pakietu: **1.0**  
Data przygotowania: **23 października 2026**  
Język interfejsu i dokumentacji: **polski**

## 1. Czym jest projekt

„Pracownia Korzeni” to demonstracyjny projekt strony sprzedażowej usługi tworzenia indywidualnych drzew genealogicznych. Produkt jest przedstawiany nie jako techniczny schemat nazwisk i dat, lecz jako osobista pamiątka rodzinna, prezent jubileuszowy oraz uporządkowana opowieść o pokoleniach.

Pakiet obejmuje dwa równorzędne warianty:

1. **Statyczna strona produktu** — gotowy katalog `dist`, możliwy do uruchomienia na dowolnym prostym hostingu statycznym.
2. **Interaktywna aplikacja React** — jednostronicowa strona sprzedażowa z czterostopniowym konfiguratorem, zapamiętywaniem wyborów lokalnie i integracją WebMCP.

## 2. Co znajduje się w pakiecie

```text
pakiet-pracownia-korzeni-v1.0/
├── README.md
├── project-manifest.json
├── PRAWA-I-ZASOBY.md
├── docs/
│   ├── 01-brief-cel-i-zalozenia.md
│   ├── 02-opis-funkcjonalny.md
│   ├── 03-architektura-i-dane.md
│   ├── 04-tresci-i-struktura-strony.md
│   ├── 05-uruchomienie-odtworzenie-wdrozenie.md
│   ├── 06-testy-i-kryteria-odbioru.md
│   ├── 07-zasoby-wizualne-i-prompty.md
│   └── 08-decyzje-ograniczenia-i-rozwoj.md
└── source/
    ├── static/
    │   ├── README.md
    │   ├── .openai/hosting.json
    │   └── dist/
    │       ├── index.html
    │       └── assets/
    └── react/
        ├── README.md
        ├── .openai/hosting.json
        ├── app/
        ├── components/
        ├── public/
        ├── scripts/
        ├── vendor/
        └── pliki konfiguracyjne i zależności
```

## 3. Najszybsze uruchomienie

### Wariant statyczny

Plik wejściowy:

```text
source/static/dist/index.html
```

Można go otworzyć bezpośrednio w przeglądarce. Dla poprawnego zachowania wszystkich zasobów zalecany jest prosty serwer lokalny:

```powershell
cd source\static
python -m http.server 8080 --directory dist
```

Następnie otwórz `http://localhost:8080`.

### Wariant React

Wymagania:

- Node.js 22.13 lub nowszy,
- npm zgodny z dołączonym `package-lock.json`.

Uruchomienie:

```powershell
cd source\react
npm ci
npm run dev
```

Kompilacja produkcyjna:

```powershell
npm run build
```

## 4. Status i zakres produktu

To kompletny **prototyp front-endowy**. Zawiera docelową narrację, responsywny wygląd, dostępne kontrolki, obrazy, interakcje i stany interfejsu. Nie zawiera:

- backendu obsługującego formularze,
- kont użytkowników ani logowania,
- bazy danych klientów lub drzew,
- płatności,
- rzeczywistego wyszukiwania genealogicznego,
- panelu administracyjnego,
- mechanizmu przesyłania prywatnych fotografii.

Formularze są celowo demonstracyjne: nie wysyłają i nie zapisują danych poza przeglądarką.

## 5. Najważniejsze cechy

- ton premium oparty na jakości procesu, nie na pustych przymiotnikach;
- komunikacja osobista, spokojna i ciepła, bez patosu i presji sprzedażowej;
- narracja: zainteresowanie → odniesienie do własnej rodziny → zrozumienie usługi → redukcja obaw → personalizacja → dowód efektu → decyzja;
- niski próg wejścia: użytkownik może zacząć od kilku nazwisk, jednego zdjęcia albo rodzinnej rozmowy;
- prezentacja trzech zakresów współpracy;
- wyraźna informacja o korektach i akceptacji projektu przed drukiem;
- komplet sekcji sprzedażowych: hero, problem, rozwiązanie, proces, personalizacja, warianty, prezent, realizacje, FAQ i finałowe CTA;
- trzy oryginalne obrazy produktowe w spójnej estetyce;
- wersja React z konfiguratorem celu, materiałów i stylu.

## 6. Kolejność czytania dokumentacji

1. Zacznij od `docs/01-brief-cel-i-zalozenia.md`.
2. Następnie przeczytaj `docs/02-opis-funkcjonalny.md` i `docs/04-tresci-i-struktura-strony.md`.
3. Przy odtwarzaniu technicznym korzystaj z `docs/03-architektura-i-dane.md` oraz `docs/05-uruchomienie-odtworzenie-wdrozenie.md`.
4. Przed odbiorem użyj `docs/06-testy-i-kryteria-odbioru.md`.
5. Informacje o obrazach i dalszym rozwoju znajdują się w dokumentach 07 i 08.

## 7. Najważniejsza zasada odtwarzania

Projekt nie powinien zostać zredukowany do „ładnej strony z drzewem”. Jego specyfika polega na obniżaniu obawy użytkownika, że ma za mało informacji, oraz na pokazaniu kontrolowanego, konsultacyjnego procesu. Główne CTA nie wymusza zakupu — prowadzi do konfiguracji albo pierwszej rozmowy.

## 8. Weryfikacja wydania

Przed utworzeniem archiwum:

- ponownie wykonano lint wariantu React: **0 błędów** i 6 nieblokujących ostrzeżeń dotyczących użycia natywnych znaczników `img`;
- ponownie wykonano pełną kompilację React: **zakończona powodzeniem**;
- sprawdzono obecność dokumentu HTML, skryptu, formularza, FAQ i trzech lokalnych grafik w wariancie statycznym;
- potwierdzono brak `node_modules`, `.git`, `.next`, `.wrangler` i prywatnych identyfikatorów wdrożeniowych w pakiecie;
- konfigurację `localStorage` poprawiono tak, aby pierwszy render nie nadpisywał wcześniej zapisanych wyborów.

