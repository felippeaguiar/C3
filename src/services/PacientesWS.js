import http from '../http-common';

class PacienteWS{

    getPacientes(){
        return http.get('/pacientes');
    }

    getPacienteID(id){
        return http.get(`/pacientes/${id}`);
    }

    criarPaciente(paciente){
        return http.post('/pacientes', paciente);
    }

    atualizarPaciente(id, paciente){
        return http.put(`/pacientes/${id}`, paciente);
    }

    deletarPacienteID(id){
        return http.delete(`/pacientes/${id}`);
    }

    deletarTodosPacientes(){
        return http.delete(`/pacientes`);
    }

}

export default new PacienteWS();