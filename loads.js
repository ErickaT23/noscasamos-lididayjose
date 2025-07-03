const guests = [
    { id: "1", name: "Marina Estrada", passes: 1, gender: "femenino" },
    { id: "2", name: "Amilcar Jacobo", passes: 1, gender: "masculino" },
    { id: "3", name: "Amarilis y Cesar", passes: 2, gender: "mixto" },
    { id: "4", name: "Maria José y Pablo", passes: 2, gender: "mixto" },
    { id: "5", name: "Marisol y Alison", passes: 2, gender: "femenino" },
    { id: "6", name: "Bryan Taltique", passes: 3, gender: "masculino" },
    { id: "7", name: "Salome y Joab", passes: 2, gender: "mixto" },
    { id: "8", name: "Karla y Gerardo", passes: 2, gender: "mixto" },
    { id: "9", name: "Sully Lopez", passes: 1, gender: "femenino" },
    { id: "10", name: "Isidra y Almir", passes: 2, gender: "mixto" },
    { id: "11", name: "Flor y Juan Carlos", passes: 2, gender: "mixto" },
    { id: "12", name: "Anthony Aguilar", passes: 1, gender: "masculino" },
    { id: "13", name: "Edson Aguilar", passes: 1, gender: "masculino" },
    { id: "14", name: "Lety y José", passes: 2, gender: "mixto" },
    { id: "15", name: "Norma y Leonel", passes: 2, gender: "mixto" },
    { id: "16", name: "Olga Estrada", passes: 1, gender: "femenino" },
    { id: "17", name: "Manuel Yanes", passes: 1, gender: "masculino" },
    { id: "18", name: "Cony y Rudy", passes: 2, gender: "mixto" },
    { id: "19", name: "Karla Alonzo", passes: 1, gender: "femenino" },
    { id: "20", name: "Vivian y Luis Fernando", passes: 2, gender: "mixto" },
    { id: "21", name: "Ada y Eddy", passes: 2, gender: "mixto" },
    { id: "22", name: "Rudy y Velveth", passes: 4, gender: "mixto" },
    { id: "23", name: "Antonio Carrillo", passes: 1, gender: "masculino" },
    { id: "24", name: "Elvis y Loyda", passes: 2, gender: "mixto" },
    { id: "25", name: "Emerson", passes: 1, gender: "masculino" },
    { id: "26", name: "Fernando y Guadalupe", passes: 2, gender: "mixto" },
    { id: "27", name: "Dylan y Sara", passes: 2, gender: "mixto" },
    { id: "28", name: "Ricardo y Adela", passes: 2, gender: "mixto" },
    { id: "29", name: "Anthony Aguirre", passes: 2, gender: "masculino" },
    { id: "30", name: "Amilcar y Nora", passes: 2, gender: "mixto" },
    { id: "31", name: "José Quiñonez", passes: 2, gender: "masculino" },
    { id: "32", name: "Usted", passes: 1, gender: "masculino" }
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
