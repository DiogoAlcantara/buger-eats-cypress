//importando os métodos responsáveis pelos testes;
import signupPage from '../pages/SignupPage';
//importando o módulo que contém a massa de dados;
import signupFactory from '../factories/SignupFactory';


describe('Signup', () => {

    it('User should be deliver', function () {

        //criando uma váriavel para armazenar o método 'deliver' que foi importado de 'SignupFactory';
        var deliver = signupFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage);

    });

    it('Incorrect document', function () {

        var deliver = signupFactory.deliver()

        //Alterando somente o valor do 'CPF  para realizar o teste;
        deliver.cpf = "123456789aA"

        signupPage.go();
        signupPage.fillForm(deliver);
        signupPage.submit();
        signupPage.alertMessageShouldBe('Oops! CPF inválido');
    });

    it('Incorrect email', function () {

        //Alterando somente o valor 'email' para realizar o teste;
        var deliver = signupFactory.deliver()
        deliver.email = "teste.teste12.com.br"

        signupPage.go();
        signupPage.fillForm(deliver);
        signupPage.submit();
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.');
    });

    context('Required Fields', function () {

        //A constante 'messages' recebe um array que por sua vez recebe um 'objeto' com o 'field'(campo a ser validado) e 'output'(a mensagem esperada);
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'deliver_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' },
        ]

        //Define algo que será executado antes dos casos de testes;
        before(function () {
            signupPage.go();
            signupPage.submit();
        });

        //Chamando a constante 'messages' que é um array, após isso utilizamos o forEach para percorrer pela lista de mensagens, depois criamos uma função que recebe uma 'msg' como parâmetro e dentro dessa função criamos um loop que irá receber nosso caso de teste dinâmico.
        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                signupPage.alertMessageShouldBe(msg.output);
            })
        })
    });





    /* it.only('Required Fields', function () {
        signupPage.go();
        signupPage.submit();
        signupPage.alertMessageShouldBe('É necessário informar o nome');
        signupPage.alertMessageShouldBe('É necessário informar o CPF');
        signupPage.alertMessageShouldBe('É necessário informar o email');
        signupPage.alertMessageShouldBe('É necessário informar o CEP');
        signupPage.alertMessageShouldBe('É necessário informar o número do endereço');
        signupPage.alertMessageShouldBe('Selecione o método de entrega');
        signupPage.alertMessageShouldBe('Adicione uma foto da sua CNH');
    }); */
});