# Zasoby wizualne i prompty

## 1. Kierunek artystyczny

Estetyka łączy spokój rodzinnego archiwum z wyrafinowaną prezentacją wnętrzarską. Premium wynika z materiałów, światła, kompozycji i dbałości o detale, a nie z ostentacyjnych symboli luksusu.

### Paleta

- głęboka zieleń leśna: około `#173b33` i `#183c34`;
- ciepła kość słoniowa/krem: około `#f8f4eb` i `#fffdf8`;
- stare złoto: około `#b58b4d` i `#a77d40`;
- ciemny orzech, pergamin, stonowany brąz i szarość.

### Typografia

- nagłówki: krój szeryfowy w duchu Georgia;
- tekst i interfejs: neutralny sans-serif systemowy/Inter;
- duża ilość światła między blokami;
- ograniczona liczba wersalików i ozdobników.

### Forma interfejsu

- umiarkowane, nieprzesadne zaokrąglenia;
- cienkie ramki;
- spokojne cienie;
- czytelne karty i wyraźne stany wyboru;
- subtelne przejścia, bez efektów odciągających uwagę od treści.

## 2. Dołączone obrazy

Te same trzy obrazy są użyte w obu wariantach i znajdują się odpowiednio w `source/static/dist/assets` oraz `source/react/public`.

### `hero-genealogia.png`

Rola: pierwszy widok. Przedstawia oprawione, pionowe drzewo rodzinne w eleganckim domowym wnętrzu. Kadr pozostawia miejsce na tekst i wzmacnia skojarzenie z gotową pamiątką.

Prompt odtworzeniowy:

> Product mock-up for a premium genealogy-service landing-page hero: an elegant finished family-tree artwork presented as a meaningful anniversary gift in a refined Polish home. Close interior vignette, framed vertical print leaning on a dark walnut console, with a sepia family photo and a linen album. Focus on the artwork's branching composition and portrait ovals, but no readable names. Photorealistic editorial interior photography, landscape 3:2, artwork on the right two-thirds and darker negative space on the left for headline copy. Soft window light; deep forest green, warm ivory, antique gold and walnut palette. No brand, no readable text, no watermark, no people.

### `realizacja-rodowa.png`

Rola: portfolio/proces. Pokazuje rozbudowaną kompozycję jako starannie opracowany artefakt archiwalny.

Prompt odtworzeniowy:

> Custom multi-generation family-tree poster with vintage portrait medallions laid flat on a dark wood table, accompanied by cotton gloves, a brass magnifying glass and old family photographs. Photorealistic top-down editorial photography, 4:3 composition, museum-like soft light; parchment, charcoal, muted olive and antique brass palette. No readable names, no logos, no watermark, no electronics.

### `prezent-rodzinny.png`

Rola: sekcja prezentowa. Pokazuje moment otwierania oprawionej pamiątki bez identyfikowalnych twarzy.

Prompt odtworzeniowy:

> An elegantly wrapped large flat frame containing a family-tree print being opened at a family dining table during a quiet milestone celebration. Hands of two adults only, linen ribbon, subtle white flowers and an old photograph. Photorealistic candid editorial style in a sophisticated Polish home, 4:3, warm afternoon light; forest-green ribbon, warm cream paper, walnut and soft gold palette. No readable text, no logos, no watermark, no balloons, no excessive decor.

## 3. Zasady regeneracji

- zachowaj orientację i proporcje pliku, aby nie zmienić układu sekcji;
- nie generuj czytelnych danych osób na drzewie;
- unikaj herbów i znaków mogących sugerować autentyczne pochodzenie;
- nie używaj twarzy rzeczywistych klientów bez zgody;
- nie dodawaj znaków wodnych, logo ani napisów;
- sprawdź obraz w pełnej rozdzielczości pod kątem zniekształconych dłoni, ramek i portretów;
- zoptymalizuj wynik do WebP/AVIF, zachowując PNG jako źródło, jeśli proces publikacji na to pozwala.

## 4. Zasady portfolio produkcyjnego

Prawdziwe realizacje mogą ujawniać nazwiska, daty, zdjęcia i relacje rodzinne. Przed publikacją należy uzyskać jednoznaczną zgodę, ustalić zakres anonimizacji i zachować dowód zgody. Bezpieczniejszą alternatywą jest pokazanie zbliżeń detali z zamazanymi danymi albo przygotowanie przykładu fikcyjnego wyraźnie oznaczonego jako wizualizacja.

## 5. Pliki i ścieżki

Nazwy obrazów są częścią kontraktu między kodem a zasobami. Przy podmianie najlepiej zachować nazwy. Jeśli zostaną zmienione, trzeba zaktualizować odwołania w `source/static/dist/index.html` oraz `source/react/app/page.tsx`.

