new gridjs.Grid({
  search: true,
    columns: ['ID','Nombre', 'Posicion', 'Sueldo'],
    server: {
      url: 'http://localhost:8081/MostrarJugadores',
      then: data => data.map(ejemplo => 
        [ejemplo.ID_Jugador,ejemplo.Nombre, ejemplo.Posicion, ejemplo.Sueldo]
      )
    } 
  }).render(document.getElementById("wrapper"));