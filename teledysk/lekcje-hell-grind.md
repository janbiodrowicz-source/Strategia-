# Lekcje z „Hell Grind: Rebuilding Our Biggest Fight Scene from Scratch”

Źródło: film Higgsfield z 5.08.2026 (Adil), transkrypcja z polskim lektorem. Twórcy „Hell Grind” (pierwszy pełnometrażowy film AI, Seedance 2.0 w Higgsfield Cinema Studio) pokazują krok po kroku, jak przebudowali scenę walki. Nasze skille (`cinedance`, `lira-image-prompts`, `acting`) pochodzą z tego samego workflow. Poniżej tylko to, co się nam przyda, z odniesieniem do „Zostań tu”.

## Metoda pracy
1. **Najpierw kanwa i assety, potem prompt.** Postacie, statyści, lokacja i rekwizyty są gotowe przed pierwszym ujęciem (u nas zasada 7).
2. **Lokacja z dwóch stron.** Zbuduj osobny widok z przodu i z tyłu lokacji. Model przestaje zgadywać, co jest za postacią, a kolejne generacje się nie rozjeżdżają. *U nas: przy ujęciach z kontrplanem (np. kawalerka, salon) warto mieć drugi widok lokacji.*
3. **Karta postaci pod konkretną scenę.** Do sceny, w której bohater ma wyglądać inaczej (zmęczony, ranny), robią dodatkową kartę postaci. *U nas: np. Ania i Tomek rano po przebudzeniu, w strojach z przeprowadzki, w outro.*
4. **Statyści jako typy postaci, a nie „tłum”.** Prośba o tłum daje identyczne klony. Pomagają 2–3 osobne typy statystów z referencjami (np. „ciężki” i „lekki”).
5. **Generuj serię (x4).** Przy czterech wersjach naraz od razu widać, czy błąd to pech losowania (pojawia się w jednej), czy wina promptu (pojawia się we wszystkich). Nie przepisuj promptu, który działa, tylko losuj dalej.
6. **Czytaj generację, nazwij błąd prostymi słowami, popraw tylko to.** „Prawdziwa umiejętność to nie jeden genialny prompt, tylko odczytanie, co się zepsuło, i naprawienie tylko tego” (u nas zasada 6).
7. **Najlepsze fragmenty z kilku generacji.** Z jednej udanej serii brali po dwa klipy albo miksowali kawałki kilku generacji w montażu.

## Pisanie promptów
1. **Liczby zamiast przymiotników.** Ruch kamery w metrach („z 8 m do 4 m, z 3 m wysokości do 2 m”), czas w sekundach, odległości w centymetrach. Modele wolą arytmetykę od słów w stylu „dramatycznie”.
2. **Porównanie zamiast ogólnika.** Nie „szybko”, tylko „trzy razy szybciej niż typowy filmowy odjazd na wózku”.
3. **Akcja co pół sekundy.** Kluczowy ruch rozbity na kroki (dłoń 0,5 s, hełm 1,5 s, wyprostowany 3 s). Wtedy model niczego nie przyspieszy ani nie pominie (u nas ACTION TIMING).
4. **Twarda liczba dla szybkich przemian.** „Przemiana trwa 0,4 s, to wysunięcie broni, a nie magiczna sekwencja”. Bez tego model robi świecące „power-upy” jak z anime.
5. **Negatywne prompty nie działają.** Model ignoruje „nie”, a samo słowo przyciąga to, czego zakazujemy („to nie gra, żadnego CGI” powtórzone kilkanaście razy dało wygląd gry). **Opisuj, czego chcesz** (światło, faktury, ruch). *U nas już tak robimy: POSITIVE CONSTRAINTS i „usta zamknięte” zamiast „nie mówi”.*
6. **Pokaż modelowi problematyczny element.** Model dorysowywał potworowi dłoń mimo zakazu. Pomogło, gdy potwór **uniósł ramię**, żeby model je zobaczył. *U nas analogia z ujęciem 4: zamiast walczyć z klamką tekstem, ustawiliśmy dłoń na klatce startowej.*
7. **Montaż w jednym prompcie: twarde cięcia z osobnymi obiektywami.** Jedno długie, płynące ujęcie za bohaterem wygląda jak gra wideo. Pomogły cztery twarde cięcia z osobnymi obiektywami (50 mm z obrotem, 24 mm żabia perspektywa, 85 mm zbliżenie, 35 mm plan ogólny). *U nas: przydatne w refrenach i dropie (1:15), gdzie chcemy energii.*
8. **Zablokuj cięcie między ujęciami.** Napisz wprost, że pozy na końcu ujęcia A dokładnie odpowiadają początkowi ujęcia B. Inaczej model traktuje cięcie jak nową scenę. *U nas: przejście u04 → u05 (Tomek w progu, pudło przy stopie).*
9. **Fizyka jako kąty i zasady.** Zamiast „zderzenie mieczy”: „pionowe cięcie spotyka ukośną zasłonę, kryształ zawsze wygrywa ze stalą”. Jedna twarda zasada daje przewidywalny wynik.

## Triki na skalę i tło
1. **Mgła (albo inna ograniczona widoczność) ukrywa błędy tła.** Przy dużej skali AI sypie się w tle, a mgła z widocznością do 20 m to „najtańsze sprzątanie”. Dziś (Seedance w 4K) ma to mniejsze znaczenie, ale nadal działa. *U nas: płytka głębia ostrości, poranne światło lub deszcz za oknem dają ten sam efekt.*
2. **Tłum w trzech warstwach.** Jeden ostry statysta z przodu, gęsty tłum za nim, sylwetki znikające w tle. Widać około 40 osób, a mózg dopowiada resztę. Prompt nigdy nie mówi „tysiąc”.
3. **Zamrożony finał jako cliffhanger.** Akcja kończy się zatrzymaną pozą (np. wszyscy naraz w pozycji bojowej). To daje napięcie i czysty punkt cięcia w montażu.
