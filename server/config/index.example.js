const config = {
  database: {
    type: '', //np. mysql, postgresql, sqlite
    host: '', //adres np. localhost
    username: '', // uzytkownik
    password: '', // hasło
    dbName: '' //nazwa bazy danych
  },
  password: {
    saltRounds: 10 //ilość rund przy hashowaniu hasła 
  },
  jwtToken: {
    secretKey: 'twojsekretnytokendotworzeniajwttoteknow' //przy tworzeniu JWT tokenu podany jest do walidacji sygnatury
  }
}

module.exports = config;