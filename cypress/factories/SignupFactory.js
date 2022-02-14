//Criando um módulo que através do método 'deliver' será responsável por toda a massa de dados utilizada durante os testes.

//A biblioteca 'faker' serve para criar dados dinâmicos para serem usados nos testes;
var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliver : function(){

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: "11999999999",
            address: {
                cep: "04534011",
                street: "Rua Joaquim Floriano",
                number: "1000",
                details: "apt 142",
                district: "Itaim Bibi",
                city_state: "São Paulo/SP"
            },
            delivery_method: "Moto",
            cnh: "cnh-digital.jpg"
        }

        return data
    }
}