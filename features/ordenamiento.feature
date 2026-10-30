# language: es
Característica: Ordenamiento del catálogo
  Como comprador
  Quiero ordenar los productos por precio
  Para encontrar primero los que se ajustan a mi presupuesto

  Antecedentes:
    Dado que inicié sesión como "standard_user"

  @regresion
  Escenario: Ordenar el catálogo por precio de menor a mayor
    Cuando ordeno el catálogo por precio de menor a mayor
    Entonces el criterio de precio ascendente queda seleccionado
    Y los productos aparecen en este orden:
      | nombre                                  | precio |
      | Sauce Labs Onesie                      | 7.99   |
      | Sauce Labs Bike Light                  | 9.99   |
      | Sauce Labs Bolt T-Shirt                | 15.99  |
      | Test.allTheThings() T-Shirt (Red)       | 15.99  |
      | Sauce Labs Backpack                    | 29.99  |
      | Sauce Labs Fleece Jacket               | 49.99  |
    Y se muestran 6 productos
