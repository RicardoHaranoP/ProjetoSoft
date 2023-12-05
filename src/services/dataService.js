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
    getConsultas(){
        return api.get(`/consulta`);
    }

    getConsulta(codCons){
        return api.get(`/consulta/${codCons}`);
    }

    createConsulta(data){
        return api.post(`/consulta`, data);
    }

    updateConsulta(codCons,data){
        return api.put(`/consulta/${codCons}`, data);
    }

    deleteConsulta(codCons){
        return api.delete(`/consulta/${codCons}`);
    }

    //métodos axios relacionados à anamnese
    getAnamneses(){
        return api.get(`/anamnese`)
    }

    getAnamnese(codAnam){
        return api.get(`/anamnese/${codAnam}`);
    }

    createAnamnese(codPac,data){
        return api.post(`/anamnese/${codPac}`, data)
    }

    updateAnamnese(codAnam, data) {
        return api.put(`/anamnese/${codAnam}`, data)
    }

    deleteAnamnese(codAnam){
        return api.delete(`/anamnese/${codAnam}`)
    }


    //métodos axios relacionados ao odontograma
    createOdontograma( data){
        return api.post(`/odontograma`, data)
    }

    getOdontogramas(){
        return api.get('/odontograma')
    }

    getOdontograma(codOdon){
        return api.get(`/odontograma/${codOdon}`);
    }

    updateOdontograma(codOdon, data) {
        return api.put(`/odontograma/${codOdon}`, data)
    }

    
    deleteOdontograma(codOdon){
        return api.delete(`/odontograma/${codOdon}`)
    }

    //métodos axios relacionados ao procedimento
    createProcedimento(data){
        return api.post(`/procedimento`, data)
    }
    getProcedimentos() {
        return api.get(`/procedimento`);
    }

    deleteProcedimento(codProcedimento){
        return api.delete(`/procedimento/${codProcedimento}`)
    }
}

export default new DataService();