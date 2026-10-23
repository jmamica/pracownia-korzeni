# Testy i kryteria odbioru

## 1. Status w chwili przygotowania pakietu

W trakcie tworzenia prototypów wykonano następujące kontrole:

- statyczny serwer lokalny zwracał stronę z kodem 200;
- test gotowości i demonstracyjny formularz w wersji statycznej reagowały poprawnie;
- kompilacja wariantu React zakończyła się powodzeniem;
- aplikacja React zwracała stronę lokalnie z kodem 200;
- sprawdzono widok mobilny;
- przejście wszystkich czterech kroków konfiguratora kończyło się stanem sukcesu;
- WebMCP aktualizował stan dla poprawnego celu i odrzucał niepoprawne dane;
- odczyt WebMCP zwracał zgodny stan konfiguratora.

Po rozpakowaniu na innym komputerze należy powtórzyć testy, ponieważ wersja systemu, Node.js i dostępność rejestru zależności mogą się różnić.

## 2. Test wariantu statycznego

### Ładowanie

- `index.html` zwraca 200;
- trzy obrazy ładują się bez błędów 404;
- w konsoli nie ma nieobsłużonych wyjątków;
- nawigacja prowadzi do właściwych sekcji.

### Interakcje

- menu mobilne można otworzyć, wybrać pozycję i zamknąć;
- zaznaczanie pól testu gotowości zmienia komunikat;
- zerowy wybór nadal prowadzi do wspierającego, nieblokującego komunikatu;
- FAQ rozwija się z klawiatury;
- formularz wymaga pól oznaczonych jako wymagane;
- wysłanie formularza nie wykonuje żądania sieciowego i pokazuje komunikat demonstracyjny.

## 3. Test wariantu React

### Budowanie

```powershell
npm ci
npm run lint
npm run build
```

Kryterium: brak błędu kończącego proces. Ostrzeżenia trzeba przejrzeć i sklasyfikować; nie powinny dotyczyć brakujących zasobów ani uszkodzonej hydratacji.

### Konfigurator

Scenariusz podstawowy:

1. wybierz „prezent”;
2. przejdź dalej;
3. wybierz co najmniej dwa rodzaje materiałów;
4. wybierz styl botaniczny;
5. przejdź do podsumowania;
6. wróć do wcześniejszego kroku i zmień wybór;
7. wróć do podsumowania i potwierdź aktualizację;
8. odśwież stronę i sprawdź odtworzenie konfiguracji;
9. wyślij demonstracyjny formularz;
10. potwierdź stan sukcesu i brak żądania zawierającego dane.

Scenariusze dodatkowe:

- próba przejścia dalej bez wyboru;
- wybór i odznaczenie wszystkich materiałów;
- przejście z karty wariantu do konfiguratora;
- rozpoczęcie przez różne CTA;
- uszkodzona wartość JSON w `localStorage` nie może unieruchomić strony;
- WebMCP jest opcjonalny i jego brak nie powoduje błędu.

## 4. Responsywność

Sprawdź co najmniej szerokości 360, 390, 768, 1024 i 1440 px.

Kryteria:

- brak niezamierzonego przewijania w poziomie;
- CTA nie wychodzą poza ekran;
- tekst nie nachodzi na obrazy;
- konfigurator zachowuje logiczną kolejność;
- karta rekomendowanego wariantu nie zasłania sąsiednich treści;
- nawigacja mobilna jest obsługiwana dotykiem i klawiaturą;
- grafiki mają właściwy kadr i nie deformują się.

## 5. Dostępność

- jeden logiczny nagłówek pierwszego poziomu;
- hierarchia nagłówków bez przypadkowych przeskoków;
- widoczny fokus na linkach, przyciskach i polach;
- wszystkie interakcje dostępne z klawiatury;
- etykiety powiązane z polami;
- komunikaty sukcesu i błędu możliwe do odczytania przez technologię asystującą;
- tekst alternatywny przekazuje rolę obrazu;
- kolor nie jest jedynym nośnikiem stanu;
- kontrast tekstu i kontrolek spełnia wymagania WCAG AA.

## 6. Wydajność i jakość techniczna

- brak zasobów 404;
- obrazy mają jawne wymiary lub stabilne proporcje;
- zasoby poza pierwszym widokiem mogą być ładowane leniwie;
- brak danych osobowych w logach i `localStorage` poza demonstracyjną konfiguracją;
- Lighthouse lub równoważny audyt nie wykazuje krytycznych problemów;
- formularze produkcyjne mają zabezpieczenie serwerowe.

## 7. Kryterium biznesowe

Osoba nieznająca projektu powinna po pierwszym widoku odpowiedzieć:

- co jest oferowane;
- dla kogo i na jaką okazję;
- dlaczego efekt jest osobisty;
- jaki jest bezpieczny następny krok.

Po przeczytaniu strony powinna też wiedzieć, że może zacząć z niepełnymi materiałami i zobaczy projekt przed wersją finalną.

## 8. Test przed każdym wydaniem

Minimalna lista:

- [ ] aktualne dane firmy i zakres oferty;
- [ ] zgody na wszystkie realizacje i opinie;
- [ ] brak tekstów demonstracyjnych przedstawionych jako fakty;
- [ ] wszystkie linki działają;
- [ ] formularz trafia do właściwego odbiorcy;
- [ ] polityka prywatności odpowiada rzeczywistemu przepływowi danych;
- [ ] pełna ścieżka mobilna i klawiaturowa działa;
- [ ] kopia zapasowa poprzedniego wydania istnieje;
- [ ] domena, HTTPS i monitoring są aktywne.

