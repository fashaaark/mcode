document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM cargado, inicializando Paper.js...");

    // Obtén el canvas por su ID
    const canvas = document.getElementById('myCanvas1'); // Asegúrate de que este ID coincida con el HTML

    if (canvas) {
        // Configura Paper.js con el canvas
        paper.setup(canvas);

        // Opciones para detección de objetos en el canvas
        const hitOptions = {
            segments: true,
            stroke: true,
            fill: true,
            tolerance: 5
        };

        // Crea algunos elementos iniciales en el canvas
        createPaths();

        // Crear varios blobs
        const blob1 = createBlob(new paper.Point(300, 300), 100, 8);
        console.log("Blob 1 creado:", blob1);

        const blob2 = createBlob(new paper.Point(500, 300), 120, 8);
        console.log("Blob 2 creado:", blob2);

        const blob3 = createBlob(new paper.Point(700, 300), 90, 8);
        console.log("Blob 3 creado:", blob3);
        
        
        

        // Vincula las funciones del mouse a Paper.js
        paper.view.onMouseDown = function (event) {
            onMouseDown(event, hitOptions);
        };
        paper.view.onMouseMove = function (event) {
            onMouseMove(event, hitOptions);
        };
        paper.view.onMouseDrag = onMouseDrag;

        console.log("Paper.js inicializado correctamente.");
    } else {
        console.error("No se encontró un elemento <canvas> con el ID 'myCanvas1'. Verifica tu HTML.");
    }

    // Función para crear una línea básica en el canvas
    function createPaths() {
        const start = new paper.Point(100, 100); // Nota: Usamos paper.Point
        const end = new paper.Point(200, 200);   // Nota: Usamos paper.Point
        const path = new paper.Path.Line(start, end); // Crea una línea entre los puntos
       
        console.log("Línea creada:", path);
    }

    // Función para crear una figura "blob" (orgánica) con puntos aleatorios
    function createBlob(center, maxRadius, points) {
        const path = new paper.Path();
        path.closed = true;
        for (let i = 0; i < points; i++) {
            const delta = new paper.Point({
                length: (maxRadius * 0.5) + (Math.random() * maxRadius * 0.5),
                angle: (360 / points) * i
            });
            path.add(center.add(delta)); // Nota: Usamos el método add() de Point
        }
        path.smooth(); // Suaviza la figura
        path.fillColor = '#1BA6A6'; // Color del relleno
        return path;
    }

    let segment = null;
    let path = null;
    let movePath = false;

    // Función que se activa al hacer clic con el mouse
    function onMouseDown(event, hitOptions) {
        segment = path = null; // Resetea las variables
        const hitResult = paper.project.hitTest(event.point, hitOptions); // Detecta si el clic impacta algún objeto

        if (!hitResult) return; // Si no hay impacto, termina la función

        if (event.modifiers.shift && hitResult.type === 'segment') {
            hitResult.segment.remove(); // Si se presiona Shift, elimina el segmento seleccionado
            return;
        }

        if (hitResult) {
            path = hitResult.item;
            if (hitResult.type === 'segment') {
                segment = hitResult.segment; // Selecciona el segmento clicado
            } else if (hitResult.type === 'stroke') {
                const location = hitResult.location;
                segment = path.insert(location.index + 1, event.point); // Agrega un nuevo punto
                path.smooth(); // Suaviza la forma
            }
        }
        movePath = hitResult.type === 'fill'; // Activa el movimiento si es un área rellena
        if (movePath) paper.project.activeLayer.addChild(hitResult.item); // Lleva el objeto al frente
    }

    // Función que se activa al mover el mouse
    function onMouseMove(event, hitOptions) {
        paper.project.activeLayer.selected = false; // Deselecciona todos los elementos
        const hitResult = paper.project.hitTest(event.point, hitOptions); // Detecta si el mouse pasa sobre un objeto
        if (hitResult && hitResult.item) {
            hitResult.item.selected = true; // Selecciona el objeto sobre el que pasa el mouse
        }
    }

    // Función que se activa al arrastrar el mouse
    function onMouseDrag(event) {
        if (segment) {
            segment.point = segment.point.add(event.delta); // Mueve el segmento seleccionado
            path.smooth(); // Suaviza la forma
        } else if (path) {
            path.position = path.position.add(event.delta); // Mueve todo el objeto seleccionado
        }
    }
});
