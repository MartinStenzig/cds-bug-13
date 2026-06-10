import cds from '@sap/cds';

const LOG = cds.log('admin');

export default class AdminService extends cds.ApplicationService {

    async init() {

        // Reference to S4 Maintenance Order entity
        const { S4MaintenanceOrder, S4OpPhaseControl } = this.entities;

        // Connection to the SAP Maintenance Order service
        const sapMaintenanceOrderConnection = await cds.connect.to('API_MAINTENANCEORDER');
        const {MaintOrderOpPhaseControl} = sapMaintenanceOrderConnection.entities;

        /** 
         * Event Handler for all S/4 Maintenance Order related requests
         */
        this.on('*', S4MaintenanceOrder, async (req) => {
            return sapMaintenanceOrderConnection.run(req.query);
        });

        this.on('ActvtMaintOrderOpPhaseControl', S4OpPhaseControl, async (req) => {
            
            // Based on documentation at https://cap.cloud.sap/docs/guides/services/custom-actions#calling-actions-functions on 2026-06-10
            return sapMaintenanceOrderConnection.send({event:'ActvtMaintOrderOpPhaseControl',entity:'MaintOrderOpPhaseControl', params: req.params})
        });

        return super.init(...arguments);
    }

}