# Architektura i dane

## 1. Mapa rozwiązania

```text
Pracownia Korzeni
├── wariant statyczny
│   ├── index.html
│   │   ├── semantyczny HTML
│   │   ├── osadzony CSS
│   │   └── osadzony JavaScript
│   └── assets/*.png
└── wariant React
    ├── app/
    │   ├── page.tsx        — strona, treści i logika konfiguratora
    │   ├── globals.css     — system wizualny i układ
    │   └── layout.tsx      — dokument i metadane
    ├── components/ui/      — kontrolki interfejsu
    ├── public/             — obrazy i zasoby publiczne
    ├── scripts/            — uruchamianie i konfiguracja środowiska
    ├── vendor/             — lokalne elementy integracyjne startera
    └── konfiguracja TypeScript, Vite, Vinext, Tailwind i Cloudflare
```

## 2. Wariant statyczny

Nie wymaga procesu kompilacji. Przeglądarka ładuje `dist/index.html`, a odwołania względne pobierają grafiki z `dist/assets`.

Zalety:

- proste wdrożenie;
- brak zależności produkcyjnych;
- łatwa archiwizacja i przenoszenie;
- mała liczba punktów awarii.

Konsekwencje:

- treść, CSS i JavaScript są skupione w jednym dużym pliku;
- większe zmiany komponentowe wymagają ręcznego utrzymania;
- stan formularza nie jest przeznaczony do złożonych procesów.

## 3. Wariant React

Warstwa aplikacyjna korzysta z komponentów funkcyjnych i stanu klienta. Główna implementacja znajduje się w `app/page.tsx`. Projekt jest przygotowany do uruchomienia w narzędziach Vinext/Vite i do budowy pod środowisko Cloudflare Workers.

Kluczowe wersje:

- Node.js: `>=22.13.0`;
- React: `19.2.6`;
- Next: `16.3.4`;
- Vinext: `1.0.0-beta.5`;
- Vite: `8.0.13`;
- TypeScript: `5.9.3`;
- Tailwind CSS: `4.2.1`;
- Radix UI: `1.6.7`;
- Wrangler: `4.92.0`.

Dokładne wersje rozwiązuje dołączony `package-lock.json`. Do odtworzenia należy używać `npm ci`, a nie usuwać blokady wersji.

## 4. Model stanu konfiguratora

Stan zawiera logicznie:

```text
step        numer aktywnego kroku
purpose     cel: prezent | pamiatka | porzadek
materials   lista wybranych rodzajów materiałów
style       styl: botaniczny | klasyczny | nowoczesny
plan        wybrany wariant współpracy
email       adres wpisany w formularzu demonstracyjnym
submitted   informacja o pokazaniu stanu sukcesu
```

Pola mogą mieć inne nazwy w kodzie, ale ten model opisuje kontrakt funkcjonalny.

### Utrwalanie

Konfiguracja jest serializowana do JSON i zapisywana w `localStorage` jako `pracownia-korzeni-config`. Nie należy przechowywać w tym mechanizmie dokumentów, zdjęć, danych wrażliwych ani pełnych danych genealogicznych. `localStorage` jest wyłącznie wygodą interfejsu, nie repozytorium danych klienta.

## 5. Integracje i granice systemu

Obecnie nie istnieją połączenia z:

- systemem CRM;
- pocztą lub usługą formularzy;
- bazą danych;
- płatnościami;
- magazynem plików;
- zewnętrznymi bazami genealogicznymi;
- analityką i narzędziem zgód.

Pliki konfiguracyjne mogą zawierać wsparcie dla technologii startera, których strona nie używa funkcjonalnie, np. Drizzle. Nie oznacza to, że prototyp ma bazę danych.

## 6. Hosting

W każdym wariancie dołączono zanonimizowany plik `.openai/hosting.json`. Pole identyfikatora projektu jest puste. Dzięki temu pakiet zachowuje informację o rodzaju hostingu, ale nie przenosi powiązania z kontem ani wcześniejszym wdrożeniem.

Wariant statyczny publikuje katalog `dist`. Wariant React wymaga instalacji zależności i kompilacji. Szczegóły znajdują się w dokumencie 05.

## 7. Dostępność i responsywność

Projekt opiera się na semantycznych nagłówkach, etykietach pól, opisach alternatywnych grafik i kontrolkach obsługiwanych z klawiatury. Wariant React wykorzystuje komponenty Radix dla akordeonu, zakładek i pól wyboru.

Punkty przejścia układu są dostosowane do tabletów i telefonów. Kryterium odbioru nie powinno ograniczać się do braku poziomego przewijania — trzeba także sprawdzić kolejność treści, czytelność CTA, widoczność fokusu i pełną obsługę konfiguratora z klawiatury.

