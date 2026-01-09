$(document).ready(function() {
    $('#add-btn').click(function() {
        $.ajax({
            url: '/add',
            type: 'POST',
            success: function(response) {
                $('#num').text(response.num);  // Atualiza o número no span
            },
            error: function() {
                alert('Erro ao atualizar número.');
            }
        });
    });
});