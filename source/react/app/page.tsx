"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileImage, Gift, HeartHandshake, Image as ImageIcon, Layers3, MessageCircle, ScanSearch, Sparkles, TreePine } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Purpose = "prezent" | "pamiatka" | "porzadek";
type Style = "botaniczny" | "klasyczny" | "wspolczesny";
type Plan = "Kompozycja" | "Historia rodziny" | "Pamiątka premium";
type Config = { purpose: Purpose | ""; materials: string[]; style: Style | ""; plan: Plan };
type ModelContext = { registerTool: (tool: { name: string; title?: string; description: string; inputSchema: object; annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean }; execute: (input: unknown) => unknown | Promise<unknown> }, options?: { signal?: AbortSignal }) => void | Promise<void> };

declare global { interface Document { modelContext?: ModelContext } }

const purposeOptions = [
  { value: "prezent", title: "Wyjątkowy prezent", copy: "Na urodziny, jubileusz lub rocznicę.", icon: Gift },
  { value: "pamiatka", title: "Pamiątka dla rodziny", copy: "Historia, którą można przekazać dalej.", icon: HeartHandshake },
  { value: "porzadek", title: "Uporządkowanie historii", copy: "Zebranie zdjęć, nazwisk i opowieści.", icon: Layers3 },
] as const;
const materials = [
  { value: "names", label: "Imiona, nazwiska lub daty" }, { value: "photos", label: "Stare fotografie" },
  { value: "documents", label: "Dokumenty lub notatki" }, { value: "stories", label: "Rodzinne opowieści" },
];
const styles = [
  { value: "botaniczny", title: "Botaniczny", copy: "Miękka ilustracja, naturalne detale, fotografia.", swatch: "swatch-botanical" },
  { value: "klasyczny", title: "Klasyczny", copy: "Symetryczna kompozycja inspirowana archiwum.", swatch: "swatch-classic" },
  { value: "wspolczesny", title: "Współczesny", copy: "Czysta typografia i spokojna, lekka forma.", swatch: "swatch-modern" },
] as const;
const purposeLabel: Record<Purpose, string> = { prezent: "wyjątkowy prezent", pamiatka: "rodzinną pamiątkę", porzadek: "uporządkowanie historii" };
const styleLabel: Record<Style, string> = { botaniczny: "botaniczny", klasyczny: "klasyczny", wspolczesny: "współczesny" };
const defaultConfig: Config = { purpose: "", materials: [], style: "", plan: "Historia rodziny" };

export default function Home() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [storageReady, setStorageReady] = useState(false);
  const [sent, setSent] = useState(false);
  const canContinue = step === 1 ? Boolean(config.purpose) : step === 2 ? config.materials.length > 0 : step === 3 ? Boolean(config.style) : true;
  const configSummary = useMemo(() => ({ purpose: config.purpose ? purposeLabel[config.purpose] : "jeszcze nie wybrano", materials: config.materials.length, style: config.style ? styleLabel[config.style] : "do ustalenia", plan: config.plan }), [config]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const saved = window.localStorage.getItem("pracownia-korzeni-config");
      if (saved) {
        try { setConfig((current) => ({ ...current, ...(JSON.parse(saved) as Partial<Config>) })); }
        catch { window.localStorage.removeItem("pracownia-korzeni-config"); }
      }
      setStorageReady(true);
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);
  useEffect(() => {
    if (!storageReady) return;
    window.localStorage.setItem("pracownia-korzeni-config", JSON.stringify(config));
  }, [config, storageReady]);

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const reportError = (error: unknown) => console.warn("WebMCP tool registration failed", error);
    void Promise.resolve(context.registerTool({
      name: "start_tree_configuration", title: "Rozpocznij konfigurację drzewa",
      description: "Rozpoczyna widoczny konfigurator drzewa genealogicznego od wybranego celu.",
      inputSchema: { type: "object", properties: { purpose: { type: "string", enum: ["prezent", "pamiatka", "porzadek"] } }, required: ["purpose"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const candidate = input as { purpose?: string };
        if (!candidate || !["prezent", "pamiatka", "porzadek"].includes(candidate.purpose ?? "")) throw new Error("Nieprawidłowy cel konfiguracji.");
        const purpose = candidate.purpose as Purpose;
        setConfig((current) => ({ ...current, purpose })); setStep(2);
        document.getElementById("konfigurator")?.scrollIntoView({ behavior: "smooth", block: "center" });
        return { status: "started", purpose, visibleStep: 2 };
      },
    }, { signal: lifecycle.signal })).catch(reportError);
    void Promise.resolve(context.registerTool({
      name: "read_tree_configuration", title: "Odczytaj konfigurację drzewa",
      description: "Odczytuje aktualnie widoczne wybory w konfiguratorze.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() { return { step, ...configSummary }; },
    }, { signal: lifecycle.signal })).catch(reportError);
    return () => lifecycle.abort();
  }, [configSummary, step]);

  const choosePlan = (plan: Plan) => { setConfig((current) => ({ ...current, plan })); setStep(1); document.getElementById("konfigurator")?.scrollIntoView({ behavior: "smooth", block: "center" }); };
  const toggleMaterial = (value: string, checked: boolean) => setConfig((current) => ({ ...current, materials: checked ? [...new Set([...current.materials, value])] : current.materials.filter((item) => item !== value) }));

  return <main>
    <header className="site-header">
      <a className="brand" href="#start"><span className="brand-mark"><TreePine /></span><span>Pracownia <i>Korzeni</i></span></a>
      <nav className="desktop-nav" aria-label="Główna nawigacja"><a href="#proces">Jak to działa</a><a href="#personalizacja">Personalizacja</a><a href="#warianty">Warianty</a><a href="#faq">FAQ</a></nav>
      <Button className="header-cta" onClick={() => document.getElementById("konfigurator")?.scrollIntoView({ behavior: "smooth" })}>Zacznij od tego, co wiesz</Button>
    </header>

    <section className="app-hero" id="start">
      <div className="hero-copy">
        <p className="eyebrow"><span /> Osobista historia w pięknej formie</p><h1>Twoja rodzina ma historię, której nie da się kupić.</h1>
        <p className="hero-lead">Można ją jednak zebrać, uporządkować i zamienić w indywidualne drzewo genealogiczne — dla bliskiej osoby albo dla kolejnych pokoleń.</p>
        <div className="trust-row"><span><Check /> Projekt przed drukiem</span><span><Check /> Pomoc od pierwszej informacji</span><span><Check /> Pełna personalizacja</span></div>
        <figure className="hero-image"><img src="/assets/hero-genealogia.png" alt="Oprawione, botaniczne drzewo genealogiczne w ciemnozielonym wnętrzu" /><figcaption>Przykładowy kierunek: kompozycja botaniczna z fotografiami</figcaption></figure>
      </div>
      <aside className="config-card" id="konfigurator" aria-labelledby="config-title">
        <div className="config-top"><div><span className="step-label">Krok {step} z 4</span><h2 id="config-title">{step === 1 ? "Dla kogo powstaje drzewo?" : step === 2 ? "Co masz już pod ręką?" : step === 3 ? "Który kierunek jest Ci najbliższy?" : "To dobry punkt wyjścia."}</h2></div><span className="saved">zapisywane lokalnie</span></div>
        <Progress value={step * 25} aria-label={`Postęp: ${step * 25}%`} />
        <div className="config-body">
          {step === 1 && <RadioGroup value={config.purpose} onValueChange={(value) => setConfig((current) => ({ ...current, purpose: value as Purpose }))} className="option-grid">{purposeOptions.map(({ value, title, copy, icon: Icon }) => <label className="radio-card" key={value} data-active={config.purpose === value}><RadioGroupItem value={value} /><Icon /><span><strong>{title}</strong><small>{copy}</small></span></label>)}</RadioGroup>}
          {step === 2 && <div className="material-grid">{materials.map((item) => <label className="check-card" key={item.value} data-active={config.materials.includes(item.value)}><Checkbox checked={config.materials.includes(item.value)} onCheckedChange={(checked) => toggleMaterial(item.value, checked === true)} /><span>{item.label}</span></label>)}<p className="reassure"><Sparkles /> Nawet jedna zaznaczona rzecz wystarczy, żeby zacząć rozmowę.</p></div>}
          {step === 3 && <RadioGroup value={config.style} onValueChange={(value) => setConfig((current) => ({ ...current, style: value as Style }))} className="style-grid">{styles.map((item) => <label className="style-card" key={item.value} data-active={config.style === item.value}><span className={`style-swatch ${item.swatch}`} /><span><strong>{item.title}</strong><small>{item.copy}</small></span><RadioGroupItem value={item.value} /></label>)}</RadioGroup>}
          {step === 4 && !sent && <div className="summary"><div className="summary-row"><span>Cel</span><strong>{configSummary.purpose}</strong></div><div className="summary-row"><span>Materiały</span><strong>{configSummary.materials} {configSummary.materials === 1 ? "rodzaj" : "rodzaje"}</strong></div><div className="summary-row"><span>Styl</span><strong>{configSummary.style}</strong></div><div className="summary-row"><span>Zakres</span><strong>{configSummary.plan}</strong></div><form className="contact-mini" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label htmlFor="contactEmail">Gdzie możemy wysłać krótką odpowiedź?</label><input id="contactEmail" type="email" required placeholder="Twój adres e-mail" /><Button type="submit" size="lg">Poproś o wstępną konsultację <ArrowRight /></Button><small>Wersja demonstracyjna — dane nie są wysyłane.</small></form></div>}
          {step === 4 && sent && <div className="success-state"><span><Check /></span><h3>Dziękujemy za opowiedzenie początku tej historii.</h3><p>W pełnej wersji usługi w tym miejscu otrzymasz potwierdzenie i propozycję pierwszej rozmowy. Ten demonstracyjny formularz nie wysyła danych.</p><Button variant="outline" onClick={() => { setSent(false); setStep(1); }}>Zacznij nową konfigurację</Button></div>}
        </div>
        {!sent && <div className="config-actions">{step > 1 && <Button variant="ghost" onClick={() => setStep((current) => current - 1)}><ArrowLeft /> Wstecz</Button>} {step < 4 && <Button className="next-button" disabled={!canContinue} onClick={() => canContinue && setStep((current) => Math.min(4, current + 1))}>Dalej <ArrowRight /></Button>}</div>}
      </aside>
    </section>

    <section className="problem-section section-pad"><div className="section-heading"><p className="eyebrow"><span /> Punkt wyjścia</p><h2>Rodzinna historia rzadko leży w jednym miejscu.</h2></div><div className="problem-grid"><article><b>01</b><ImageIcon /><h3>Zdjęcia</h3><p>Są w albumach, pudełkach i telefonach kilku osób.</p></article><article><b>02</b><ScanSearch /><h3>Informacje</h3><p>Ktoś pamięta nazwiska, ktoś inny daty i miejscowości.</p></article><article><b>03</b><MessageCircle /><h3>Opowieści</h3><p>Najważniejsze szczegóły wciąż żyją tylko w rozmowach.</p></article></div><p className="bridge-copy">Nie musisz najpierw samodzielnie porządkować wszystkiego. Naszą rolą jest pomóc Ci zobaczyć, co już masz — i czego naprawdę jeszcze potrzeba.</p></section>

    <section className="solution-section section-pad"><div className="solution-photo"><img src="/assets/realizacja-rodowa.png" alt="Klasyczne drzewo genealogiczne z archiwalnymi portretami" /><div className="photo-note"><span>Projekt 04/26</span><strong>Rodzina Nowaków</strong><small>5 pokoleń • 34 portrety • 3 miejscowości</small></div></div><div className="solution-copy"><p className="eyebrow"><span /> Rozwiązanie</p><h2>Od zbioru śladów do czytelnej opowieści.</h2><p className="body-lead">Każdy projekt zaczynamy od rozmowy, nie od szablonu. Ustalamy, co ma znaleźć się na drzewie, jaką historię ma opowiadać i komu będzie wręczone.</p><ul className="tick-list"><li><Check /> porządkujemy przekazane informacje</li><li><Check /> pomagamy rozpoznać luki i kolejne kroki</li><li><Check /> projektujemy kompozycję od podstaw</li><li><Check /> pokazujemy projekt przed finalnym wykonaniem</li></ul><Button variant="outline" onClick={() => document.getElementById("konfigurator")?.scrollIntoView({ behavior: "smooth" })}>Sprawdź swój punkt wyjścia</Button></div></section>

    <section className="process-section section-pad" id="proces"><div className="process-intro"><p className="eyebrow light"><span /> Jak to działa</p><h2>Spokojny proces.<br />Cztery czytelne etapy.</h2><p>Wiesz, co dzieje się z materiałami i kiedy podejmujesz kolejne decyzje.</p></div><ol className="timeline"><li><span>01</span><div><h3>Rozmowa</h3><p>Poznanie okazji, odbiorcy i materiałów, które masz.</p></div></li><li><span>02</span><div><h3>Plan</h3><p>Zakres, format, kierunek wizualny i harmonogram.</p></div></li><li><span>03</span><div><h3>Projekt</h3><p>Kompozycja do wglądu i spokojna runda korekt.</p></div></li><li><span>04</span><div><h3>Realizacja</h3><p>Plik cyfrowy lub oprawiona pamiątka gotowa do wręczenia.</p></div></li></ol></section>

    <section className="custom-section section-pad" id="personalizacja"><div className="section-heading centered"><p className="eyebrow"><span /> Personalizacja</p><h2>Efekt ma wyglądać jak historia tej jednej rodziny.</h2><p>Nie jak gotowy wzór z podmienionymi nazwiskami.</p></div><Tabs defaultValue="kompozycja" className="custom-tabs"><TabsList variant="line"><TabsTrigger value="kompozycja">Kompozycja</TabsTrigger><TabsTrigger value="materialy">Materiały rodzinne</TabsTrigger><TabsTrigger value="wykonczenie">Wykończenie</TabsTrigger></TabsList><TabsContent value="kompozycja"><div className="tab-layout"><div><h3>Forma dopasowana do historii</h3><p>Mała rodzina może potrzebować oddechu i większych fotografii. Rozbudowane drzewo — precyzyjnego rytmu, który zachowa czytelność.</p><div className="feature-pills"><span>liczba pokoleń</span><span>układ pionowy lub poziomy</span><span>styl botaniczny lub typograficzny</span></div></div><div className="mini-art botanical"><TreePine /><span>4 pokolenia</span></div></div></TabsContent><TabsContent value="materialy"><div className="tab-layout"><div><h3>To, co już należy do rodziny</h3><p>Fotografie, fragmenty listów, podpisy i szkice miejsc mogą stać się częścią kompozycji — o ile wspierają opowieść, zamiast ją przeładować.</p><div className="feature-pills"><span>portrety</span><span>dokumenty</span><span>miejscowości</span><span>krótkie historie</span></div></div><div className="mini-art archival"><FileImage /><span>materiały archiwalne</span></div></div></TabsContent><TabsContent value="wykonczenie"><div className="tab-layout"><div><h3>Od pliku po gotowy prezent</h3><p>Możesz wybrać sam plik do druku albo powierzyć nam papier, oprawę i eleganckie przygotowanie prezentu.</p><div className="feature-pills"><span>papier artystyczny</span><span>oprawa</span><span>plik cyfrowy</span><span>pakowanie</span></div></div><div className="mini-art finish"><Sparkles /><span>gotowe do wręczenia</span></div></div></TabsContent></Tabs></section>

    <section className="plans-section section-pad" id="warianty"><div className="section-heading"><p className="eyebrow"><span /> Warianty</p><h2>Wybierz punkt startowy, nie ostateczne zobowiązanie.</h2><p>Po krótkiej rozmowie potwierdzimy, który zakres ma sens dla Twoich materiałów.</p></div><div className="plan-grid">{([{ name: "Kompozycja" as Plan, forWhom: "Masz uporządkowane dane", features: ["projekt do 4 pokoleń", "wybrany styl", "2 rundy korekt", "plik do druku"] }, { name: "Historia rodziny" as Plan, forWhom: "Masz materiały z kilku źródeł", badge: "najczęściej wybierany", features: ["konsultacja materiałów", "porządkowanie danych", "projekt ze zdjęciami", "3 rundy korekt", "plik cyfrowy i drukarski"] }, { name: "Pamiątka premium" as Plan, forWhom: "Chcesz gotowy prezent", features: ["pełna opieka projektowa", "rozbudowana kompozycja", "druk artystyczny", "oprawa i pakowanie"] }]).map((plan) => <article className={`plan-card ${plan.badge ? "featured" : ""}`} key={plan.name}>{plan.badge && <span className="plan-badge">{plan.badge}</span>}<h3>{plan.name}</h3><p className="for-whom">{plan.forWhom}</p><ul>{plan.features.map((feature) => <li key={feature}><Check /> {feature}</li>)}</ul><Button variant={plan.badge ? "default" : "outline"} onClick={() => choosePlan(plan.name)}>Wybieram jako punkt startowy</Button></article>)}</div></section>

    <section className="gift-section"><img src="/assets/prezent-rodzinny.png" alt="Rodzinne drzewo genealogiczne rozpakowywane podczas uroczystego spotkania" /><div className="gift-panel"><p className="eyebrow light"><span /> Prezent, który otwiera rozmowę</p><h2>Najpierw cisza. Potem: „Pamiętasz tę historię?”</h2><p>Drzewo genealogiczne nie kończy się w chwili wręczenia. Prowadzi do zdjęć, wspomnień i pytań, które łączą kolejne pokolenia.</p><div className="occasion-list"><span>50.–80. urodziny</span><span>rocznica</span><span>jubileusz</span><span>święta</span></div><Button className="light-button" onClick={() => { setConfig((current) => ({ ...current, purpose: "prezent" })); setStep(2); document.getElementById("konfigurator")?.scrollIntoView({ behavior: "smooth" }); }}>Zacznij projekt prezentu <ArrowRight /></Button></div></section>

    <section className="gallery-section section-pad" id="realizacje"><div className="section-heading"><p className="eyebrow"><span /> Realizacje</p><h2>Trzy spojrzenia na rodzinne dziedzictwo.</h2></div><div className="gallery-grid"><figure className="gallery-large"><img src="/assets/realizacja-rodowa.png" alt="Rozbudowane drzewo z wieloma fotografiami" /><figcaption><strong>Archiwum rodzinne</strong><span>5 pokoleń • fotografie i miejsca</span></figcaption></figure><figure><img src="/assets/hero-genealogia.png" alt="Oprawione botaniczne drzewo rodzinne" /><figcaption><strong>Domowa galeria</strong><span>4 pokolenia • ilustracja botaniczna</span></figcaption></figure><figure><img src="/assets/prezent-rodzinny.png" alt="Drzewo przygotowane jako prezent" /><figcaption><strong>Jubileusz</strong><span>projekt • druk • oprawa</span></figcaption></figure></div></section>

    <section className="faq-section section-pad" id="faq"><div className="faq-intro"><p className="eyebrow"><span /> FAQ</p><h2>Pytania, które dobrze zadać na początku.</h2><p>Jeśli nie znajdziesz swojej odpowiedzi, konfigurator pomoże nam od razu zrozumieć Twój punkt wyjścia.</p></div><Accordion type="single" collapsible defaultValue="item-1" className="faq-accordion"><AccordionItem value="item-1"><AccordionTrigger>Nie mam gotowego drzewa. Czy mogę zacząć?</AccordionTrigger><AccordionContent>Tak. Kilka pewnych nazwisk, zdjęcie lub osoba, która pamięta rodzinne historie, to wystarczający początek.</AccordionContent></AccordionItem><AccordionItem value="item-2"><AccordionTrigger>Czy pomagacie szukać brakujących informacji?</AccordionTrigger><AccordionContent>W wybranym zakresie możemy pomóc zaplanować i przeprowadzić poszukiwania w dostępnych źródłach. Nie obiecujemy jednak informacji, których nie da się potwierdzić.</AccordionContent></AccordionItem><AccordionItem value="item-3"><AccordionTrigger>Czy zobaczę projekt przed drukiem?</AccordionTrigger><AccordionContent>Tak. Każdy wariant obejmuje prezentację projektu i ustaloną liczbę korekt przed finalnym przygotowaniem.</AccordionContent></AccordionItem><AccordionItem value="item-4"><AccordionTrigger>Jak dużo osób zmieści się na jednej planszy?</AccordionTrigger><AccordionContent>Zależy to od formatu i liczby dodatkowych materiałów. Najpierw proponujemy układ, który zachowa czytelność, nawet przy rozbudowanej rodzinie.</AccordionContent></AccordionItem><AccordionItem value="item-5"><AccordionTrigger>Ile czasu trwa realizacja?</AccordionTrigger><AccordionContent>Zwykle kilka tygodni. Dokładny termin zależy od liczby pokoleń, kompletności materiałów i wybranego wykończenia; potwierdzamy go przed rozpoczęciem.</AccordionContent></AccordionItem></Accordion></section>

    <section className="final-cta section-pad"><TreePine /><p className="eyebrow light"><span /> Zacznij bez kompletnego planu</p><h2>Masz kilka nazwisk i jedno zdjęcie?<br />To już jest początek.</h2><p>Odpowiedz na trzy krótkie pytania. Zobaczysz podsumowanie, od którego można rozpocząć pierwszą rozmowę.</p><Button className="light-button" size="lg" onClick={() => { setStep(1); document.getElementById("konfigurator")?.scrollIntoView({ behavior: "smooth" }); }}>Skonfiguruj swój projekt <ArrowRight /></Button></section>
    <footer><a className="brand" href="#start"><span className="brand-mark"><TreePine /></span><span>Pracownia <i>Korzeni</i></span></a><p>Indywidualne drzewa genealogiczne • Projekt demonstracyjny</p><a href="#start">Wróć na górę ↑</a></footer>
  </main>;
}
