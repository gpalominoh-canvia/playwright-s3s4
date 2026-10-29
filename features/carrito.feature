# language: es
Característica: Carrito de compras
  Como comprador
  Quiero que el carrito refleje lo que elijo
  Para no pagar de más ni de menos

  Antecedentes:
    Dado que inicié sesión como "standard_user"

  @regresion
  Escenario: El contador refleja lo que agrego y lo que quito
    Cuando agrego al carrito los productos:
      | Sauce Labs Backpack     |
      | Sauce Labs Bike Light   |
      | Sauce Labs Bolt T-Shirt |
    Entonces el carrito indica 3 productos
    Cuando quito "Sauce Labs Bike Light" del carrito
    Entonces el carrito indica 2 productos