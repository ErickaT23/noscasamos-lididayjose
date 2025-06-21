
const guests = [
    { id: "1", name: "Mariana Estrada", passes: 1, gender: "femenino" }
];

document.addEventListener("DOMContentLoaded", function() {
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const pairs = queryString.split("&");
        for (const pair of pairs) {
            const [key, value] = pair.split("=");
            params[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
        }
        return params;
    }

    const queryParams = getQueryParams();
    const guestId = queryParams.id;

    const guest = guests.find(g => g.id === guestId);

    if (guest) {
        let invitText = '';

        if (guest.passes === 1) {
            invitText = guest.gender === 'femenino'
                ? `¡${guest.name}, está invitada!`
                : `¡${guest.name}, está invitado!`;
        } else if (guest.passes >= 2) {
            if (guest.gender === 'femenino') {
                invitText = `¡${guest.name}, están invitadas!`;
            } else {
                invitText = `¡${guest.name}, están invitados!`;
            }
        }

        document.getElementById('guest-name').textContent = invitText;
        document.getElementById('passes').textContent = `${guest.passes} ${guest.passes === 1 ? 'pase' : 'pases'}`;
    } else {
        document.getElementById('guest-name').textContent = `¡Invitado no encontrado!`;
        const section = document.querySelector('.invitation-info-section');
        if (section) section.style.display = 'none';
    }
});
