$(document).ready(function () {

    document.getElementById('input-cep').addEventListener('keyup', function () {
        if(document.getElementById('input-cep').value === ''){
            $('.tabela-resultado').html(`<tr style='font-weight:bold;'><td>CONSULTE NO SISTEMA.</td><td></td><td></td><td></td><td></td></tr>`);
        }
    })

    document.getElementById('btn-limpa-input').addEventListener('click', function () {
        document.getElementById('input-cep').value = '';
        $('.tabela-resultado').html(`<tr style='font-weight:bold;'><td>CONSULTE NO SISTEMA.</td><td></td><td></td><td></td><td></td></tr>`);
    })

    document.getElementById('btn-consulta-input').addEventListener('click', function () {

        var cep = $('#input-cep').val();

        $.ajax({
            url: `https://viacep.com.br/ws/` + cep + `/json/`,
            method: `GET`,
            success: function (dados) {

                $('#input-cep').val('');

                $('.tabela-resultado').html('<tr><td id="text-logradouro">'+dados.logradouro+
                '</td><td id="text-bairro">'+dados.bairro+
                '</td><td id="text-localidade">'+dados.localidade+
                '</td><td id="text-uf">'+dados.uf+
                '</td><td id="text-"><button type="button" id="btn-salvar-registro" class="btn btn-success" onclick="salvarCep('+"'"+dados+"'"+')">SALVAR</button></td></tr>');

            },
            error: function (mensagem) {
                if (mensagem.readyState === 0 && mensagem.status === 0) {
                    $('.tabela-resultado').html(`<tr style='background-color:red; font-weight:bold;'><td>ERRO AO FILTRAR CEP.</td><td></td><td></td><td></td><td></td></tr>`);
                }
            }
        })

    })

})

