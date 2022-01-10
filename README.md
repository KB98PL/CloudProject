# CloudProject
1. Krótki opis aplikacji

Projekt dotyczy implementacji systemu do wypożyczania filmów za pośrednictwem strony internetowej. Zawiera on między innymi takie funkcjonalności jak wypożyczanie filmów, oddawanie ich, dodawanie klientów wypożyczalni oraz modyfikowanie ich danych. Jest to przydatne oprogramowanie dla kogoś, kto zarządza całą wypożyczalnią.

2. Lista funkcjonalności aplikacji
- Wyświetl listę filmów

Opis: Po zalogowaniu się na konto użytkownika na stronie głównej wyświetla się lista dostępnych do wypożyczenia filmów odczytanych z bazy danych

Dane wejściowe: login i hasło użytkownika

Źródło danych wejściowych: pola typu input w zakładce "Zaloguj"

Wynik: -
- Wyświetl listę moich wypożyczeń

Opis: po zalogowaniu się na dowolnego użytkownika na stronie głównej, pod listą dostępnych do wypożyczenia filmów wyświetla się historia wypożyczeń zalogowanego użytkownika 

Dane wejściowe: login i hasło użytkownika

Źródło danych wejściowych: pola typu input w zakładce "Zaloguj"

Wynik: -
- Wyświetl listę wszystkich wypożyczeń

Opis: po zalogowaniu się jako administrator na stronie głównej wyświetla się lista wszystkich wypożyczeń dokonanych na stronie internetowej 

Dane wejściowe: login i hasło administratora

Źródło danych wejściowych: pola typu input w zakładce "Zaloguj"

Wynik: -

- Wypożycz film

Opis: Po zalogowaniu się jako użytkownik lub jako administrator i wybraniu filmu z listy dostępnych filmów na stronie głównej można kliknąć przycisk "Wypozycz". W przypadku zwykłego użytkownika powoduje to usunięcie filmu z listy dostępnych filmów oraz przepisanie go do listy wypożyczeń zalogowanego użytkownika. W przypadku administratora po kliknięciu "Wypozycz" podajemy dodatkowo dane klienta, którego dotyczy wypożyczenie.

Dane wejściowe: Dane dotyczące filmu oraz klienta

Źródło danych wejściowych: pola typu input w zakładce "Zaloguj" lub dane podane przez administratora oraz wybrany przycisk

Wynik: Wypożyczenie filmu przez użytkownika

- Dodaj nowego klienta

Opis: Po zalogowaniu się jako administrator oraz wejściu w zakładkę "Admin panel" na stronie widnieje przycisk "Dodaj klienta". Po kliknięciu go podajemy dane nowego klienta takie jak imię, nazwisko, nick, hasło itp. Następnie klikamy zapisz. Nowy rekord jest dodawany do bazy danych.

Dane wejściowe: Dane dotyczące nowego klienta: imię nazwisko, nick, adres, telefon, hasło

Źródło danych wejściowych: Pola typu input po kliknięciu przycisku "Dodaj klienta"

Wynik: Dodanie nowego klienta - użytkownika do bazy danych 

- Usuń klienta

Opis: Po zalogowaniu się jako administrator oraz po wejściu w zakładkę "Admin panel" można zauważyć czerwone przyciski "Usuń" przy każdym z klientów. Po wybraniu któregoś klienta i kliknięciu "Usuń" jest on usuwany z bazy danych.

Dane wejściowe: Dane dotyczące klienta

Źródło danych wejściowych: Przycisk

Wynik: Usunięcie klienta z bazy danych

- Modyfikuj dane klienta

Opis:Po zalogowaniu się jako administrator oraz po wejściu w zakładkę "Admin panel" można zauważyć niebieskie przyciski "Edytuj" przy każdym z klientów. Po wybraniu któregoś klienta i kliknięciu "Edytuj" mamy możliwość za pomocą pól typu input oraz przycisku "Zapisz" zmienić dane dotyczące klienta.

Dane wejściowe: pola typu input uzupełnione o zapisane na bazie dane dotyczące klienta

Źródło danych wejściowych: Pola typu input

Wynik: Aktualizacja danych w bazie danych

- Dodaj nowy film

Opis: Po zalogowaniu się jako administrator oraz wejściu w zakładkę "Admin panel" na stronie widnieje przycisk "Dodaj film". Po kliknięciu go podajemy dane dotyczące filmu takie jak tytuł, obsada, gatunek, reżyser itp. Następnie klikamy zapisz. Nowy rekord jest dodawany do bazy danych.

Dane wejściowe: Dane dotyczące nowego filmu: tytuł, gatunek, reżyser, obsada, streszczenie filmu, czas trwania, ocena filmu

Źródło danych wejściowych: Pola typu input po kliknięciu przycisku "Dodaj film"

Wynik: Dodanie nowego filmu do bazy danych 

- Edytuj film

Opis:Po zalogowaniu się jako administrator oraz po wejściu w zakładkę "Admin panel" można zauważyć niebieskie przyciski "Edytuj" przy każdym z filmów. Po wybraniu któregoś filmu i kliknięciu "Edytuj" mamy możliwość za pomocą pól typu input oraz przycisku "Zapisz" zmienić dane dotyczące filmu.

Dane wejściowe: pola typu input uzupełnione o zapisane na bazie dane dotyczące filmu

Źródło danych wejściowych: Pola typu input

Wynik: Aktualizacja danych w bazie danych

- Usuń film

Opis: Po zalogowaniu się jako administrator oraz po wejściu w zakładkę "Admin panel" można zauważyć czerwone przyciski "Usuń" przy prawie każdym z filmów. Po wybraniu któregoś filmu i kliknięciu "Usuń" jest on usuwany z bazy danych.

Dane wejściowe: Dane dotyczące filmu, który nie jest wypożyczony

Źródło danych wejściowych: Przycisk

Wynik: Usunięcie filmu z bazy danych
