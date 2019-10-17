// const remoteURL = "http://localhost:5002"
const remoteURL = "https://floating-ridge-12046.herokuapp.com"

export default {
    get(id) {
        return fetch(`${remoteURL}/userEvents/${id}`).then(result => result.json())
      },
      getAll() {
        return fetch(`${remoteURL}/userEvents?_expand=user`).then(result => result.json())
      },
      delete(id) {
      return fetch(`${remoteURL}/userEvents/${id}`, {
            method: "DELETE"
        })
        .then(result => result.json())
      },
      post(newUserEvent) {
        return fetch(`${remoteURL}/userEvents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserEvent)
        }).then(data => data.json())
    },
    update(editedUserEvent) {
      return fetch(`${remoteURL}/userEvents/${editedUserEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedUserEvent)
      }).then(data => data.json());
    },getUserEventname(eventId) {
        return fetch(`${remoteURL}/userEvents?eventId=${eventId}`)
            .then(entries => entries.json())
    }
}