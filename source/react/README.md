# Pracownia Korzeni — wariant React

Interaktywna jednostronicowa strona sprzedażowa z czterostopniowym konfiguratorem.

## Wymagania

- Node.js 22.13 lub nowszy;
- npm i dostęp do rejestru zależności podczas instalacji.

## Uruchomienie

```powershell
npm ci
npm run dev
```

## Weryfikacja i kompilacja

```powershell
npm run lint
npm run build
```

Po kompilacji lokalne środowisko zgodne ze starterem Cloudflare uruchamia polecenie:

```powershell
npm run start
```

## Gdzie znajduje się implementacja

- `app/page.tsx` — treść, sekcje, konfigurator i WebMCP;
- `app/globals.css` — system wizualny oraz responsywność;
- `app/layout.tsx` — dokument i metadane;
- `components/ui` — kontrolki interfejsu;
- `public` — grafiki.

Konfiguracja jest zapisywana lokalnie pod kluczem `pracownia-korzeni-config`. Formularz końcowy jest demonstracyjny i nie wysyła adresu e-mail. Szczegółowa dokumentacja znajduje się w katalogu `../../docs`.

