module.exports = function(app) {
  app.get('/pagamentos', function(req, res) {
    console.log('recebida requisição do teste');
    res.send('OK.');
  });

  app.post('/pagamentos/pagamento', function(req, res) {

    req.assert("forma_de_pagamento", "Forma de pagamento é obrigatória").notEmpty();
    req.assert("valor", "Valor é obrigatório e deve ser decimal").notEmpty().isFloat();

    var erros = req.validationErrors();

    if(erros){
      console.log('Erros de validação encontrados');
      res.status(400).send(erros);
      return;

    }

    var pagamento = req.body;
    console.log('processando uma requisição de um novo pagamento');
    pagamento.status = 'CRIADO';
    pagamento.data = new Date;

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.salva(pagamento, function(erro, resultado) {
      if (erro) {
        console.log('Erro ao inserir no banco  '+ erro );
        res.status(400).send(erro);
      }else{
        console.log('pagamnto criado');
        res.json(pagamento);
      }
    });


  });
};
