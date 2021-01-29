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
	all: transactions,

	incomes() {
		let income = 0

		transactions.forEach(transaction => {
			if(transaction.amount > 0) {
				income += transaction.amount
			}
		})
		return income
	},

	expenses() {
		let expense = 0

		transactions.forEach(transaction => {
			if(transaction.amount < 0) {
				expense += transaction.amount
			}
		})
		return expense
	},

	total() {
		return Transaction.expenses() + Transaction.incomes()
	},

	add(transaction) {
		Transaction.all.push(transaction)
	},

	remove(index) {
		Transaction.all.splice(index, 1)
		// Remover transação

		App.reload()
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
		document.querySelector('.income p').innerHTML = Utils.formateCurrency(Transaction.incomes())
		document.querySelector('.expense p').innerHTML = Utils.formateCurrency(Transaction.expenses())
		document.querySelector('.total p').innerHTML = Utils.formateCurrency(Transaction.total())
	},

	clearTransactions() {
		document.querySelector('#data-table tbody').innerHTML = ''
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

const App = {
	init() {
		DOM.updateBalance()

		transactions.forEach(transaction => DOM.addTransaction(transaction))
	},
	reload() {
		DOM.clearTransactions()
		App.init()
	},
}

App.init()