# Micro-service Project Team 20
In deze GitHub repository stellen wij, Gilles Bosmans en Brice Seymens ons micro-service project voor uit het opleidingsonderdeel Advanced Programming Topics. Het thema van dit project is Formula 1. Er zal dus met data van drivers, teams, tracks en results vanuit de prestige-discipline binnen de auto-sport gewerkt worden.

## Structuur
In onderstaand diagram kan u de hoofdstructuur in een schematische voorstelling terugvinden. Verdere uitleg over de verschillende onderdelen kan u terugvinden onder het diagram.
![Diagram](/documentation/ADV-PRO-PROJECT.drawio.png)

### Databases: MySQL
Zoals u kan zien onderaan het diagram zijn er 3 MySQL databases aangemaakt, namelijk: mysql-team, mysql-driver en mysql-track. Dit hebben we gedaan vanwege de rigide structuren die de entiteiten team, driver en track hebben. 

### Databases: MongoDB
Als 4e database hebben we MongoDB gebruikt voor de resultaten van races op te slagen. De keuze voor MongoDB komt voort uit de grotere flexibiliteit die deze document-based database met zich mee brengt.

### Micro-service: team-service
Een eerste micro-service die we aangemaakt hebben is de team-service. Volgende acties kan deze micro-service uitvoeren:
- Opvragen van alle teams (GET zonder authenticatie)
- Aanmaken van een team (POST Authenticatie vereist)
- Bewerken van een team (PUT Authenticatie vereist)

### Micro-service: driver-service
De volgende micro-service is die voor de drivers, de driver-service. Deze micro-service kan volgende acties uitvoeren:
- Opvragen van alle drivers(GET zonder authenticatie)
- Aanmaken van een driver (POST Authenticatie vereist)
- Bewerken van een driver (PUT Authenticatie vereist)
- Verwijderen van een driver (DELETE Authenticatie vereist)

### Micro-service: track-service
De track micro-service wordt gebruikt voor volgende acties:
- Opvragen van alle tracks (GET zonder authenticatie)
- Aanmaken van een track (POST Authenticatie vereist)

### Micro-service: result-service
De vierde en laatste micro-service is de result-service. Deze kan gebruikt worden voor volgende acties:
- Opvragen van resultaat van race gebaseerd op ID (GET authenticatie niet vereist)
- Aanmaken van een nieuw resultaat van een race (POST Authenticatie vereist)

### API-gateway
Er is een spring cloud gateway voorzien die inkomende requests van door zal sturen naar de correcte micro-services en staat dus als verbinding tussen bijvoorbeeld een front-end en alle micro-services. 
In deze gateway is ook de configuratie voor de authenticatie verwerkt. Hier worden dus bepaald welke endpoints enkel bereikbaar zijn wanneer men een juiste authenticatie kan voorleggen aan de hand van een bearer token. 
Voor de authenticatie is gebruik gemaakt van OAuth2. Hieronder vindt u een overzicht van alle endpoints die bereikbaar zijn via de gateway. Elke endpoint zal volgen op http://localhost:8088/
| Endpoint |      Request method      |  Authenticatie | Functie |
|----------|:-------------:|:------:|----------|
| teams    |  GET          | nee    |Toon alle team|
| teams    |    POST       |   ja   |Maak nieuw team|
| teams    | PUT           |  ja    |Bewerk bestaand team|
| drivers  |GET            | nee    |Toon alle drivers|
| drivers  |POST           | ja    |Maak nieuwe driver|
| drivers  |PUT            | ja    |Bewerk bestaande driver|
| drivers/{id}|DELETE      | ja    |Verwijder driver |
| tracks   |GET            | nee   |Toon alle tracks |
| tracks   |POST           | ja    |Maak nieuwe track |
| result   |GET           | nee    |Toon alle races hun resultaten |
| result/{id}|GET           | nee    |Toon de resultaten van 1 race |
| result   | POST          | ja    | Maak nieuw resultaat|

### Front-end: React applicatie (uitbreiding 2.1)
Om een gebruikers-interface te maken gebruiken we een React applicatie. Hier kan een gebruiker alle functies van onze micro-services gebruiken voor het beheer van drivers, teams, tracks en resultaten.
Deze zal runnen op localhost:3000. Er is gekozen om in het kleurenschema van Formula 1 te werken.

## Docker
Om alles op te starten en soepel met elkaar te laten werken hebben we gebruik gemaakt van Docker Compose. Deze kan u terugvinden in de root van de GitHub repo.

## Postman
De tool Postman is gebruikt voor het testen van de verschillende endpoints. Hieronder kan u screenshots terugvinden van elke endpoint die uitgevoerd wordt in postman.
### GET teams
![postman screenshot](/documentation/getTeams.png)
### POST teams
![postman screenshot](/documentation/postTeams.png)
### PUT teams
![postman screenshot](/documentation/putTeams.png)
### GET drivers
![postman screenshot](/documentation/getDrivers.png)
### POST drivers
![postman screenshot](/documentation/postDrivers.png)
### PUT drivers
![postman screenshot](/documentation/putDrivers.png)
### DELETE drivers/{id}
![postman screenshot](/documentation/deleteDrivers.png)
### GET tracks
![postman screenshot](/documentation/getTracks.png)
### POST tracks
![postman screenshot](/documentation/postTracks.png)
### GET result
![postman screenshot](/documentation/getResults.png)
### GET result/{id}
![postman screenshot](/documentation/getResultsById.png)
### POST result
![postman screenshot](/documentation/postResults.png)

