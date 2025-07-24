let numeroPregunta = 0;
let respuesta_mela = "";
let nivel = "facil";
let ubicacion = true;

function mostrarPregunta() {
    const preguntaElement = document.getElementById('pregunta');
    const nivelElement = document.getElementById('nivel');

    if (nivel === "facil") {
        respuesta_mela = preguntas_facil[numeroPregunta].respuesta;
		console.log("numero de pregunta facil:" ,numeroPregunta);
        nivelElement.innerHTML = "Nivel: Fácil";
        preguntaElement.innerHTML = preguntas_facil[numeroPregunta].pregunta;

        console.log("Pregunta:", preguntas_facil[numeroPregunta].pregunta);
        console.log("Respuesta:", preguntas_facil[numeroPregunta].respuesta);



    } else if (nivel === "medio") {
        respuesta_mela = preguntas_medio[numeroPregunta].respuesta;
		console.log("numero de pregunta medio:" ,numeroPregunta);
        nivelElement.innerHTML = "Nivel: Medio";
        preguntaElement.innerHTML = preguntas_medio[numeroPregunta].pregunta;

        console.log("Pregunta:", preguntas_medio[numeroPregunta].pregunta);
        console.log("Respuesta:", preguntas_medio[numeroPregunta].respuesta);



    } else if (nivel === "dificil") {
        respuesta_mela = preguntas_dificil[numeroPregunta].respuesta;
		console.log("numero de pregunta medio:" ,numeroPregunta);
        nivelElement.innerHTML = "Nivel: Difícil";
        preguntaElement.innerHTML = preguntas_dificil[numeroPregunta].pregunta;

        console.log("Pregunta:", preguntas_dificil[numeroPregunta].pregunta);
        console.log("Respuesta:", preguntas_dificil[numeroPregunta].respuesta);
    }
}
mostrarPregunta()









		/* ---------- MAPA ---------- */
		const bordersColombia = [[-4.2, -85.5], [13.5, -66.8]];
		const map = L.map('map', {
			minZoom: 5, maxZoom: 10, zoomSnap: 1,
			maxBounds: bordersColombia, maxBoundsViscosity: 1
		}).setView([1, 74.2973], 6);


		/* Pane para etiquetas */
		map.createPane('labels');
		map.getPane('labels').style.zIndex = 650;
		map.getPane('labels').style.pointerEvents = 'none';

		/* Capas base */

		L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png').addTo(map);
		L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png').addTo(map);

		/* ---------- CARGA GEOJSON ---------- */
		let departamentosLayer, marcadorUsuario = null;
		fetch('./static/js/Colombia_departamentos_poblacion.geojson')
			.then(r => r.json())
			.then(data => {
				departamentosLayer = L.geoJSON(data, {
					onEachFeature: (f, l) => {
						l.bindPopup(f.properties.DPTO_CNMBR, { closeButton: false, autoClose: false })
							.on('mouseover', e => e.target.openPopup())
							.on('mouseout', e => e.target.closePopup());
						l.setStyle({ color: "#3388ff", weight: 1, fillOpacity: .2 });
					}
				}).addTo(map);
			})
			.catch(err => console.error("Error cargando GeoJSON:", err));
			


		/* ---------- BÚSQUEDA ---------- */
		async function buscarDireccion() {
			const texto = document.getElementById('direccion').value.trim();
			const respuesta_buena = respuesta_mela;

			if (!texto) {
				alert("Por favor, ingresa una dirección válida.");


				return;};
			const url_buena = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(respuesta_buena)}&countrycodes=CO`;
			const res_buena = await fetch(url_buena, { headers: { 'User-Agent': 'trivia de steven' } });
			const data_buena = await res_buena.json();
			const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(texto)}&countrycodes=CO`;
			const res = await fetch(url, { headers: { 'User-Agent': 'trivia de steven' } });
			const data = await res.json();

			if (!data.length) { alert("Dirección no encontrada"); return; }

			const lat_buena = parseFloat(data_buena[0].lat), lon_buena = parseFloat(data_buena[0].lon);
			const punto_buena = turf.point([lon_buena, lat_buena]);

			const lat = parseFloat(data[0].lat), lon = parseFloat(data[0].lon);
			const punto = turf.point([lon, lat]);
			console.log("datos que traigo de python :",data_buena, "datos que traigo del input : ",data);
	

		

			departamentosLayer.eachLayer(l => l.setStyle({ color: "#3388ff", weight: 1, fillOpacity: .2 }));
			departamentosLayer.eachLayer(l => {
				if(data_buena[0].display_name == data[0].display_name) {
				if (turf.booleanPointInPolygon(punto, l.toGeoJSON())) {
					l.setStyle({ color: "green", weight: 2, fillOpacity: .5 });
					l.openPopup();
					setTimeout(() => l.closePopup(), 2000);
					responder(true);
				}}
				else if(data_buena[0].display_name !== data[0].display_name) {
					if (turf.booleanPointInPolygon(punto, l.toGeoJSON())) {
					l.setStyle({ color: "red", weight: 2, fillOpacity: .5 });
					l.openPopup();
					setTimeout(() => l.closePopup(), 2000);
					responder(false);
				}}
				if(data_buena[0].display_name !== data[0].display_name) {
					if (turf.booleanPointInPolygon(punto_buena, l.toGeoJSON())) {
					l.setStyle({ color: "green", weight: 2, fillOpacity: .5 });
					setTimeout(() => l.closePopup(), 2000);
					l.openPopup();}}
				
					

			});

			map.setView([lat, lon], 6);
			document.getElementById('direccion').value = "";
			
		}


		/* ---------- sistema de vidas ---------- */
let preguntas_correctas = 0;
let vidas = 3;

function responder(correcta) {
	;
    if (!correcta) {
        vidas--;
        actualizarVidas();
		mostrarPista();

        if (vidas === 0) {
             document.getElementById("Perdiste").style.display = "flex";
        }
        return; 
    }
    preguntas_correctas++;
	const pistaElement = document.getElementById('pista');
	pistaElement.innerHTML = ""; 

    if (vidas < 3) vidas++; // Solo gana vida si no tiene 3

    actualizarVidas();

    if (preguntas_correctas > 2) {
        preguntas_correctas= 0;
        numeroPregunta = 0;
        if (nivel === "facil") nivel = "medio";
        else if (nivel === "medio") nivel = "dificil";
        else if( nivel === "dificil") {
             document.getElementById("Ganaste").style.display = "flex";
			 return;
        }
        document.getElementById("nivel-superado").style.display = "flex";
    } else {
        numeroPregunta++;
    }

    mostrarPregunta();
}

function actualizarVidas() {
    const vidasDiv = document.getElementById("vidas");
    vidasDiv.innerHTML = "❤️".repeat(vidas) + "🤍".repeat(3 - vidas);
}

function reiniciarJuego() {
   location.reload();
}
/* ---------- sistema de pistas ---------- */
	let intentos_pregunta=0
function mostrarPista() {
	const pistaElement = document.getElementById('pista');
	if (nivel === "facil") {
    if (numeroPregunta == 0 && intentos_pregunta == 0) {
        pistaElement.innerHTML = "Pista:<br>" + preguntas_facil[numeroPregunta].pistas[0];
        intentos_pregunta++;
    } else {
        pistaElement.innerHTML = "Pista:<br>" + preguntas_facil[numeroPregunta].pistas[1];
    }
} else if (nivel === "medio") {
    if (intentos_pregunta == 0) {
        pistaElement.innerHTML = "Pista:<br>" + preguntas_medio[numeroPregunta].pistas[0];
        intentos_pregunta++;
    } else {
        pistaElement.innerHTML = "Pista:<br>" + preguntas_medio[numeroPregunta].pistas[1];
    }
} else if (nivel === "dificil") {
    if (intentos_pregunta == 0) {
        pistaElement.innerHTML = "Pista:<br>" + preguntas_dificil[numeroPregunta].pistas[0];
        intentos_pregunta++;
    } else {
        pistaElement.innerHTML = "Pista:<br>" + preguntas_dificil[numeroPregunta].pistas[1];
    }
}

}
	