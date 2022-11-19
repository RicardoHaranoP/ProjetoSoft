import api from "./api.js";

class DataService{

    getPacientes(nome) {
        return api.get(`/paciente`);
    }

    getPaciente(codPac){
        return api.get(`/paciente/${codPac}`);
    }
    
    createPaciente(data){
        return api.post("/paciente", data);
    }
}

export default new DataService();