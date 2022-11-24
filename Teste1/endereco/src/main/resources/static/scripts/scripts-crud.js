function salvarCep() {

    var cep = new Object();

    cep.logradouro = $("#text-logradouro").text();
    cep.bairro = $("#text-bairro").text();
    cep.localidade = $("#text-localidade").text();
    cep.uf = $("#text-uf").text();

    $.ajax({
        url: '/cep/salvar',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(cep),
        success: function (mensagem) {
            $('.tabela-resultado').html(`<tr style='font-weight:bold;'><td>CONSULTE NO SISTEMA.</td><td></td><td></td><td></td><td></td></tr>`);
            buscarInformacoes();
            alert(mensagem);
        },
        error: function (mensagem) {
            alert('Erro ao salvar cep.');
        }
    })

}

function buscarInformacoes() {

    $.ajax({
        url: '/cep/buscar',
        type: 'GET',
        success: function (dados) {

            var linhaTabela = '';

            if (dados === "vazio") {

                linhaTabela = '<tr style="font-weight:bold;"><td>Sem registros salvo na base.</td><td></td><td></td><td></td></tr>';

            } else {

                var cep = JSON.parse(dados);


                cep = cep.sort(function (a, b) {

                    if ($("#flexRadioOrdemCrescente").is(":checked") == true && $("#flexRadioCidade").is(":checked") == true) {
                        return a.localidade < b.localidade ? -1 : 0;
                    }

                    if ($("#flexRadioOrdemDecrescente").is(":checked") == true && $("#flexRadioCidade").is(":checked") == true) {
                        return a.localidade > b.localidade ? -1 : 0;
                    }

                    if ($("#flexRadioOrdemCrescente").is(":checked") == true && $("#flexRadioBairro").is(":checked") == true) {
                        return a.bairro < b.bairro ? -1 : 0;
                    }

                    if ($("#flexRadioOrdemDecrescente").is(":checked") == true && $("#flexRadioBairro").is(":checked") == true) {
                        return a.bairro > b.bairro ? -1 : 0;
                    }

                    if ($("#flexRadioOrdemCrescente").is(":checked") == true && $("#flexRadioEstado").is(":checked") == true) {
                        return a.uf < b.uf ? -1 : 0;
                    }

                    if ($("#flexRadioOrdemDecrescente").is(":checked") == true && $("#flexRadioEstado").is(":checked") == true) {
                        return a.uf > b.uf ? -1 : 0;
                    }
                })


                for (let i = 0; i < cep.length; i++) {

                    linhaTabela += '<tr class="id-cep"><td class="cep-logradouro">' + cep[i].logradouro + '</td><td class="cep-bairro">' + cep[i].bairro + '</td><td class="cep-localidade">' + cep[i].localidade + '</td><td class="cep-uf">' + cep[i].uf + '</td></tr>'

                }

            }

            $('.tabela-consulta').html(linhaTabela);

        },
        error: function (mensagem) {
            alert('Erro ao carregar lista de ceps.');
        }
    })
}

buscarInformacoes()

