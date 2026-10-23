# Decyzje, ograniczenia i dalszy rozwój

## 1. Najważniejsze decyzje projektowe

### Dwa warianty zamiast jednego

Statyczna wersja daje maksymalną przenośność i prosty hosting. React pokazuje bogatszą ścieżkę użytkownika, stan, walidację i możliwość integracji. Obie wersje zachowują tę samą strategię treści, więc można wybrać technologię bez zmiany pozycjonowania.

### Konfigurator zamiast formularza na początku

Bezpośrednia prośba o dane kontaktowe wymaga większego zaufania. Konfigurator daje użytkownikowi wartość wcześniej: porządkuje cel, materiały i gust, a dopiero na końcu proponuje kontakt.

### CTA o niskiej presji

Genealogia dotyczy prywatnych i emocjonalnych materiałów. Dlatego interfejs zaprasza do sprawdzenia możliwości i rozmowy, zamiast wymuszać natychmiastowy zakup.

### Obraz gotowego przedmiotu

W hero pokazano efekt w domu, ponieważ odbiorca ma wyobrazić sobie pamiątkę lub prezent. Zrzut ekranu narzędzia genealogicznego przesunąłby uwagę z znaczenia na technikę.

## 2. Ograniczenia prototypu

- treść i marka są demonstracyjne;
- nie ma prawdziwego cennika ani warunków handlowych;
- grafiki są wizualizacjami koncepcyjnymi;
- formularze nie przesyłają danych;
- konfigurator nie tworzy drzewa i nie analizuje dokumentów;
- brak kont, płatności, uploadu, CRM, analityki i panelu;
- `localStorage` zachowuje jedynie prostą konfigurację na danym urządzeniu;
- WebMCP działa tylko w środowiskach udostępniających odpowiedni interfejs;
- zależność Vinext jest w wersji beta i wymaga ostrożności przy aktualizacji.

## 3. Ryzyka

### Prywatność

Dane genealogiczne mogą identyfikować żyjące osoby. Najwyższym priorytetem produkcyjnym jest zaprojektowanie bezpiecznego przyjmowania i przechowywania materiałów.

### Wiarygodność

Wizualizacje nie mogą być przedstawiane jako wykonane zlecenia. Opinie, terminy i zakresy muszą być prawdziwe oraz możliwe do udokumentowania.

### Oczekiwania dotyczące badań

Trzeba wyraźnie oddzielić projektowanie na podstawie materiałów klienta od płatnych badań w źródłach. Wynik kwerendy zależy od dostępności i jakości źródeł.

### Utrzymanie technologii

Projekt React pochodzi z rozbudowanego startera i zawiera zależności niewykorzystywane przez bieżącą stronę. Można je później usunąć po audycie importów, ale nie należy robić tego równocześnie z aktualizacją frameworka.

## 4. Rekomendowana mapa rozwoju

### Etap 1 — przygotowanie do publikacji

- zatwierdzenie marki i treści;
- prawdziwe dane kontaktowe i warunki;
- prawna weryfikacja formularza;
- optymalizacja obrazów;
- podstawowe SEO, analityka zgód i monitoring;
- testy WCAG i urządzeń mobilnych.

### Etap 2 — obsługa zapytań

- bezpieczny formularz i CRM;
- e-mail potwierdzający;
- zapisywanie wyniku konfiguratora razem z zapytaniem;
- harmonogram konsultacji;
- mierzenie konwersji i porzuceń.

### Etap 3 — portal klienta

- konto lub bezpieczne linki jednorazowe;
- szyfrowany upload materiałów;
- status zlecenia;
- komentarze do projektu i wersjonowanie korekt;
- jawne terminy retencji i samodzielne usuwanie plików.

### Etap 4 — narzędzia operacyjne

- panel zleceń;
- kontrola zgód na publikację;
- szablony briefu i umowy;
- generowanie list brakujących informacji;
- integracja płatności i faktur po analizie procesu.

## 5. Informacje potrzebne zespołowi wdrożeniowemu

Przed estymacją produkcji właściciel powinien odpowiedzieć:

- co dokładnie obejmują trzy warianty;
- czy i w jakim zakresie prowadzone są kwerendy;
- jakie formaty i oprawy są dostępne;
- ile korekt obejmuje cena;
- jaki jest minimalny i typowy termin;
- czy klient przesyła dane osób żyjących;
- gdzie i jak długo są przechowywane pliki;
- kto ma do nich dostęp;
- jakie są zasady rezygnacji i usuwania danych;
- które realizacje i opinie mają zgodę na publikację.

## 6. Warunek zachowania specyfiki projektu

Rozwijając stronę, należy chronić trzy cechy: niski próg rozpoczęcia, poczucie wpływu klienta i spokojne tempo decyzji. Dodanie kolejnych funkcji nie powinno przekształcić usługi w bezosobowy generator ani ukrywać konsultacyjnego charakteru współpracy.

