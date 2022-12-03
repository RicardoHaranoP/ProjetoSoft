import api from "./api.js";

class DataService{


    //métodos axios relacionados ao paciente
    getPacientes() {
        return api.get(`/paciente`);
    }

    getPaciente(codPac){
        return api.get(`/paciente/${codPac}`);
    }
    
    createPaciente(data){
        return api.post(`/paciente`, data);
    }

    updatePaciente(codPac,data){
        return api.put(`/paciente/${codPac}`, data);
    }

    deletePaciente(codPac){
        return api.delete(`/paciente/${codPac}`);
    }


    //métodos axios relacionados ao dentista
    getDentistas(){
        return api.get(`/dentista`);
    }

    getDentista(codDent){
        return api.get(`/dentista/${codDent}`);
    }

    createDentista(data){
        return api.post(`/dentista`, data);
    }

    updateDentista(codDent,data){
        return api.put(`/dentista/${codDent}`, data);
    }

    deleteDentista(codDent){
        return api.delete(`/dentista/${codDent}`);
    }


    //métodos axios relacionados à consulta
    createConsulta(data){
        return api.post(`/consulta`, data);
    }

    updateConsulta(codCons,data){
        return api.put(`/consulta/${codCons}`, data);
    }
}

export default new DataService();