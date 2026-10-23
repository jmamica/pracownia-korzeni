# Pracownia Korzeni — wariant statyczny

Gotowa, samodzielna strona produktu bez procesu kompilacji.

## Uruchomienie

```powershell
python -m http.server 8080 --directory dist
```

Następnie otwórz `http://localhost:8080`.

Plik wejściowy: `dist/index.html`. Style i skrypty są osadzone w tym pliku, a trzy główne grafiki znajdują się w `dist/assets`.

## Funkcje

- pełna strona sprzedażowa usługi genealogicznej;
- menu responsywne;
- szybki test gotowości materiałów;
- trzy warianty współpracy;
- galeria i FAQ;
- demonstracyjny formularz niewysyłający danych.

## Publikacja

Ustaw `dist` jako katalog publiczny. Plik `.openai/hosting.json` jest zanonimizowany i nie zawiera identyfikatora istniejącego wdrożenia.

Przed komercyjną publikacją uzupełnij prawdziwe dane, zakres oferty, dokumenty prawne i backend formularza zgodnie z dokumentacją w katalogu `../../docs`.

