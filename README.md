# Problem(s) calling S/4 bound actions
As part of a business scenario, I need to call the bound action `ActvtMaintOrderOpPhaseControl` in an S/4 on-premise system using the API_MAINTENANCEORDER Service.

I reproduced this problem in this mini example. 

The problem is the following: 
1. I implemented the handler (in admin.js) as outlined in the documentation (https://cap.cloud.sap/docs/guides/services/custom-actions#calling-actions-functions on 2026-06-10)
2. When I call the action for a combination of order, operation and phase control code like this: 
    ```http
    POST {{server}}{{service}}/S4OpPhaseControl(MaintenanceOrder='4002903',MaintenanceOrderOperation='0020',MaintenanceOrderSubOperation='',MaintenancePhaseControl='NOSC')/ActvtMaintOrderOpPhaseControl
    Content-Type: application/json

    {}
    ```
    I receive an error. 
3. When turning on debugging on 'remote' CAP component, I see that the url it is trying to call is the following: 
    ```json
    {
        "request": {
        "method": "POST",
        "url": "/sap/opu/odata/sap/API_MAINTENANCEORDER/ActvtMaintOrderOpPhaseControl?MaintenanceOrder='4002903'&MaintenanceOrderOperation='0020'&MaintenanceOrderSubOperation=''&MaintenancePhaseControl='NOSC'",
        "headers": [Object]
        }
    }
    ```
4. The url called in S/4 should look like the following instead: `/sap/opu/odata/sap/API_MAINTENANCEORDER/MaintOrderOpPhaseControl(MaintenanceOrder='4002903',MaintenanceOrderOperation='0020',MaintenanceOrderSubOperation='',MaintenancePhaseControl='NOSC')/ActvtMaintOrderOpPhaseControl`

## To reproduce
1. Clone the repo
2. Create `.cdsrc-private.json` and replace the values in []
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