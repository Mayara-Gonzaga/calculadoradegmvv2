function openTab(tabId) {
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }
    
    document.getElementById(tabId).style.display = "block";
}

function toggleDaySelection(day) {
    day.classList.toggle("selected");
}

function calcularSoma() {
    var publicoEstimado = parseFloat(document.getElementById("publico-estimado").value) || 0;
    publicoEstimado *= 0.6;
    var selectedDays = document.querySelectorAll(".day-option input:checked");
    var selectedWeeks = parseInt(document.getElementById("semanas-select").value) || 0;
    var selectedMonths = parseInt(document.getElementById("meses-select").value) || 0;
    var ticketMedio = parseFloat(document.getElementById("ticket-medio").value.replace("R$ ", "").replace(/\./g, "").replace(",", ".")) || 0;

    var diasDaSemana = selectedDays.length;
    var totalSoma = publicoEstimado * diasDaSemana * ticketMedio;

    if (!isNaN(selectedWeeks) && selectedWeeks > 0) {
        totalSoma *= selectedWeeks;
    }

    if (!isNaN(selectedMonths) && selectedMonths > 0) {
        totalSoma *= selectedMonths;
    }

    document.getElementById("resultado-soma").textContent = "O GMV é:  " + formatarMoeda(totalSoma);

    if (totalSoma <= 150000) {
        document.getElementById("tipo-soma").textContent = "LT";
    } else if (totalSoma > 150000 && totalSoma < 1000000) {
        document.getElementById("tipo-soma").textContent = "MID";
    } else {
        document.getElementById("tipo-soma").textContent = "UP";
    }
}


function formatarMoeda(valor) {
    return "R$ " + valor.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

document.getElementById('btnLimpar').addEventListener('click', function() {
    document.getElementById('publico').value = '';
    document.getElementById('ticket').value = '';
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
    document.getElementById('result').style.display = 'none';
    document.getElementById('resultado').textContent = '';
});

// Função para calcular
document.getElementById('btnCalcular').addEventListener('click'), function() {
    const publico = document.getElementById('publico').value;
    const ticket = document.getElementById('ticket').value;
    const resultado = publico * ticket;
    document.getElementById('resultado').textContent = resultado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('result').style.display = 'block';

}

function limparCampos() {
    document.getElementById("publico-estimado").value = '';
    document.getElementById("ticket-medio").value = 'R$ ';
    document.getElementById("semanas-select").selectedIndex = 0;
    document.getElementById("meses-select").selectedIndex = 0;
    
    // Limpar checkboxes
    const checkboxes = document.querySelectorAll('#dias-semana input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
    
    // Limpar resultado
    document.getElementById("resultado-soma").innerText = '';
    document.getElementById("tipo-soma").innerText = '';
}