//O modelo Pages Object permite a escalabilidade do projeto e também melhora a manutenção do mesmo, pois permite a reutilização de métodos e comportamentos.

class SignupPage{

    go(){
         //Função reponsável por acessar a página que será testada;
        cy.visit('/');
 
         //Função get para pegar um seletor CSS, e subfunção click para interagir com esse elemento;
         cy.get('a[href="/deliver"]').click();
         //validando se fomos direcionados a página correta, através de uma válidação utlizando a função should para confirmar o texto do elemento H1 da página;
         cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas');
    }

    //Função que preenche o formulário, recebe como parâmetro a massa de dados (objeto) deliver.
    fillForm(deliver){
        //Utilizando o get para pegar o elemento desejado através de seletor CSS, depois usando o type que é uma subfunção para escrever algo no campo desejado;
        cy.get('input[name="fullName"]').type(deliver.name);
        cy.get('input[name="cpf"]').type(deliver.cpf);
        cy.get('input[name="email"]').type(deliver.email);
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp);
        cy.get('input[name="postalcode"]').type(deliver.address.cep);
        cy.get('input[type="button"][value="Buscar CEP"]').click();
        cy.get('input[name="address-number"]').type(deliver.address.number);
        cy.get('input[name="address-details"]').type(deliver.address.details);

        //Validando se os campos 'rua', 'bairro' e 'cidade', batem com o que foi informado na massa de dados;
        cy.get('input[name="address"]').should('have.value', deliver.address.street);
        cy.get('input[name="district"]').should('have.value', deliver.address.district);
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state);

        //Utiliza a função 'contains', que serve para juntar um seletor CSS com um texto, depois disso passa como parâmetro o método de entrega que foi definido na masssa de dados, no caso 'Moto';
        cy.contains('.delivery-method li', deliver.delivery_method).click();

        //Inserindo o upload da CNH
        cy.get('input[type="file"]').selectFile('cypress/fixtures/images/' + deliver.cnh, {force: true});
    }

    submit(){

        //Clicando no botão para validar o cadastro
        cy.get('form button[type="submit"]').click();

    }

    //Valida a submissão do formulário, recebe como parametro uma mensagem que será comparada, com o que for exibido no modal.
    modalContentShouldBe(expectedMessage){
        cy.get('div[class="swal2-html-container"]').should('have.text', expectedMessage);
    }

    alertMessageShouldBe(expectedMessage){
        //A função 'get' só pega um elemento por vez;
        //cy.get('.alert-error').should('have.text', expectedMessage);
        
        //Já a função 'contains' consegue pegar diversos elementos por vez, para fazer a verificação;
        cy.contains('.alert-error', expectedMessage).should('be.visible');
    }
}

//Exportando a página, para que depois possamos importa-lá na camada de testes.
export default new SignupPage;