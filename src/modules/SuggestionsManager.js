// const remoteURL = "http://localhost:5002"
const remoteURL = "https://floating-ridge-12046.herokuapp.com"

export default {
    get(id) {
        return fetch(`${remoteURL}/suggestions/${id}`).then(result => result.json())
      },
      getAll() {
        return fetch(`${remoteURL}/suggestions`).then(result => result.json())
      },
      delete(id) {
      return fetch(`${remoteURL}/suggestions/${id}`, {
            method: "DELETE"
        })
        .then(result => result.json())
      },
      post(newSuggestion) {
        return fetch(`${remoteURL}/suggestions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSuggestion)
        }).then(data => data.json())
    },
    update(editedSuggestion) {
      return fetch(`${remoteURL}/suggestions/${editedSuggestion.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedSuggestion)
      }).then(data => data.json());
    },
    getSuggestionEvent(suggestionEventId) {
        return fetch(`${remoteURL}/suggestions?eventId=${suggestionEventId}`)
            .then(entries => entries.json())
    }
}