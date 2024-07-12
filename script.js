//array para guardar as atividades registradas
let atividades = []

const formatador = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),
            semana: {
                curto: dayjs(data).format('ddd'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }
}

const criarAtividade = (atividade) => {
    const formatar = formatador(atividade.data)
    let input = `<input
    onchange="concluirAtividade(event)"
    value="${atividade.data}"
    type="checkbox" `

    if(atividade.finalizada){
        input += 'checked'
    }
    input += '>'

    return `
    <div>
    ${input}
    <span>${atividade.nome}</span>
    <time>${formatar.dia.semana.longo},
    dia ${formatar.dia.numerico}  de
    ${formatar.mes} às ${formatar.hora}
    </time>
    </div>
    `
}

const atualizarAtividades = () => {
    const section = document.querySelector("section");
    section.innerHTML = ''

    //checar se a lista tá vazia
    if (atividades.length == 0){
        section.innerHTML = '<p> Nenhuma atividade cadastrada </p>'
        return
    }
    for(let atividade of atividades){
        //concatena no html as atividades registradas
        section.innerHTML += criarAtividade(atividade)
    }
}

const salvarAtividade = (event) => {
    event.preventDefault()
    const dados = new FormData(event.target)
    const nome = dados.get('atividade')
    const dia = dados.get('dia')
    const hora = dados.get('hora')
    const data = `${dia} ${hora}`

    const atividade = {
        nome,
        data,
        finalizada: false
    }
    //n pode add duas atvs no mesmo horário
    const atividadeExiste = atividades.find((atv) => {
        return atv.data == atividade.data
    })

    if(atividadeExiste){
        return alert('Dia/Hora não disponível')
    }

    atividades = [atividade, ...atividades]
    atualizarAtividades()
}

const concluirAtividade = (event) => {
    //precisamos salvar a ação de concluir a atividade (checar)
    const dataInput = event.target.value

    const atividade = atividades.find((atividade)=>{
        return dataInput == atividade.data
    })
    //se a atividade n existe
    if(!atividade){
        return
    }
    atividade.finalizada = !atividade.finalizada
}

const criarDiasSelecao = () => {
    const dias = [
        "2024-12-24",
        "2024-12-25",
        "2024-12-26",
        "2024-12-27",
        "2024-12-28",
        "2024-12-29",
        "2024-12-30",
        "2024-12-31",
    ]
    let diasSelecao = ''

    for (let dia of dias){
        const formatar = formatador(dia)
        const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes}`

        diasSelecao += `
        <option value=${dia}>${diaFormatado}</option>
        `
    }

    document.
    querySelector('select[name="dia"]')
    .innerHTML = diasSelecao
}

const criarHorasSelecao = () => {
    let horasDisponiveis = ''

    for(let i = 6; i < 23; i++){
        const hora = String(i).padStart(2, '0')
        horasDisponiveis += `<option value="${i}:00">${i}:00</option>`
        horasDisponiveis += `<option value="${i}:30">${i}:30</option>`
    }
    document.
    querySelector('select[name="hora"]')
    .innerHTML = horasDisponiveis
}

criarHorasSelecao()
criarDiasSelecao()
atualizarAtividades()