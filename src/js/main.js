const tabel = document.getElementById('schedule'); // här hämtas referensen till tbody och tilldelas till variabeln tabel
const searchInput = document.getElementById('searchInput'); // här hamtas referensen till input och tilldelas till variabel searchinput
let scheduleData = []; // i denna tomma array lagras all informtion om scheman

// funktionen som hämtar schedule data
async function fetchSchedule() { // async funktionen definieras, med nyckelordet async möjliggörs await s som väntar på att promise ska slutföras
    try { // denna kod utförs för att hantera undantag - om några fel uppstår så fångas de här och hanteras i catch  
        const response = await fetch('https://webbutveckling.miun.se/files/ramschema_ht23.json'); // fetch används för att göra anropet till URL et i uppgiftsbeskrivningen await väntar på att anropet ska genomföras 
        if (!response.ok) { // om svaret inte är ok så får vi detta meddelande
            throw new Error('Failed to fetch data');
        }
        const data = await response.json(); // här väntar vi på att JSON-data ska extraheras och returneras
        scheduleData = data; // datan tilldelas till variabel
        updateTable(); //  tabellen updateras med ny data
    } catch (error) {
        console.error('Error while fetching data:', error);
    }
}

// funktionen som uppdaterar tabellen med ny data 
function updateTable() {
    const filteredData = filterData(scheduleData, searchInput.value.trim().toLowerCase()); // informationen filteras baserad på det som står i sökfältet (nästa funktion)
    renderTable(filteredData); // den här funktionen anropas tillsammans med filterad data så tabellen kan updateras med ny information
}

// funktionen som filterar schedule data baserad på search inputet
function filterData(data, search) { // filterar schemainformation baserat på inputet från sökningen
    return data.filter(course => course.code.toLowerCase().includes(search) || course.coursename.toLowerCase().includes(search));
}

// Function to render the table with provided data
function renderTable(data) {
    tabel.innerHTML = ''; // först töms innehållet
    data.forEach(course => { // sedan itererar vi över varje kurs 
        const row = document.createElement('tr'); // vi skapar en ny rad för varje kurs <tr>
        row.innerHTML = `  
            <td>${course.code}</td> 
            <td>${course.coursename}</td>
            <td>${course.progression}</td>
        `; // för varje kurs skapar man celler för kurskod, kursnamn, och progression och dessa saker fylls med motsvarande data från kursobjektet 
        tabel.appendChild(row); // till slut läggs varje rad till tabellen genom appendChild i <tbody> elementet
    });
}

// funktionen som sorterar tabellen baserat på kolumnindex
function sortTable(columnIndex) { // sorterar tabellen baserat på den valda kolumnen
    const column = columnIndex === 0 ? 'code' : columnIndex === 1 ? 'coursename' : 'progression'; // columnIndex används för att bestämma vilken kolumn som ska användas för att sortera
    scheduleData.sort((a, b) => a[column].localeCompare(b[column])); //sedan sorterar vi baserat på den valda kolumnen 
    updateTable(); //till slut updateras kolumnen enligt den sorterade datan
}

// Event listener för inputet till search fältet 
searchInput.addEventListener('input', updateTable); // för varje gång man söker efter något körs det

// hämta schemainformation när sidan laddas
fetchSchedule();

