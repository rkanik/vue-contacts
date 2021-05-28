import Api from '../../api'
import { toFormData } from '../../helpers'
import { handle, createMutations } from '../helpers'

const initalState = () => ({
	contactId: null,
	contacts: [],
	trashed: []
})

const state = initalState()
const mutations = createMutations('SET', 'PUSH', 'MERGE', 'UPDATE', 'DELETE', 'RESET')

const getters = {
	$contacts: state => state.contacts,
	$trashed: state => state.trashed,
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
	fetchTrashedContacts: ({ commit }, payload) => handle(
		Api.Me.Contacts.fetchTrashed, payload, res => {
			commit('SET', { trashed: res.contacts.data })
		}
	),
	importContacts: ({ commit }, data) => {
		return handle(
			Api.Me.Contacts.import, toFormData(data), res => {
				commit('SET', { contacts: res.contacts.data })
			}
		)
	},
	moveContactsToTrash: ({ commit, dispatch }, payload) => {
		return handle(
			Api.Me.Contacts.trash, payload, async (res) => {
				console.log('moveContactsToTrash', res)
				await dispatch('fetchTrashedContacts')
				commit('DELETE', ['contacts', payload])
			}
		)
	},
	restoreContactsFromTrash: ({ commit, dispatch }, payload) => {
		return handle(
			Api.Me.Contacts.restore, payload, async (res) => {
				console.log('restoreContactsFromTrash', res)
				await dispatch('fetchContacts')
				commit('DELETE', ['trashed', payload])
			}
		)
	},
	deleteContacts: ({ commit }, payload) => {
		return handle(
			Api.Me.Contacts.delete, payload, async () => {
				commit('DELETE', ['trashed', payload])
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
