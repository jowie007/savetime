<p align="center">
   <img width="400" src="https://user-images.githubusercontent.com/90611576/214872753-5838b385-bb20-447e-baf6-2f6e6d414ce8.svg">
</p>

# Savetime-Tool in einem Beispielprojekt
Das Savetime-Tool wurde im Rahmen einer Masterarbeit entwickelt und diente dazu festzustellen, inwiefern die Laufzeit von Cypresstests Rückschlüsse auf Codequalität liefert. Vorab sei gesagt, dass die Testlaufzeiten bereits auf dem gleichen Gerät unter ähnlichen Bedingungen Schwankungen aufweisen, ohne dass der Code geändert wurde, weswegen ein Vergleich nur anhand von Cypress-Tests schwierig ist. Im Optimalfall wäre das Tool zum Einsatz gekommen, um die Codequalität bezüglich der Laufzeit im gesamten Entwicklungsprozess beobachten zu können.

Für dieses Projekt wurde eine einfache Vue-Applikation aufgesetzt, sodass folgende Hinweise für das Aufsetzen der Applikation beachtet werden sollten:
1. Empfohlenes Umgebung:
    * [Visual Studio Code](https://code.visualstudio.com/) mit der folgenden Extension:
        + [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) muss installiert sein

## Aufsetzen des Projekts
Um das Projekt aufzusetzen muss dies entweder heruntergeladen und extrahiert werden, wobei die Empfehlung ist [git](https://git-scm.com/) zu nutzen.
```sh
cd \Ordner\in\welchem\das\Projekt\installiert\werden\soll
git clone https://github.com/jowie007/savetime.git
```
Anschließend muss die Applikation installiert werden.
```sh
npm install
```

## Start des Projekts
Um die Beispielapplikation laufen zu lassen muss der nachfolgende Befehl ausgeführt werden, welcher die Applikation auf Port 4173 ausführt.
```sh
npm run dev
```
Die Beispielapplikation stellt dabei nur eine Umgebung dar, anhand welcher das Savetime-Tool ausprobiert werden kann. Somit sind insbesonders die Befehle zum Ausführen der Tests relevant. Dabei können die Tests mit build oder ohne durchgeführt werden. Werden viele Tests durchgeführt, so ist es sinnvoll zuerst einen build zu erstellen und anschließend die Tests ohne build laufen zu lassen.
```sh
// Tests mit build
npm run test:e2e
// Build und anschließend Tests ohne build
npm run build
npm run test:e2e:withoutBuild
```     
Da in der Applikation besonders e2e-Test vorliegen, sollen die anderen Kommandos zunächst außer acht gelassen werden.

Nachdem die Tests furchgeführt wurden, werden die Log-Dateien in dem Ordner cypress\support\savetime\results\e2e gespeichert und können ausgewertet werden. Zum Auswerten muss kann der Befehl ausgeführt werden, welcher das Savetime-Tool startet.
```sh
npm run savetime:report
```

## Savetime-Tool
<img align="right" width="400" src="https://user-images.githubusercontent.com/90611576/214844202-8f9d47d6-7915-416a-8e8b-0dbfcfa0d5a4.png">
Innerhalb des Tools können anschließend zwei Testläufe mittels Datepicker ausgewählt werden. Die Tage sind dabei mit verschiedenen Abstufungen der Farbe lila hinterlegt, wobei der Hintergrund dunkler wird, je mehr Testläufe an einem Tag durchgeführt werden. In dem gezeigten Beispiel sind zwei Testläufe ausgewählt, welche an dem 12.05.2022 durchgeführt wurden, wobei der Datepicker für den zweiten Testlauf geöffnet ist. 

Die Legende gibt Auskunft darüber, wie die Laufzeitdifferenzen farblich hinterlegt werden.

Die Allgemeinen Infos dienen zur Orientierung, wobei sich hinter dem Tooltip eine These zu der Spanne befindet. Die sich dahinter befindende These
> Sind die minimalen und maximalen Differenzen verhältnismäßig hoch oder niedrig, die Spanne hingegen recht gering, dann kann dies ein Indiz dafür sein, dass die Tests entweder auf unterschiedlichen Geräten durchlaufen wurden oder die gesamte Applikation durch verschiedene Faktoren verlangsamt wird

wurde jedoch wiederlegt.

Anschließend werden die Informationen zu den einzelenen Laufzeitdifferenzen aufgelistet, einzelene Tests, welche fehlerhaft sind, neu hinzugekommen sind oder entfernt wurden, werden nicht angezeigt, da diese keine aussagekräftigen Ergebniss liefern.

Mittels Zahradicon in der Ecke können die Einstellungen geöffnet werden. Die maximale Laufzeitdifferenz dient insbesondere der farblichen Hinterlegung und der Filterung, falls nur Tests angezeigt werden, dessen Laufzeit die gesetzte Grenze überschreitet. Zudem kann die Ansicht auf prozentuale Werte geändert werden, da diese gegebenfalls aussagekräftiger sind. Das Feature zum Vergleich von Spannen kann sich unberechenbar verhalten und wurde vor allem genutzt um die Evalutaion durchzuführen.

## Savetime-Tool in einem anderen Projekt verwenden
Zunächst sei erneut darauf hingewiesen, dass die Vergleiche von den Cypress-Testläufen <ins>keine</ins> aussagekräftigen Ergebnisse liefern. Sollte das Tool jedoch trotzdem in eine eigene Applikation eingebunden werden, so sollten folgende Schritte befolgt werden:
1. Installation von [Cypress](https://www.cypress.io/)
```sh
npm install cypress --save-dev
```
2. Installation von [Electron](https://www.electronjs.org/)
```sh
npm install electron --save-dev
```
3. Kopieren des Ordners cypress\support\savetime in das eigene Projekt
4. Editieren/Hinzufügen des Cypress-Events [After Run](https://docs.cypress.io/api/plugins/after-run-api)
```typescript
import {
  createCypressLog,
} from './cypress/support/savetime/src/services/handler/cypress-file-handler'
...

export default defineConfig({
    e2e: {
        setupNodeEvents(on) {
          on('after:run', (results) => {
            createCypressLog('e2e', results)
            return null
          })
        },
        ...
    },
    component: {
        setupNodeEvents(on) {
          on('after:run', (results) => {
            createCypressLog('component', results)
            return null
          })
        },
        ...
    },
    ...
})
  
```
5. Hinzufügen des scripts in der package.json
```typescript
"savetime:report": "cd ./cypress/support/savetime && electron ./dist/main.js"
```
6. Editieren der tsconfig-Datei
```json
{
  "exclude": [
    "cypress/support/savetime/src/services/handler/cypress-file-handler.ts",
  ]
}
```
7. Leeren der Ordner welche sich in cypress\support\savetime\results befinden

Anschließend kann das Tool wie bereits zuvor beschrieben genutzt werden. Dabei ist zu beachtet, dass für e2e-Tests die Applikation zusätzlich laufen muss.
