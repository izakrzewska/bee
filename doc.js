// zrobione:
// - dodawanie pasieki
// - usuwanie pasieki
// - wchodzenie w detale pasieki
// - model Beehive (tzn schema mongoosa) + type do graphql
// - dodaje sie ul do pasieki z contentem
// - dodaje sie ul do pasieki z wybranymi kolorami ula (tablica z trzech mozliwych)
// - dodaje sie ul do pasieki aktywny/nieaktywny
// - dodaje sie ul do pasieki z pusta tablica statusow (poki co stringow)
// - dodaje sie pasieka z wybrana liczba uli w rzedzie
// - dodaje sie ul z pozycja ustawiona sztywno na row 1 position
// - dodaje sie ul z odpowiednio wyliczonym rowem i position
// - instalacja google react maps i wyswietlenie mapy
// - model pasieka ma coordinates z lng i lat;
// - brac lokalizacje od uzytkownika podczas dodawania mapy i dodawac ja do mapy jako center
// - marker pojawia sie na mapie po kliknieciu na nia i jednoczesnie staje sie koordynatami nowej pasieki
// - na widoku pasiek mozna zmienic albo widok listy albo widok mapy z pasiekami
// - onClick na pasieke na mapie przenosi do detailsow
// - wszystkie komponenty funkcyjne
// - usequeries dodane + usemutations dodane
// - dodac komponent na loding i error
// - app.js ostylowane

// to do:
// - bug na pierwsze ladowanie mapy (?? kiedy on jest)
// - refactor reacy routera na v4
// na pozniejsze etapy:
// - ostylowac ladnie
// - statusy uli (glodny, brak matki (czerwony), trutowka (czerwono zolty), slaba matka (zolta))
// - akcje na pasiece, ale przekazywane do kazdego ula, zeby mozna bylo edytowac indywidualnie w razie potrzeby
// - kratowanie pasieki (w dzień A, A + 9 dni sprawdzenie czegoś?, A + 24 miodobranie)
// - wlozenie ramek do odkładów (w dzień A, A + 21 wyjęcie odkładów, zmienia się status jaki?)
// - leczenie (w dzień A, A + 14 dni zmienić leki)
// - karmienia (w dzień A, później A + 7, A + 14, i tak razy 6? )
