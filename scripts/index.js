const transactions = [
	{
		id: 1,
		description: 'Luz',
		amount: -50000,
		date: '24/01/2021'
	},
	{
		id: 2,
		description: 'Criação Website',
		amount: 500000,
		date: '24/01/2021'
	},
	{
		id: 3,
		description: 'Internet ',
		amount: -15000,
		date: '24/01/2021'
	},
]

const Modal = {
	open(modalOverlay) {
		document.querySelector('.modal-overlay').classList.add('active')
	},

	close(modalOverlay) {
		document.querySelector('.modal-overlay').classList.remove('active')
	}
}

const Transaction = {
	incomes() {
		// Somar as Entradas
	},

	expenses() {
		// Somar as Saídas
	},

	total() {
		// Calcular as Entradas - as Saídas
	},

	add() {
		// Adicionar transação
	},

	remove() {
		// Remover transação
	}
}

const DOM = {
	transactionsContainer: document.querySelector('#data-table tbody'),

	addTransaction(transaction, index) {
		const tr = document.createElement('tr')
		tr.innerHTML = DOM.innerHTMLTransaction(transaction)

		DOM.transactionsContainer.appendChild(tr)
	},

	innerHTMLTransaction(transaction) {
		const CSSClass = transaction.amount > 0 ? "income" : "expense"

		const amount = Utils.formateCurrency(transaction.amount)

		const HTML = `
			<td class="description">${transaction.description}</td>
			<td class=${CSSClass}>${amount}</td>
			<td class="date">${transaction.date}</td>
			<td>
				<img src="../assets/minus.svg" alt="Remover Transação" />
			</td>
		`

		return HTML
	},

	updateBalance() {
		const income = document.querySelector('.income p')
		const expense = document.querySelector('.expense p')
		const total = document.querySelector('.total p')
	}
}

const Utils = {
	formateCurrency(value) {
		const signal = Number(value) < 0 ? '- ' : ''

		value = String(value).replace(/\D/g, "")

		value = Number(value) / 100

		value = value.toLocaleString('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		})

		return signal + value
	}
}

transactions.forEach(transaction => DOM.addTransaction(transaction))