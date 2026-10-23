# Uruchomienie, odtworzenie i wdrożenie

## 1. Wymagania

### Dla wariantu statycznego

- współczesna przeglądarka;
- opcjonalnie Python 3, Node.js albo dowolny serwer HTTP.

### Dla wariantu React

- Node.js 22.13 lub nowszy;
- npm;
- dostęp do rejestru npm podczas pierwszej instalacji;
- PowerShell, terminal systemowy lub inna powłoka.

## 2. Uruchomienie wariantu statycznego

Przejdź do katalogu pakietu, a następnie:

```powershell
cd source\static
python -m http.server 8080 --directory dist
```

Otwórz `http://localhost:8080`.

Można też otworzyć `dist/index.html` bezpośrednio, ale serwer HTTP dokładniej odtwarza warunki hostingu i ułatwia wykrycie błędnych ścieżek.

Alternatywa z Node.js:

```powershell
npx serve dist
```

## 3. Uruchomienie wariantu React

```powershell
cd source\react
npm ci
npm run dev
```

Adres jest podawany w terminalu. Zwykle jest to lokalny adres na porcie wskazanym przez środowisko Vite/Vinext.

### Kompilacja produkcyjna

```powershell
npm run build
```

### Kontrola statyczna

```powershell
npm run lint
```

### Uruchomienie wyniku zgodnie ze starterem Cloudflare

Po udanej kompilacji:

```powershell
npm run start
```

Skrypt korzysta z wygenerowanej konfiguracji Wrangler w `dist/server/wrangler.json`.

## 4. Odtworzenie projektu od zera

Minimalna procedura:

1. rozpakuj archiwum, zachowując strukturę katalogów;
2. potwierdź obecność trzech plików PNG w `source/static/dist/assets` i odpowiadających im zasobów w `source/react/public`;
3. uruchom wariant statyczny i sprawdź konsolę przeglądarki;
4. w katalogu React wykonaj `npm ci` — nie używaj przypadkowej aktualizacji zależności;
5. wykonaj `npm run lint` i `npm run build`;
6. uruchom aplikację i przejdź pełną ścieżkę konfiguratora;
7. wykonaj testy z dokumentu 06;
8. dopiero po ich zaliczeniu podłącz formularze i dane produkcyjne.

## 5. Publikacja statyczna

Na dowolnym hostingu statycznym ustaw `source/static/dist` jako katalog publikowany. Plik startowy to `index.html`. Nie jest wymagane przepisywanie tras ani funkcje serwerowe.

Przykładowe klasy usług:

- hosting statyczny;
- obiektowy storage z obsługą stron WWW;
- CDN publikujący katalog;
- ChatGPT Sites z katalogiem `dist`.

Nie kopiuj nadrzędnego katalogu `source/static` jako katalogu publicznego, jeśli hosting oczekuje, że `index.html` leży w jego korzeniu.

## 6. Publikacja React

Projekt zawiera konfigurację kompilacji dostosowaną do środowiska Vinext/Vite i Cloudflare. Ogólny przepływ:

1. zainstaluj zależności przez `npm ci`;
2. wykonaj `npm run build`;
3. sprawdź wygenerowane artefakty i logi;
4. skonfiguruj nowy projekt hostingowy;
5. ustaw domenę, zmienne i sekrety w środowisku hostingu, nie w repozytorium;
6. wykonaj wdrożenie testowe;
7. przeprowadź test odbiorczy na docelowym adresie.

Dołączony `.openai/hosting.json` nie zawiera identyfikatora poprzedniego projektu. Publikacja powinna utworzyć nowe, jawnie kontrolowane powiązanie z hostingiem.

## 7. Podłączenie formularza produkcyjnego

Wymagane elementy:

- bezpieczny endpoint po HTTPS;
- walidacja klienta i serwera;
- ochrona przed spamem i automatyzacją;
- jasny komunikat błędu oraz możliwość ponowienia;
- mechanizm zgody i link do polityki prywatności;
- minimalizacja zbieranych danych;
- rejestracja zdarzenia bez zapisywania treści prywatnych w analityce;
- potwierdzenie przyjęcia zapytania;
- ustalona retencja i procedura usuwania danych.

Nie należy przesyłać fotografii i dokumentów przez zwykły formularz e-mail bez przeanalizowania bezpieczeństwa i limitów plików.

## 8. Konfiguracja domeny i SEO

Przed publikacją:

- uzupełnij tytuł i opis meta o prawdziwą nazwę usługi;
- ustaw adres kanoniczny;
- dodaj Open Graph i obraz społecznościowy;
- uzupełnij `robots.txt` oraz mapę witryny, jeśli hosting ich wymaga;
- zoptymalizuj PNG lub wygeneruj warianty WebP/AVIF;
- sprawdź wydajność na sieci mobilnej;
- ustaw stronę błędu i monitoring dostępności.

## 9. Bezpieczna aktualizacja

Przed zmianą frameworka lub głównych zależności utwórz osobną gałąź, przeczytaj informacje o niekompatybilnościach i ponów cały test konfiguratora. Szczególnej uwagi wymagają wersje beta Vinext oraz integracja z Cloudflare.

