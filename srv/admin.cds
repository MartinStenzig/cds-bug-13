using {API_MAINTENANCEORDER as s4order} from './external/API_MAINTENANCEORDER';

service AdminService {

    entity S4MaintenanceOrder as projection on s4order.MaintenanceOrder;
    entity S4OpPhaseControl as projection on s4order.MaintOrderOpPhaseControl actions {
        action ActvtMaintOrderOpPhaseControl() returns Boolean;
        action DactvtMaintOrderOpPhaseControl() returns Boolean;
    };

}