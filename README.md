# Problem(s) calling S/4 bound actions
As part of a business scenario, I need to call the bound action `ActvtMaintOrderOpPhaseControl` in an S/4 on-premise system using the API_MAINTENANCEORDER Service.

I reproduced this problem in this mini example. 

The problem is the following: 
1. I implemented the handler (in admin.js) as outlined in the documentation (https://cap.cloud.sap/docs/guides/services/custom-actions#calling-actions-functions on 2026-06-10)
2. When I call the action for a combination of order, operation and phase control code like this: 
    ```http
    POST {{server}}{{service}}/S4OpPhaseControl(MaintenanceOrder='4002903',MaintenanceOrderOperation='0010',MaintenanceOrderSubOperation='',MaintenancePhaseControl='NOSC')/ActvtMaintOrderOpPhaseControl
    Content-Type: application/json

    {}
    ```
    I receive an error. 
3. When turning on debugging on 'remote' CAP component, I see that the url it is trying to call is the following: 
    ```json
    {
        "request": {
        "method": "POST",
        "url": "/sap/opu/odata/sap/API_MAINTENANCEORDER/ActvtMaintOrderOpPhaseControl?MaintenanceOrder='4002903'&MaintenanceOrderOperation='0010'&MaintenanceOrderSubOperation=''&MaintenancePhaseControl='NOSC'",
        "headers": [Object]
        }
    }
    ```
4. The URL seems to be correct (see [sap-native.http](./test/http/sap-native.http)), but there is still a `CSRF token validation failed` error coming back when I run my CAP based request that I cannot reproduce in my .http example.

5. To make sure this problem is not just tracing back to the new native fetch functionality, I installed `@sap-cloud-sdk/http-client` and changed native_fetch to false in my .cdsrc-private.json. 



## To reproduce
1. Clone the repo
2. run `npm i`
3. Create `.cdsrc-private.json` and replace the values in []
### Content of '.cdsrc-private.json'
```json
{
    "cds": {
        "remote":{"native_fetch":true},
        "requires": {
            "[development]": {
                "API_MAINTENANCEORDER": {
                    "kind": "odata-v2",
                    "model": "srv/external/API_MAINTENANCEORDER",
                    "credentials": {
                        "url": "[your url]",
                        "path": "/sap/opu/odata/sap/API_MAINTENANCEORDER",
                        "username": "[your user]",
                        "password": "[your password]"
                    }
                }
            }
        }
    }
}
```
4. Create `.env` and replace the values in []
```env
S4_HOST=[S4server]
S4_USER=[S4user]
S4_PASSWORD=[S4password]
```
# Versions used
| Package            | Version | Location                                  |
 | ------------------ | ------- | ----------------------------------------- |
 | @sap/cds           | 9.9.1   | ./node_modules/@sap/cds                   |
 | @sap/cds-compiler  | 6.9.2   | ./node_modules/@sap/cds-compiler          |
 | @sap/cds-fiori     | 2.3.0   | ./node_modules/@sap/cds-fiori             |
 | @cap-js/db-service | 2.11.0  | ./node_modules/@cap-js/db-service         |
 | @cap-js/sqlite     | 2.4.0   | ./node_modules/@cap-js/sqlite             |
 | cds.home           |         | ./node_modules/@sap/cds                   |
 | cds.root           |         | ~/dev/MartinStenzig/cds-bug-13            |
 | npm root -l        |         | ./node_modules                            |
 | npm root -g        |         | /opt/homebrew/lib/node_modules            |
 | Node.js            | 26.0.0  | /opt/homebrew/Cellar/node/26.0.0/bin/node |