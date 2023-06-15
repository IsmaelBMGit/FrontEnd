import axios from './Axios'

export const user = {
  currentUser: () => axios.get('/api/currentUser'),
  getUserById: (idUser) => axios.get(`/api/user/${idUser}`),
  editUser : (fullName, phone) => axios.put('/api/user/update', {fullName, phone}),
  editPassword: (oldPassword, newPassword, verifyPassword) => axios.put('/user/changePassword', {oldPassword, newPassword, verifyPassword}),
  signIn: (email, password) => axios.post('/auth/signIn',{email, password}),
  registerParticular: (fullName, numIdentity, phone, email, password, verifyPassword) => axios.post('/auth/register/particular', {fullName, numIdentity, phone, email, password, verifyPassword}),
  registerCompany: (fullName, numIdentity, phone, email, password, verifyPassword) => axios.post('/auth/register/company', {fullName, numIdentity, phone, email, password, verifyPassword}),
  getAllCompanies: () => axios.get('/api/company/all'),
  getAllParticulars: () => axios.get('/api/particular/all'),
  getAllProvinces: () => axios.get('/api/province/all'),
  getMunicipesByProvince: (idProvince) => axios.get(`/api/provinces/${idProvince}`),
  getEventsByCompany: (idCompany) => axios.get(`/api/event/${idCompany}`),
  getAllEvents: () => axios.get('/api/all/events'),
  createNewEvent: (name, address, imageUrl, date, price, idMunicipe) => axios.post('/api/event/create', {name, address, imageUrl, date, price, idMunicipe}),
  editEvent : (id, address, imageUrl, date, price) => axios.put(`/api/event/update/${id}`, {address, imageUrl, date, price}),
  disableAccount: (idUser) => axios.put(`/api/disabled/user/${idUser}`),
  enableAccount: (idUser) => axios.put(`/api/enabled/user/${idUser}`),
  disabledEvent: (id) => axios.put(`/api/disabled/event/${id}`),
  enabledEvent: (id) => axios.put(`/api/enabled/event/${id}`),
  buyTicket: (imageUrl, date, price, bankNumber, idEvent) => axios.post(`/api/ticket/buy?eventId=${idEvent}`, {imageUrl, date, price, bankNumber}),
  getTicketsToUser: () => axios.get('/api/tickets'),
  ticketsFromUserId: (idUser) => axios.get(`/api/tickets/${idUser}`),
  getTicketById: (nTicket) => axios.get(`/api/ticket/${nTicket}`),
  getSoldTickets: (idEvent) => axios.get(`/api/tickets/sold/${idEvent}`),
  getBuyTickets: (idUser) => axios.get(`/api/tickets/buy/${idUser}`)
}
