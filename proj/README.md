# MVP

- [ ✅ ] Roles: User y Admin
- [ ✅ ] Nookipedia: que salgan los villagers y puedas buscar por gender, personality y specie
- [ ✅ ] Profile: ver tus villagers y marcarlos como favoritos
- [ ✅ ] Profile: ver tus villagers y meterlos en tu isla
- [ ✅ ] Community

# TABLE ROUTE

| Route                 | HTTP Verb | Description                    | JSON | DONE |
| --------------------- | --------- | ------------------------------ | ---- | ---- |
| `/home`               | GET       | Home                           |      | ✅   |
| `/wiki`               | GET       | Search for villagers           |      | ✅   |
| `/wiki `              | GET       | List of all villagers          |      | ✅   |
| `/wiki/name`          | GET       | Details of a specific villager |      | ✅   |
| `/signup`             | GET       | Create a new user              |      | ✅   |
| `/signup`             | POST      | Create a new user              |      | ✅   |
| `/login`              | GET       | Log in form                    |      | ✅   |
| `/login`              | POST      | Log in form                    |      | ✅   |
| `/logout`             | GET       | Log out redirect Log In        |      | ✅   |
| `/profile/:id`        | GET       | Profile details                |      | ✅   |
| `/profile/:id/edit`   | GET       | Edit profile                   |      | ✅   |
| `/profile/:id/edit`   | POST      | Edit profile                   |      | ✅   |
| `/profile/:id/delete` | POST      | Delete profile                 |      | ✅   |
| `/community`          | GET       | List of other users            |      | ✅   |
| `/event/create`       | GET       | Create event                   |      | ✅   |
| `/event/create`       | POST      | Create event                   |      | ✅   |
| `/event/:id`          | GET       | See event details              |      | ✅   |
| `/event/:id/edit`     | GET       | Edit event                     |      | ✅   |
| `/event/:id/edit`     | POST      | Edit event                     |      | ✅   |
| `/event/:id/delete`   | POST      | Delete event                   |      | ✅   |

# PANTALLAS

- [ ] INICIO
- [ ✅ ] NOOKIPEDIA
- [ ] COMMUNITY
- [ ✅ ] PROFILE
- [ ] EVENT DETAILS
- [ ✅ ] LOG IN
- [ ✅ ] SIGN UP
- [ ✅ ] LOG OUT (no tiene pantalla)

<!---------------------------->

# LOG IN

- [ ✅ ] Formulario de inicio de sesion

# SIGN UP

- [ ✅ ] Formulario de registro

# INICIO

- [ ✅ ] Ir a Nookipedia
- [ ✅ ] Ir a Community
- [ ✅ ] Ir a profile
- [ ✅ ] Log In
- [ ✅ ] Log Out

# NOOKIPEDIA

- [ ✅ ] Barra de búsqueda para villagers
- [ ✅ ] Poder filtrar por especie
- [ ✅ ] Lista de villagers
- [ ✅ ] Rutas de nookipedia
- [ ✅ ] Poder darle click en un villager y ver su info

# VILLAGERS DETAILS

- [ ✅ ] Card con la info del villager
- [ ✅ ] Poder marcar como favorito
- [ ✅ ] Poder añadirlo en tu isla

# PROFILE

- [ ✅ ] Tener personajes favoritos
- [ ✅ ] Poder poner los que tienes en tu isla
- [ ✅ ] Boton de crear eventos
- [ ✅ ] Que se vean tus eventos
- [ ✅ ] Poder editar tus datos
- [ ✅ ] Borra tu cuenta
- [ ✅ ] Rutas de profile

# EVENTOS

- [ ✅ ] Lista de eventos
- [ ✅ ] Crear evento
- [ ✅ ] Borrar evento
- [ ✅ ] Editar evento
- [ ✅ ] Rutas de eventos

# COMMUNITY

- [ ✅ ] Buscar a otros usuarios
- [ ✅ ] Lista de usuarios
- [ ✅ ] Rutas de community
- [ ] Buscar eventos

# BONUS

- [ ] Chat entre users
- [ ] Validar amigo
- [ ✅ ] Hacer nookipedia de animales

# BUGS

- [ ✅ ] Logged out no sale la info de los villagers
- [ ✅ ] Logged out no sale la info de los users en community
- [ ✅ ] las imagenes por default de los villagers
- [ ✅ ] community barra no coge username
- [ ✅ ] renderizado condicional edit delete
