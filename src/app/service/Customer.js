import BaseService from '../../framework/service/BaseService'

class Customer extends BaseService {

	list() {
		return this.serviceConnector().callApi({ url: '/customers' });
	}

	retrieve(customerId) {
		return this.serviceConnector().callApi({ url: `/customers/${customerId}` });
	}

	create(customer) {
		return this.serviceConnector().invokeRequest({
			url: '/customers',
			method: 'POST',
			data: customer,
		});
	}

	update(customer) {
		return this.serviceConnector().invokeRequest({
			url: `/customers/${customer.entityId}`,
			method: 'PUT',
			data: customer,
		});
	}

	remove(customerId) {
		return this.serviceConnector().invokeRequest({
			url: `/customers/${customerId}`,
			method: 'DELETE',
		});
	}
}

export default new Customer();