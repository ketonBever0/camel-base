
# Teve nyilvántartó frontend

## Futtatás

### Előfeltételek

- Legyen NodeJS a gépen.

- Fusson a backend.

- Legyen létrehozva az `src` mappán belül egy `env` mappa, benne egy `environment.ts` fájllal, aminek tartalma:

 ```
 export const env = {
   apiUrl: 'http://localhost:5276/api/',
 };
 ```

 - A portszám változhat, ezt a backend által megnyitott Swagger UI címsorában lehet ellenőrizni

### Lépések

1. Nyiss egy terminált a frontend mappára.

2. Parancs: `npm install`

3. Parancs: `ng serve`

4. Nyisd meg a linket böngészőben.

## Route-ok

- Főoldal

- Tevék oldal

- Listázás

- Hozzáadás

- Szerkesztés

- Törlés

- Hozzáadás és Szerkesztés ugyanazt a formot használja

- Form validálódik, ha eltöröljük a releváns validátorokat a kódból, backendből jön a hiba.

## Tesztek

- Tevék oldal (mock-olva van, így független a backendtől)

- Betöltődnek-e az adatok

- Kitöltődik-e a form szerkesztéskor

- Form validáció
