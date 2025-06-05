const form1Btn = document.getElementById('form1-btn');
const form2Btn = document.getElementById('form2-btn');
const formContainer = document.getElementById('form-container');

form1Btn.addEventListener('click', () => {
    formContainer.innerHTML = `
      <form id="buscar-form">
        <h2>Consultar</h2>
        <div class="row">
          <div class="column75"> 
            <input type="text" id="idHuesped" name="idHuesped" placeholder="Ingresa el ID del huésped" required>
          </div>
          <div class="column25">
            <button type="submit">Buscar</button>
          </div>
        </div>
  
        <h2>Datos:</h2>
        <div id="resultado">
          <label class="consultas">Nombres:</label> <span id="nombre"></span><br>
          <label class="consultas">Apellido Paterno:</label> <span id="apellido1"></span><br>
          <label class="consultas">Apellido Materno:</label> <span id="apellido2"></span><br>
          <label class="consultas">Teléfono:</label> <span id="telefono"></span><br>
          <label class="consultas">Correo:</label> <span id="correo"></span><br>
          <label class="consultas">Inicio de la reservación:</label> <span id="entrada"></span><br>
          <label class="consultas">Término de la reservación:</label> <span id="salida"></span><br>
          <label class="consultas">Número de huéspedes:</label> <span id="huespedes"></span><br>
          <label class="consultas">Habitación:</label> <span id="habitacion"></span><br>
          <label class="consultas">Servicios:</label> <span id="servicios"></span><br>
        </div>
      </form>
    `;
  
    const buscarForm = document.getElementById('buscar-form');
  
    buscarForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevenir recarga de página
  
      const idHuesped = document.getElementById('idHuesped').value;
  
      // Solicitud al servidor con fetch
      fetch(`consultar_huesped.php?idHuesped=${idHuesped}`)
        .then(response => response.json()) // Recibir respuesta como JSON
        .then(data => {
          // Actualizar etiquetas con datos
          document.getElementById('nombre').textContent = data.nombre || '';
          document.getElementById('apellido1').textContent = data.apellido1 || '';
          document.getElementById('apellido2').textContent = data.apellido2 || '';
          document.getElementById('telefono').textContent = data.telefono || '';
          document.getElementById('correo').textContent = data.correo || '';
          document.getElementById('entrada').textContent = data.entrada || '';
          document.getElementById('salida').textContent = data.salida || '';
          document.getElementById('huespedes').textContent = data.huespedes || '';
          document.getElementById('habitacion').textContent = data.habitacion || '';
          document.getElementById('servicios').textContent = data.servicios || '';
        })
        .catch(error => {
          console.error('Error al consultar los datos:', error);
          alert('Hubo un problema al buscar la información.');
        });
    });
  });
  

form2Btn.addEventListener('click', () => {
    formContainer.innerHTML = `
      <form id="formAgregar" action="procesar_formulario.php" method="post">
        <h2>Agregar</h2>
        <label for="name">Nombres:</label>
        <input type="text" id="name" name="name" placeholder="Ingresa tu nombre" required>
        
        <div class="row">
          <div class="column">
            <label for="apellido1">Apellido Paterno:</label>
            <input type="text" id="apellido1" name="apellido1" placeholder="Ingresa tu primer apellido" required>
          </div>
          <div class="column">
            <label for="apellido2">Apellido Materno:</label>
            <input type="text" id="apellido2" name="apellido2" placeholder="Ingresa tu segundo apellido" required>
          </div>
        </div>
  
        <label for="telefono">Teléfono:</label>
        <input type="number" id="telefono" name="telefono" placeholder="Ingresa tu número de teléfono sin espacios" required>
  
        <label for="correo">Correo:</label>
        <input type="email" id="correo" name="correo" placeholder="Ingresa tu correo electrónico" required>
        
        <h2>Reservación</h2>
  
        <div class="row">
          <div class="column">
            <label for="entrada">Inicio de la reservación:</label>
            <input type="date" id="entrada" name="entrada" placeholder="Ingresa la fecha de llegada" required>
          </div>
          <div class="column">
            <label for="salida">Término de la reservación:</label>
            <input type="date" id="salida" name="salida" placeholder="Ingresa la fecha de salida" required>
          </div>
        </div>
  
        <div class="row">
          <div class="column">
            <label for="huespedes">Número de huéspedes:</label>
            <input type="number" id="huespedes" name="huespedes" placeholder="Ingresa el número de personas que vienen contigo" required>
          </div>
          <div class="column">
            <label for="category">Habitación:</label>
            <select id="category" name="category">
              <option value="categoria1">Habitación individual</option>
              <option value="categoria2">Habitación familiar</option>
              <option value="categoria3">Habitación suite</option>
            </select>
          </div>
        </div>
  
        <label for="services">Servicios:</label>
        <select id="services" name="services">
          <option value="plan_basico">Plan básico</option>
          <option value="plan_navidad">Plan navidad</option>
          <option value="plan_deluxe">Plan deluxe</option>
        </select>
        
        <button type="submit">Enviar</button>
      </form>
    `;
  
    // Manejar el envío del formulario
    const formAgregar = document.getElementById('formAgregar');
    formAgregar.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevenir redirección
  
      const formData = new FormData(formAgregar); // Capturar datos del formulario
  
      // Realizar solicitud al PHP usando fetch
      fetch('procesar_formulario.php', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.text()) // Procesar respuesta como texto
      .then(data => {
        alert('Datos enviados correctamente!'); // Mostrar mensaje de éxito
        console.log('Respuesta del servidor:', data);
  
        // Limpiar los campos del formulario
        formAgregar.reset();
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
        alert('Hubo un error al enviar los datos.');
      });
    });
  });
  