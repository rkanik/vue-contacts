import Api from '../../api'
import { toFormData } from '../../helpers'
import { handle, createMutations } from '../helpers'

const initalState = () => ({
	contactId: null,
	contacts: []
})

const state = initalState()
const mutations = createMutations('SET', 'PUSH', 'MERGE', 'UPDATE', 'DELETE', 'RESET')

const getters = {
	$contacts: state => state.contacts,
	$contact: state => state.contacts.find(
		contact => contact.id === state.contactId
	),
}

const actions = {
	fetchContacts: ({ commit }, payload) => handle(
		Api.Me.Contacts.fetchAll, payload, res => {
			commit('SET', { contacts: res.contacts.data })
		}
	),
	importContacts: ({ commit }, { data, queries }) => {
		return handle(
			Api.Me.Contacts.import, toFormData(data), queries, res => {
				commit('SET', { contacts: res.contacts.data })
			}
		)
	},
	fetchContact: ({ commit, state: { contacts } }, payload) => {
		const contact = contacts.find(c => c.id === payload)
		if (contact) {
			commit('SET', { contactId: payload })
			return contact
		}
		return handle(Api.Me.Contacts.fetch, payload, res => {
			commit('MERGE', ['contacts', res.contact])
		})
	},
	updateContact: ({ commit }, payload) => handle(
		Api.Me.Contacts.update, payload, res => {
			commit('UPDATE', ['contacts', res.contact])
		}
	),
	deleteContact: ({ commit }, payload) => handle(
		Api.Me.Contacts.delete, payload, () => {
			commit('DELETE', ['contacts', payload])
		}
	),
	setContact: ({ commit, state: { contactId } }, payload) => {
		contactId !== payload && commit('SET', { contactId: payload })
	},
	saveContact: ({ commit }, payload) => handle(
		Api.Me.Contacts.save, payload, res => {
			commit('PUSH', ['contacts', res.contact])
		}
	)
}

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true,
}
