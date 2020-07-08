<template>
    <div v-if="currentPaciente" class="edit-form">
        <h4>Paciente</h4>
        <form>
            <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" class="form-control" id="nome" v-model="currentPaciente.nome">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="currentPaciente.email">
            </div>
            <div class="form-group">
                <label for="data_internacao">Data da Internação</label>
                <input type="date" class="form-control" id="data_internacao" v-model="currentPaciente.data_internacao">
            </div>
        </form>
        <button class="badge badge-danger mr-2" @click="deletarPaciente">Deletar Paciente</button>
        <button type="submit" class="badge badge-success mr-2" @click="atualizarPaciente">Atualizar Paciente</button>
        <p>
            {{ message }}
        </p>
    </div>
    <div v-else>
        <p>
            Por favor, selecione um paciente!!!
        </p>
    </div>
</template>

<script>

    import PacienteWS from "../services/PacientesWS";

    export default {
        name: "paciente",
        data(){
            return {
                currentPaciente: null,
                message: ''
            }
        }, 
        methods: {
            getPaciente(id){
                PacienteWS.getPacienteID(id)
                    .then(paciente => {
                        this.currentPaciente = paciente.data;
                        let data = this.currentPaciente.data_internacao;
                        data = this.currentPaciente.data_internacao.split('T')[0];
                        console.log(data);
                        this.currentPaciente.data_internacao = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            deletarPaciente(){
                PacienteWS.deletarPacienteID(this.currentPaciente.id)
                    .then(response => {
                        console.log(response.data);
                        this.message = 'O paciente foi deletado com sucesso!'
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            },
            atualizarPaciente(){
                PacienteWS.atualizarPaciente(this.currentPaciente.id, this.currentPaciente)
                    .then(response => {
                        console.log(response.data);
                        this.message = "Paciente atualizado com sucesso!"
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            }
        },
        beforeMount(){
            this.message = '',
            this.getPaciente(this.$route.params.id);
        }
    }
</script>

<style>

</style>